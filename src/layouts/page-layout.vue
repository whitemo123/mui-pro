<script setup lang="ts">
import { useTagsStore } from '@/store';

const tagsStore = useTagsStore()
</script>

<template>
  <router-view #="{ Component }">
    <keep-alive :include="tagsStore.tagsKeep">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>
