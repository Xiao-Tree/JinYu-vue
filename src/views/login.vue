<script setup lang="ts">
import LottieIcon from "@/components/LottieIcon.vue";

definePage({
  meta: {
    layout: "blank",
    hideInMenu: false,
    requiresAuth: false,
    title: "登录",
    icon: "mi:log-in",
    sort: 2,
  },
});

</script>
<template>
  <div class="login-main">
    <LottieIcon
      icon="login"
      class="login-icon" />
    <LoginForm />
  </div>
</template>
<style>
.login-title {
  font-size: xx-large;
  font-weight: 600;
  margin-bottom: 50px;
}
.n-layout .n-layout-scroll-container {
  background-color: #c4fcef;
}

.login-main {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 50px;
}
@media screen and (min-width: 350px) {
  .login-icon {
    width: 350px;
  }
  .n-layout-scroll-container {
    justify-content: start;
  }
}

@media screen and (min-width: 450px) {
  .login-icon {
    width: 450px;
  }
}

@media screen and (min-width: 600px) {
  .login-icon {
    width: 600px;
  }
}
@media screen and (min-width: 800px) {
  .login-icon {
    width: 800px;
  }
  .n-layout-scroll-container {
    justify-content: center;
  }
}
</style>
