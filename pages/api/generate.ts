// pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { prompt } = req.body;
  const replicateToken = process.env.REPLICATE_API_TOKEN;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid prompt input.' });
  }

  if (!replicateToken) {
    console.error('❌ REPLICATE_API_TOKEN is missing in environment');
    return res.status(500).json({ error: 'Missing API token on server' });
  }

  console.log('➡️ Generating with prompt:', prompt);

  try {
    const initialResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${replicateToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: 'db21e45e52a47d13cf6408b56e054f3cda2b4a3f9f40cc74e8c60a53c175dbe2',
        input: { prompt },
      }),
    });

    const prediction = await initialResponse.json();

    if (!initialResponse.ok || prediction.error) {
      console.error('❌ Replicate API error:', prediction.error || prediction);
      return res.status(500).json({ error: prediction.error || 'Initial API request failed' });
    }

    const pollUntilReady = async (url: string, retries = 20, delay = 1500) => {
      for (let i = 0; i < retries; i++) {
        await new Promise((resolve) => setTimeout(resolve, delay));
        const pollRes = await fetch(url, {
          headers: { Authorization: `Token ${replicateToken}` },
        });
        const result = await pollRes.json();

        console.log(`⏳ Poll ${i + 1}:`, result.status);

        if (result.status === 'succeeded') return result;
        if (result.status === 'failed') throw new Error('Generation failed');
      }
      throw new Error('Timeout: Generation not completed in time');
    };

    const finalResult = await pollUntilReady(prediction.urls.get);

    console.log('✅ Image URL:', finalResult.output[0]);

    return res.status(200).json({ image_url: finalResult.output[0] });
  } catch (error: any) {
    console.error('🔥 Catch error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
