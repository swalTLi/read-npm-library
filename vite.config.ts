import path from 'path';
import { ConfigEnv, loadEnv, UserConfigExport } from 'vite';

export default (configEnv: ConfigEnv): UserConfigExport => {
  const { command, mode } = configEnv;
  const isBuild = command !== 'serve';
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }; // 加载env环境变量

  return {
    base: './',
    clearScreen: false,
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
        scss: {
          charset: false,
        },
      },
    },
    define: { // 变量全局替换配置
      __ENV_DEV__: !isBuild,
      __PROJECT_PORT__: JSON.stringify(process.env.VITE_PROJECT_PORT),
    },
    server: {
      port: Number(process.env.VITE_PROJECT_PORT),
      hmr: { // 错误全屏警告，可以关闭
        overlay: true,
      },
    },
    resolve: {
      alias: { // dest映射配置
        '@': path.resolve('src'),
      },
    },
    esbuild: { // 自动导入react(针对17), 也可以使用@vitejs/plugin-react插件简化这一配置
      jsxInject: `import React from 'react'`,
    },
    plugins: [
    ],
    test: {
      globals: true, // --> 0.8.1+  请修改成globals
      environment: 'jsdom',
    },
  };
};