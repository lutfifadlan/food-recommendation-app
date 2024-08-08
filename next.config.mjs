import nextI18NextConfig from './next-i18next.config.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    ...nextI18NextConfig.i18n,
    localeDetection: nextI18NextConfig.localeDetection,
  },
};

export default nextConfig;
