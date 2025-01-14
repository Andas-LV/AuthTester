import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
    env: {
        NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
        NEXT_IMAGES_HOSTNAME: process.env.NEXT_IMAGES_HOSTNAME,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_IMAGES_HOSTNAME!,
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;