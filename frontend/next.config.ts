import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ipfs-http-client", "electron-fetch"],
};

export default nextConfig;
