import { createPinia } from 'pinia';
import { useUserStore } from './modules/user';
import { useTagsStore } from './modules/tags';
import { useMenuStore } from './modules/menu';

export {
  useTagsStore,
  useUserStore,
  useMenuStore
}

export default createPinia()
