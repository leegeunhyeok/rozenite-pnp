const path = require('path');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { ResolverFactory } = require('oxc-resolver');

const ROOT = __dirname;
const DEFAULT_ROOT_MODULES = ['react', 'react-native'];

const resolvers = new Map();

/**
 * Custom resolver implementation for the Yarn PnP project
 */
function createResolver() {
  function createResolverImpl(context, platform) {
    const baseExtensions = context.sourceExts.map((extension) => `.${extension}`);
    let finalExtensions = [...baseExtensions];

    if (context.preferNativePlatform) {
      finalExtensions = [...baseExtensions.map((extension) => `.native${extension}`), ...finalExtensions];
    }

    if (platform) {
      finalExtensions = [...baseExtensions.map((extension) => `.${platform}${extension}`), ...finalExtensions];
    }

    const resolver = new ResolverFactory({
      extensions: finalExtensions,
      conditionNames: ['react-native', 'require', 'node', 'default'],
      mainFields: ['react-native', 'browser', 'main'],
    });

    function resolveSync(resolveDir, request) {
      const resolved = resolver.sync(resolveDir, request);

      if (resolved.path == null) {
        throw new Error(`Failed to resolve '${request}' from '${resolveDir}'`);
      }

      return resolved.path;
    }

    function resolve(context, request) {
      for (const target of DEFAULT_ROOT_MODULES) {
        if (request === target || request.startsWith(`${target}/`)) {
          return {
            type: 'sourceFile',
            filePath: resolveSync(ROOT, request),
          };
        }
      }

      return {
        type: 'sourceFile',
        filePath: resolveSync(path.dirname(context.originModulePath), request),
      };
    }

    return resolve;
  }

  return function resolve(context, request, platform) {
    let resolver = resolvers.get(platform);

    if (resolver == null) {
      resolver = createResolverImpl(context, platform, ROOT);
      resolvers.set(platform, resolver);
    }

    return resolver(context, request, platform);
  };
}

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    resolveRequest: createResolver(),
  },
  resetCache: true,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
