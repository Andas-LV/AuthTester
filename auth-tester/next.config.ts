import type { NextConfig } from "next";
import dotenv from "dotenv";

dotenv.config();

const nextConfig: NextConfig = {
    env: {
        NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'andasplayers.s3.eu-north-1.amazonaws.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;