<script setup lang="ts">
import { fetchCreateRole, fetchUpdateRole } from "@/api/auth";
import type { ModelUtil } from "@/types/common";
import {
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NSpace,
  type FormItemRule,
  type FormRules,
} from "naive-ui";
import { useTemplateRef } from "vue";

const props = defineProps<{
  roleInfo?: table.roleInfo;
  statusDict: data.dict;
}>();
const emit = defineEmits(["update"]);

const model = ref<ModelUtil<table.roleInfo>>({
    id: null,
    name: null,
    key: null,
    status: null,
    comment: null,
    createAt: null,
  }),
  formRef = useTemplateRef("form"),
  isFetching = ref(false);

const formItems: common.fromItem[] = [
  {
    path: "name",
    label: "名称",
    content: () =>
      h(NInput, {
        value: model.value.name,
        onUpdateValue: (value) => {
          model.value.name = value;
        },
        placeholder: "请输入名称",
        clearable: true,
      }),
  },
  {
    path: "key",
    label: "标识",
    content: () =>
      h(NInput, {
        value: model.value.key,
        onUpdateValue: (value) => {
          model.value.key = value;
        },
        placeholder: "请输入标识",
        clearable: true,
      }),
  },
  {
    path: "status",
    label: props.statusDict?.type.name as string,
    content: () =>
      h(
        NRadioGroup,
        {
          value: model.value.status,
          onUpdateValue: (value) => {
            model.value.status = value;
          },
          name: "status",
        },
        () =>
          h(NSpace, () =>
            props.statusDict?.values.map((v) =>
              h(NRadio, { label: v.label, value: v.value })
            )
          )
      ),
  },
  {
    path: "comment",
    label: "备注",
    content: () =>
      h(NInput, {
        value: model.value.comment,
        onUpdateValue: (value) => (model.value.comment = value),
        placeholder: "请输入备注",
        clearable: true,
      }),
  },
];
if (props.roleInfo) {
  Object.assign(model.value, props.roleInfo);
  formItems.unshift({
    path: "id",
    label: "id",
    content: () =>
      h(NInputNumber, {
        value: model.value.id,
        onUpdateValue: (v) => (model.value.id = v),
        showButton: false,
      }),
  });
}

const rules: FormRules = {
  name: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value || !value.length) {
        return new Error("角色名称不能为空");
      } else {
        return true;
      }
    },
    trigger: ["input", "blur"],
  },
  key: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value || !value.length) {
        return new Error("角色标识不能为空");
      } else {
        return true;
      }
    },
    trigger: ["input", "blur"],
  },
};

function create() {
  formRef.value?.validate().then(() => {
    isFetching.value = true;
    const {
      data: d,
      onFetchResponse,
      execute,
    } = fetchCreateRole(model.value as table.roleInfo);
    onFetchResponse((res) => {
      if (d.value?.data) {
        window.$message.success("已成功创建角色");
        window.$modal.destroyAll();
      }
    });
    execute().finally(() => (isFetching.value = false));
  });
}

function update() {
  formRef.value?.validate().then(() => {
    // 过滤出哪些信息被修改了
    const newRoleInfo = {};
    Object.entries(model.value).forEach(([k, v]) => {
      if (props.roleInfo && v !== props.roleInfo[k as keyof table.roleInfo]) {
        // console.log(
        //   `${k} : ${props.roleInfo[k as keyof table.roleInfo]} --> ${v}`
        // );
        // @ts-ignore
        newRoleInfo[k] = v;
      }
    });
    if (JSON.stringify(newRoleInfo) === "{}") {
      window.$message.warning("没有修改任何信息");
    } else {
      console.log(newRoleInfo);
      isFetching.value = true;
      const {
        data: d,
        onFetchResponse,
        execute,
      } = fetchUpdateRole(
        newRoleInfo as table.roleInfo,
        props.roleInfo?.id as number
      );
      onFetchResponse((res) => {
        if (d.value?.data) {
          window.$message.success("已成功更新角色");
          emit("update", newRoleInfo);
        }
      });
      execute().finally(() => (isFetching.value = false));
    }
  });
}
</script>
<template>
  <n-form
    ref="form"
    :model="model"
    :rules="rules"
    label-placement="left"
    label-width="auto"
    require-mark-placement="right-hanging">
    <n-form-item
      v-for="item in formItems"
      :key="item.path"
      :path="item.path"
      :label="item.label">
      <component :is="item.content()"></component>
    </n-form-item>
    <n-form-item>
      <n-button
        v-if="props.roleInfo"
        :loading="isFetching"
        @click="update"
        >更新</n-button
      >
      <n-button
        v-else
        @click="create"
        :loading="isFetching"
        >创建</n-button
      >
    </n-form-item>
  </n-form>
</template>
<style></style>
