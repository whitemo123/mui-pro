<script setup lang="ts">
import Sider from './components/sider.vue'
import { useMenuStore } from '@/store';

// 菜单store
const menuStore = useMenuStore()

</script>

<template>
  <a-layout class="layout-demo">
    <a-layout-sider
      hide-trigger
      collapsible
      :collapsed="menuStore.collapsed"
    >
      <Sider />
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
      </a-layout-header>
      <a-layout>
        
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style lang="less" scoped>
.mui-layout {
  width: 100%;
  height: 100%;
  background-color: #f0f2f5;

  .mui-header {
    width: 100%;
    background-color: #fff;
    transition: all .3s;
  }
}
</style>
