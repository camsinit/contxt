// Expo CLI will await this method so you can optionally return a promise.
const createExpoWebpackConfigAsync = require("@expo/webpack-config");

module.exports = async function (env, argv) {
  // https://github.com/expo/expo-cli/tree/master/packages/webpack-config#environment
  const enviroment = {
    ...env,
    pwa: false,
    babel: {
      dangerouslyAddModulePathsToTranspile: ["@draftbit","@amplitude"],
    },
  };

  const config = await createExpoWebpackConfigAsync(enviroment, argv);

  // Added at Customer Request to fix Victory Charts for Web Apps
  config.resolve.alias['victory-native'] = 'victory';

  // Added at Customer Request to fix Stripe for Web Apps
  config.resolve.alias['@stripe/stripe-react-native'] = '@stripe/stripe-js';

  // Expo's default is to enable these options, which results in somewhat
  // confusing behavior: You might know you updated your app, but have to
  // arbitrarily refresh a lot before you see the newer version.  In the
  // meantime, if the app is open in another tab, you can run into circumstances
  // where the new service worker is servicing requests for an old version of an
  // app, which is likely to lead to esoteric, hard to reproduce issues.
  // Instead, we put a notification in your app which listens for new service
  // workers, then replaces everything in a single shot with a forced refresh,
  // avoiding the issues above, along with being a bit more explit to users.
  config.plugins.forEach(({ config }) => {
    if (config && "skipWaiting" in config) {
      config.skipWaiting = false;
      config.clientsClaim = false;
    }
  });

  return config;
};