import { App, ComponentPublicInstance } from 'vue'

export default (app: App) => {
  app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
    if (import.meta.env.DEV) {
      window.console.group('>>>>>> 错误信息 >>>>>>');
      window.console.error(info);
      window.console.groupEnd();
      window.console.group('>>>>>> Vue 实例 >>>>>>');
      window.console.log(instance);
      window.console.groupEnd();
      window.console.group('>>>>>> Error >>>>>>');
      window.console.log(err);
      window.console.groupEnd();
    }
  }
}
