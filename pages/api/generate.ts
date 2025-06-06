import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const prompt = req.body.prompt?.trim();

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid or empty prompt' });
  }

  // Simulate generation — replace with real API call later
  const mockImageUrl = `https://via.placeholder.com/512x512?text=${encodeURIComponent(prompt)}`;

  res.status(200).json({ image_url: mockImageUrl });
}