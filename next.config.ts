import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images:{
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },

  experimental:{
    turbo:{
      
    }
  },
  eslint:{
    ignoreDuringBuilds:false,

  },
  typescript:{
    ignoreBuildErrors: false
  }
  
};

export default nextConfig;
