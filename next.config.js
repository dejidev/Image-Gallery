/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        domains: ['res.cloudinary.com', 'images.pexels.com'], // Add 'res.cloudinary.com' as well
        // Remote patterns for 'images.pexels.com' (if needed)
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/**',
            },
        ],
    },
};

module.exports = nextConfig;
