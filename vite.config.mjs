import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import createVitePlugins from './vite/plugins';
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_BASE } = env;
  return defineConfig({
    base: env.VITE_APP_ENV === 'development' ? VITE_APP_BASE.replace(/^\/api/, '') : VITE_APP_BASE,
    server: {
      port: 2888,
      proxy: {
        '/api': {
          target: 'http://qq841059275.imwork.net',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, './src'),
        components: resolve(__dirname, './src/components'),
        styles: resolve(__dirname, './src/styles'),
        utils: resolve(__dirname, './src/utils'),
      },
    },
    plugins: createVitePlugins(env, command === 'build'),
  });
};
