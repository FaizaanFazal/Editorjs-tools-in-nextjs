import { NextApiRequest, NextApiResponse } from 'next';
import getMetaData from 'metadata-scraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { url } = req.query as { url: string };
    try {
      if (!url) throw new Error('Url is required');
      const metadata = await getMetaData(url);
      console.log(JSON.stringify(metadata));
      const responseData = {
        success: 1,
        meta: {
          title: metadata.title,
          description: metadata.description,
          image: {
            url: metadata.image || metadata.icon,
          },
        },
      };

      res.status(200).json(responseData);
    } catch (error) {
      console.error('Error fetching link data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
