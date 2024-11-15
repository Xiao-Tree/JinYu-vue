<script setup lang="ts">
import { fetchCreateUser, fetchUpdateUser } from "@/api/auth";
import { useUserStore } from "@/stores";
import { verifyValue } from "@/utils/common";
import {
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NSelect,
  NSpace,
  NUpload,
  type FormItemRule,
  type FormRules,
  type UploadFileInfo,
} from "naive-ui";
import { useTemplateRef } from "vue";

const props = defineProps<{
  sexDict: data.dict;
  statusDict?: data.dict;
  deptList: data.deptInfo[];
  roleList: data.role[];
  userInfo?: table.userInfo;
}>();

const formRef = useTemplateRef("form");
const model = ref<table.userInfo>({
  id: null,
  username: "",
  password: undefined,
  sex: null,
  email: null,
  avatar: undefined,
  phoneNum: null,
  deptId: null,
  roleIds: [],
  status: undefined,
  createAt: undefined,
});
const rules: FormRules = {
  username: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value || !value.length) {
        return new Error("用户名不能为空");
      } else {
        try {
          verifyValue(value, "username");
        } catch (error) {
          return error as Error;
        }
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    validator(rule: FormItemRule, value: string) {
      if (!value || !value.length) {
        return new Error("密码不能为空");
      } else {
        try {
          verifyValue(value, "password");
        } catch (error) {
          return error as Error;
        }
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  deptId: {
    required: true,
    validator(rule: FormItemRule, value: number) {
      if (!value) {
        return new Error("请选择一个部门");
      }
      return true;
    },
    trigger: ["blur", "change"],
  },
  roleIds: {
    required: true,
    validator(rule: FormItemRule, value: number[]) {
      if (!value || !value.length) {
        return new Error("请至少一个角色");
      }
      return true;
    },
    trigger: ["blur"],
  },
  phoneNum: {
    validator(rule: FormItemRule, value: string) {
      if (value && value.length) {
        try {
          verifyValue(value, "phoneNum");
        } catch (error) {
          return error as Error;
        }
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
  email: {
    validator(rule: FormItemRule, value: string) {
      if (value && value.length) {
        try {
          verifyValue(value, "email");
        } catch (error) {
          return error as Error;
        }
      }
      return true;
    },
    trigger: ["input", "blur"],
  },
};
const defaultFileList: UploadFileInfo[] = [];
if (props.userInfo?.avatar) {
  defaultFileList.push({
    id: "default",
    name: "default",
    status: "finished",
    url: `${window.location.origin}${
      import.meta.env.VITE_BASE_URL
    }/resources/upload/${props.userInfo?.avatar}`,
  });
}
const isCreating = ref(false);
let items: common.fromItem[] = [
  {
    path: "avatar",
    label: "头像",
    content: () =>
      h(NUpload, {
        max: 1,
        listType: "image-card",
        defaultFileList,
        onUpdateFileList: (fileList: UploadFileInfo[]) => {
          if (fileList.length) {
            model.value.avatar = fileList[0].file;
          } else {
            model.value.avatar = null;
          }
        },
      }),
  },
  {
    path: "username",
    label: "用户名",
    content: () =>
      h(NInput, {
        value: model.value.username,
        "onUpdate:value": (value: string) => {
          model.value.username = value;
        },
        placeholder: "请输入用户名",
        clearable: true,
      }),
  },
  {
    path: "password",
    label: "密码",
    content: () =>
      h(NInput, {
        value: model.value.password,
        "onUpdate:value": (value: string) => {
          model.value.password = value;
        },
        type: "password",
        placeholder: "请输入密码",
        showPasswordOn: "click",
        clearable: true,
      }),
  },
  {
    path: "sex",
    label: "性别",
    content: () =>
      h(
        NRadioGroup,
        {
          value: model.value.sex,
          "onUpdate:value": (value) => {
            model.value.sex = value;
          },
          name: "sex",
        },
        () =>
          h(NSpace, () =>
            props.sexDict.values.map((v) =>
              h(NRadio, { label: v.label, value: v.value })
            )
          )
      ),
  },
  {
    path: "email",
    label: "邮箱",
    content: () =>
      h(NInput, {
        value: model.value.email,
        onUpdateValue: (value) => {
          model.value.email = value;
        },
        placeholder: "请输入邮箱地址",
        clearable: true,
      }),
  },
  {
    path: "phoneNum",
    label: "手机号",
    content: () =>
      h(NInput, {
        value: model.value.phoneNum,
        onUpdateValue: (value) => {
          model.value.phoneNum = value;
        },
        placeholder: "请输入手机号",
        clearable: true,
      }),
  },
  {
    path: "deptId",
    label: "部门",
    content: () =>
      h(NSelect, {
        value: model.value.deptId,
        "onUpdate:value": (value: number) => {
          model.value.deptId = value;
        },
        placeholder: "请选择部门",
        options: props.deptList.map((dept) => {
          return { label: dept.name, value: dept.id };
        }),
      }),
  },
  {
    path: "roleIds",
    label: "角色",
    content: () =>
      h(NSelect, {
        value: model.value.roleIds,
        "onUpdate:value": (value: number[]) => {
          model.value.roleIds = value;
        },
        placeholder: "请选择角色",
        clearable: true,
        multiple: true,
        options: props.roleList.map((role) => {
          return { label: role.name, value: role.id };
        }),
      }),
  },
];
// 当存在原用户信息是表示需要修改信息
if (props.userInfo) {
  Object.assign(model.value, props.userInfo);
  items = [
    {
      path: "id",
      label: "UID",
      content: () =>
        h(NInputNumber, {
          value: model.value.id,
          onUpdateValue: (v) => (model.value.id = v),
          showButton:false
        }),
    },
    ...items,
    {
      path: "status",
      label: props.statusDict?.type.name as string,
      content: () =>
        h(
          NRadioGroup,
          {
            value: model.value.status,
            "onUpdate:value": (value) => {
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
      path: "createAt",
      label: "创建时间",
      content: () => h("span", model.value.createAt),
    },
  ];
}

function closeModal() {
  window.$modal.destroyAll();
}
function createUser() {
  formRef.value
    ?.validate()
    .then(() => {
      isCreating.value = true;
      console.log(model.value);
      fetchCreateUser(model.value).then((response) => {
        if (response.data.value?.data) {
          window.$message.success(response.data.value.msg);
        } else {
          window.$message.error(response.data.value.msg);
        }
      });
    })
    .finally(() => {
      isCreating.value = false;
    });
}
function updateUser() {
  // 过滤出哪些信息被修改了
  const newInfo: [string, any][] = [];
  if (props.userInfo) {
    const infos = Object.entries(props.userInfo)
      .filter((info) => {
        const modelValue = model.value[info[0] as never];
        // 当存在原头像时更新头像
        if (info[0] === "avatar") {
          if ((!info[1] && modelValue) || info[1] !== modelValue) {
            newInfo.push(["originalAvatar", info[1]]);
            return true;
          } else {
            return false;
          }
        }
        return JSON.stringify(info[1]) !== JSON.stringify(modelValue);
      })
      .map((v) => [v[0], model.value[v[0] as never]]);
    newInfo.push(...(infos as [string, any][]));
    if (newInfo.find((info) => info[0] === "roleIds")) {
      newInfo.push(["originalRoleIds", props.userInfo.roleIds]);
    }
    console.log(newInfo);
  }
  if (newInfo.length) {
    const {
      data: d,
      execute,
      onFetchResponse,
    } = fetchUpdateUser(newInfo, props.userInfo?.id as number);
    onFetchResponse((res) => {
      if (d.value.data) {
        window.$message.success("更新成功");
        closeModal();
      }
    });
    execute();
  } else {
    window.$message.warning("没有要更新的信息！");
  }
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
      v-for="item in items"
      :key="item.path"
      :path="item.path"
      :label="item.label">
      <component :is="item.content()"></component>
    </n-form-item>
    <n-form-item>
      <n-space
        inline
        justify="end"
        style="width: 100%">
        <n-button
          v-if="props.userInfo"
          @click="updateUser"
          type="primary"
          >更新</n-button
        >
        <n-button
          v-else
          @click="createUser"
          :loading="isCreating"
          type="success"
          >创建</n-button
        >
        <n-button
          @click="closeModal"
          type="info"
          >取消</n-button
        >
      </n-space>
    </n-form-item>
  </n-form>
</template>
<style></style>
