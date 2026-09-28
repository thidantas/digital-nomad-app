// @ts-nocheck
export default ({ config }) => ({
  ...config,
  name: config.name ?? "Nomad",
  slug: config.slug ?? "digital-nomad-app",
  android: {
    ...config.android,
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
  },
});
