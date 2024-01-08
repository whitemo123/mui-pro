<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store';
import { ILoginData } from '@/apis/core/types';

const loginForm = ref<ILoginData>({
  account: 'admin',
  pwd: '123456'
})

const login = () => {
  const userStore = useUserStore()
  userStore.login(loginForm.value).then(() => {
    console.log(1)
  })
}
</script>

<template>
  <a-button @click="login" type="primary">登录</a-button>
</template>

<style lang="less" scoped></style>
