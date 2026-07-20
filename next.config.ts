import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias['cursor/canvas'] = path.resolve(__dirname, 'lib/cursor-canvas/index.tsx');
    return config;
  },
};

export default nextConfig;
