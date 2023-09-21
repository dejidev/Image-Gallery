// pages/api/upload.js (Server-Side Route)

import { getSignature, saveToDatabase } from '../../app/_actions';

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const { timestamp, signature } = await getSignature();

            if (!signature) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const formData = new FormData();
            formData.append('file', req.body.file);
            formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('folder', 'next');

            const endpoint = 'https://api.cloudinary.com/v1_1/dejidev/image/upload';
            const data = await fetch(endpoint, {
                method: 'POST',
                body: formData,
            }).then((res) => res.json());

            await saveToDatabase({
                version: data?.version,
                signature: data?.signature,
                public_id: data?.public_id,
            });

            return res.status(200).json({ message: 'File uploaded successfully' });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
