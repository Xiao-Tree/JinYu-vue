<script setup lang="ts">
import { fetchLogin } from "@/api/common";
import { useUserStore } from "@/stores";
import type { ModelUtil } from "@/types/common";
import { error } from "echarts/types/src/util/log.js";
import type { FormItemRule, FormRules } from "naive-ui";
import { useTemplateRef } from "vue";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const formRef = useTemplateRef("form");
const model = ref<{ username: string | null; password: string | null }>({
  username: null,
  password: null,
});
const rules: FormRules = {
  username: {
    required: true,
    validator: (rule: FormItemRule, value: string | null) => {
      if (!value?.length) {
        return new Error("请输入用户名");
      }
      return true;
    },
  },
  password: {
    required: true,
    validator: (rule: FormItemRule, value: string | null) => {
      if (!value?.length) {
        return new Error("请输入密码");
      }
      return true;
    },
  },
};
const router = useRouter();
const isFetching = ref(false);
function goLogin() {
  formRef.value?.validate((errors) => {
    if (!errors) {
      isFetching.value = true;
      const { data, onFetchResponse, onFetchFinally } = fetchLogin(
        model.value.username as string,
        model.value.password as string
      );
      onFetchResponse((response) => {
        const d = data.value?.data;
        if (d) {
          userStore.uid = d.uid;
          userStore.username = d.username;
          userStore.token = d.auth;
          userStore.userAvatar = d.avatar;
          userStore.role.push(...d.roles.map((role) => role.slice(5)));
          router.push({ name: "home" });
        }
      });
      onFetchFinally(() => (isFetching.value = false));
    }
  });
}

const title = import.meta.env.VITE_APP_TITLE;
</script>
<template>
  <n-form
    ref="form"
    :model="model"
    :rules="rules"
    :showRequireMark="false"
    class="form_main"
    size="large">
    <h1 style="text-align: center">{{ title }}</h1>
    <n-form-item
      path="username"
      label="用户名"
      style="width: 280px">
      <n-input
        v-model:value="model.username"
        clearable
        round
        type="text">
        <template #prefix>
          <SvgIcon icon="marketeq:user" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item
      path="password"
      label="密码"
      style="width: 280px">
      <n-input
        v-model:value="model.password"
        clearable
        round
        show-password-on="click"
        type="password"
        @keydown.enter.prevent>
        <template #prefix>
          <SvgIcon icon="marketeq:lock" />
        </template>
      </n-input>
    </n-form-item>
    <n-form-item class="login-but">
      <n-button
        @click="goLogin"
        :loading="isFetching"
        round
        type="warning"
        >登录<template #icon>
          <SvgIcon icon="majesticons:login-half-circle"></SvgIcon>
        </template>
      </n-button>
    </n-form-item>
  </n-form>
</template>
<style>
.login-but .n-form-item-blank {
  align-items: center;
  justify-content: center;
}

.form_main {
  background-color: #e5734d;
  padding: 30px 30px 30px 30px;
  border-radius: 30px;
  box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.062);
}

.inputField {
  background-color: transparent;
  border: none;
  border-bottom: 2px solid rgb(173, 173, 173);
  border-radius: 30px;
  color: black;
  font-size: 0.8em;
  font-weight: 500;
  box-sizing: border-box;
}

.inputField:focus {
  outline: none;
  border-bottom: 2px solid rgb(199, 114, 255);
}

.inputField::placeholder {
  color: rgb(80, 80, 80);
  font-size: 1em;
  font-weight: 500;
}

#button {
  position: relative;
  width: 100%;
  border: 2px solid #8000ff;
  background-color: #8000ff;
  height: 40px;
  color: white;
  font-size: 0.8em;
  font-weight: 500;
  letter-spacing: 1px;
  border-radius: 30px;
  margin: 10px;
  cursor: pointer;
  overflow: hidden;
}
</style>
