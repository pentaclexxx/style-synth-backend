import type { NextApiRequest, NextApiResponse } from 'next';

const MODEL_VERSION = '7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { prompt } = req.body;
  if (!prompt) return res.status(400).send('Prompt is required');

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          num_inference_steps: 30,
          guidance_scale: 7.5,
        },
      }),
    });

    const prediction = await response.json();

    console.log('🔍 Raw Replicate Response:', JSON.stringify(prediction, null, 2));

    if (!prediction?.urls?.get) {
      return res.status(500).json({ error: 'No prediction URL returned', details: prediction });
    }

    const pollResult = async (url: string): Promise<string> => {
      while (true) {
        const res = await fetch(url, {
          headers: { Authorization: `Token ${process.env.REPLICATE_API_TOKEN}` },
        });
        const data = await res.json();
        if (data.status === 'succeeded') return data.output[0];
        if (data.status === 'failed') throw new Error('Image generation failed');
        await new Promise(r => setTimeout(r, 2000));
      }
    };

    const imageUrl = await pollResult(prediction.urls.get);
    res.status(200).json({ image: imageUrl });

  } catch (err) {
    console.error('❌ Generation Error:', err);
    res.status(500).json({ error: 'Image generation failed', message: err.message });
  }
}
