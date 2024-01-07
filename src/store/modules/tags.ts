import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import config from '@/config';

export const useTagsStore = defineStore('tags', () => {
  // 当前tag
  const tag = ref<any>({})
  // tag列表
  const tagList = ref<any>([])

  // 缓存页面的tag列表
  const tagsKeep = computed(() => {
    return tagList.value.filter((ele: any) => {
      return (ele.meta || {})[config.menu.keepAlive]
    }).map((ele: any) => ele.fullPath)
  })

  /**
   * 添加tag
   * @param data 
   * @returns 
   */
  const addTag = (data: any) => {
    if (typeof data.name == 'function') data.name = data.name(data.query)
    tag.value = data;

    if (tagList.value.some((ele: any) => ele.fullPath === data.fullPath)) return;
    tagList.value.push(data)
  }

  /**
   * 删除tag
   * @param data 
   */
  const delTag = (data: any) => {
    tagList.value = tagList.value.filter((item: any) => {
      return item.fullPath !== data.fullPath
    })
  }

  /**
   * 删除全部tag
   */
  const delAllTag = () => {
    tagList.value = []
  }

  /**
   * 删除其它tag
   */
  const delOtherTag = () => {
    tagList.value = tagList.value.filter((item: any) => {
      return [tag.value.fullPath, config.homePath].includes(item.fullPath)
    })
  }

  return {
    tag,
    tagList,
    tagsKeep,
    addTag,
    delTag,
    delAllTag,
    delOtherTag
  }
})
