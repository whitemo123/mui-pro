import autoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default () => {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia'
    ],
    resolvers: [ArcoResolver()],
    dts: './auto-import.d.ts'
  })
}
