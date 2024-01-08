<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store';
import { Base64 } from 'js-base64';
import config from '@/config';
import { useLoading } from '@/hooks/useLoading'
import { ILoginData } from '@/apis/core/types';

// 路由控制
const router = useRouter()
// 路由信息
const route = useRoute()
// loading hook
const { loading, setLoading } = useLoading(false)

// 登录表单数据
const loginForm = ref<ILoginData>({
  account: 'admin',
  pwd: '123456'
})

const env = import.meta.env;

/**
 * 登录操作
 */
const login = () => {
  setLoading(true)
  // 用户store
  const userStore = useUserStore()
  // 登录
  userStore.login(loginForm.value).then(async () => {
    // 获取用户信息
    await userStore.getUserInfo()
    // replace到重定向的页面或者首页
    router.replace({path: route.query.url ? Base64.decode(route.query.url as string) : config.homePath})
  }).finally(() => {
    setLoading(false)
  })
}
</script>

<template>
  <div class="login-page">
    <div class="form">
      <div class="logo">
       <img v-if="config.logo" :src="config.logo" alt="">
        <span>{{ config.title }}</span>
      </div>
      <a-form
        :model="loginForm"
        :disabled="loading"
        @submit-success="login"
      >
        <a-form-item
          field="account"
          label="账号"
          :hide-label="true"
          :rules="[{ required: true, message: '请输入账号!' }]"
        >
          <a-input placeholder="账号" v-model="loginForm.account" />
        </a-form-item>
        <a-form-item
          field="pwd"
          label="密码"
          :hide-label="true"
          :rules="[{ required: true, message: '请输入密码!' }]"
        >
          <a-input-password placeholder="密码" v-model="loginForm.pwd" />
        </a-form-item>
        <a-row>
          <a-button :loading="loading" type="primary" html-type="submit">登 录</a-button>
        </a-row>
      </a-form>
    </div>
    <div class="footer">{{ env.VITE_FOOTER }}</div>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/svg/login-bg.svg");
  background-position: center;
  background-size: 100%;

  .form {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 320px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    background: #fff;

    button {
      width: 100%;
    }

    .logo {
      text-align: center;
      cursor: pointer;
      margin-bottom: 24px;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 40px;
        margin-right: 8px;
      }

      span {
        vertical-align: text-bottom;
        font-size: 16px;
        text-transform: uppercase;
        display: inline-block;
        font-weight: 700;
        color: #1890ff;
        background-image: -webkit-gradient(linear,37.219838% 34.532506%,36.425669% 93.178216%,from(#29cdff),to(#0a60ff),color-stop(.37,#148eff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 48px 16px 24px;
    box-sizing: border-box;
    text-align: center;
    color: rgba(0,0,0,.45);
    font-size: 13px;
  }
}
</style>
