/** @returns {import('next').NextConfig} */
const nextConfig = () => {
  if (process.env.COVERAGE) {
    const coverageConfig = {
      webpack: (config, options) => {
        config.module.rules.push({
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: ["istanbul"],
            presets: ["next/babel"],
          },
        });
        return config;
      },
    };
    return coverageConfig;
  }
  return {};
};

export default nextConfig;
