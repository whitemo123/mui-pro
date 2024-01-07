import vue from '@vitejs/plugin-vue'

// 自动导包
import autoImport from './auto-import'
// 自动导入arco组件
import vueComponents from './vue-components'
// 自动导入arco样式
import arco from './arco'

import { PluginOption } from 'vite'

export default (env: Record<string, string>, command: string): PluginOption[] => {
  const plugins: PluginOption[] = [vue()]

  plugins.push(autoImport())
  plugins.push(vueComponents())
  plugins.push(arco())

  return plugins;
}
