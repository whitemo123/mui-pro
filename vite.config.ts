import { defineConfig, loadEnv } from 'vite'
import Plugins from './vite/plugins/index'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({mode, command}) => {
  // 加载环境配置文件
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    base: env.VITE_APP_BASE,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    // 服务
    server: {
      host: '0.0.0.0',
      port: 1111,
      proxy: {
        '/api': {
          target: 'https://taah-gift.vpn.yesaiot.com',
          changeOrigin: true,
          ws: true
        }
      }
    },
    // 插件
    plugins: Plugins(env, command)
  })
}
