<template>
  <div class="error-page">
    <div class="img"></div>
    <div class="content">
      <h1>500</h1>
      <div class="desc">抱歉，服务器出错了</div>
      <div class="actions">
        <router-link :to="{path:'/'}">
          <a-button type="primary">返回首页</a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "./style.less";

.img {
  background-image: url('@/assets/svg/500.svg');
}
</style>
