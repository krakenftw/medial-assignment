/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "iujtljyneivpdemsdrne.supabase.co",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
