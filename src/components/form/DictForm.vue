<script setup lang="ts">
import { fetchCreateDict, fetchDictValues, fetchUpdateDict } from "@/api/auth";
import {
  NButton,
  NEmpty,
  NInput,
  NInputNumber,
  NList,
  NListItem,
  NSwitch,
  NTable,
  NTag,
  type FormItemRule,
  type FormRules,
} from "naive-ui";
import { useTemplateRef, type VNode } from "vue";
import SvgIcon from "../SvgIcon.vue";

const { dict, isEdit = false } = defineProps<{
    dict?: data.dictType;
    isEdit?: boolean;
  }>(),
  formRef = useTemplateRef("form"),
  model = ref<form.dictInfo>({
    id: null,
    name: null,
    key: null,
    status: true,
    comment: null,
    values: [],
  }),
  originDictValues: data.dictValue[] = [],
  isFetching = ref(false);

if (dict) {
  Object.assign(model.value, dict);
  // 请求字典的键值列表
  fetchDictValues(dict.id).then((res) => {
    // 保存原键值列表
    originDictValues.push(...(res.data.value?.data as data.dictValue[]));
    model.value.values.push(...(res.data.value?.data as data.dictValue[]));
  });
}

const newDictValue = ref<{
  label: null | string;
  value: null | number;
}>({
  label: "",
  value: null,
});

const formItems: common.fromItem[] = [
  {
    path: "id",
    label: "id",
    content: () =>
      h(NInputNumber, {
        value: model.value.id,
        onUpdateValue: (v) => (model.value.id = v),
        showButton: false,
      }),
  },
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
    path: "values",
    label: "键值列表",
    content: () =>
      h(NTable, { size: "small", style: { "text-align": "center" } }, () => {
        const thead = h(
          "thead",
          h(
            "tr",
            ["键值", "键名", "操作"].map((v) => h("th", v))
          )
        );

        const rows: VNode[] = [
          h("tr", [
            h(
              "td",
              h(NInputNumber, {
                value: newDictValue.value.value,
                onUpdateValue: (v) => (newDictValue.value.value = v),
                placeholder: "",
                showButton: false,
              })
            ),
            h(
              "td",
              h(NInput, {
                value: newDictValue.value.label,
                onUpdateValue: (v) => (newDictValue.value.label = v),
                placeholder: "",
              })
            ),
            h(
              "td",
              h(
                NButton,
                {
                  type: "warning",
                  size: "tiny",
                  disabled: !isEdit,
                  onClick: () => {
                    if (
                      newDictValue.value.label !== null &&
                      newDictValue.value.value !== null
                    ) {
                      // 获取列表中最大的排序数，加1赋予新键值
                      const length = model.value.values.length;
                      model.value.values.push({
                        typeId: dict?.id,
                        ...newDictValue.value,
                        orderNum: length
                          ? model.value.values[length - 1].orderNum + 1
                          : 1,
                      } as data.dictValue);
                      newDictValue.value.label = null;
                      newDictValue.value.value = null;
                    } else {
                      window.$message.error("内容不能为空");
                    }
                  },
                },
                () => h(SvgIcon, { icon: "mi:circle-add" })
              )
            ),
          ]),
        ];
        if (model.value.values.length) {
          // 向表格中插入数据
          rows.unshift(
            ...model.value.values.map((value) =>
              h("tr", [
                h("td", value.value),
                h("td", value.label),
                h(
                  "td",
                  h(
                    NButton,
                    {
                      size: "tiny",
                      type: "error",
                      disabled: !isEdit,
                      onClick: () => {
                        model.value.values.splice(
                          model.value.values.findIndex(
                            (v) => v.value === value.value
                          ),
                          1
                        );
                      },
                    },
                    () => h(SvgIcon, { icon: "mi:delete" })
                  )
                ),
              ])
            )
          );
        } else {
          rows.unshift(
            h(
              "tr",
              h(
                "td",
                { colspan: 3 },
                h(NEmpty, { size: "small", description: "没有内容" })
              )
            )
          );
        }
        return [thead, h("tbody", rows)];
      }),
  },
  {
    path: "status",
    label: "状态",
    content: () =>
      h(NSwitch, {
        value: model.value.status,
        onUpdateValue: (value) => {
          model.value.status = value;
        },
      }),
  },
  {
    path: "comment",
    label: "备注",
    content: () =>
      h(NInput, {
        value: model.value.comment,
        onUpdateValue: (value) => {
          model.value.comment = value;
        },
        placeholder: "请输入备注",
        clearable: true,
      }),
  },
];

const rules: FormRules = {
  name: {
    required: true,
    message: "请输入字典名称",
    type: "string",
  },
  key: {
    required: true,
    message: "请输入字典标识",
    type: "string",
  },
  values: {
    required: true,
    validator: (rule: FormItemRule, value: data.dictValue[]) => {
      if (value.length) {
        return true;
      } else {
        return new Error("键值不能为空");
      }
    },
  },
};

function createDict() {
  // 校验输入值是否合法
  formRef.value?.validate().then(() => {
    isFetching.value = true;
    const { execute, data: d, onFetchResponse } = fetchCreateDict(model.value);
    onFetchResponse((res) => {
      if (d.value?.data) {
        window.$message.success("字典添加成功");
      }
    });
    execute().finally(() => (isFetching.value = false));
  });
}
function updateDict() {
  const newDictInfo: Record<string, any> = {};

  // 过滤出哪些信息被修改了
  Object.entries(dict as data.dictType).forEach(([k, v]) => {
    // @ts-ignore
    if (v !== model.value[k]) {
      // @ts-ignore
      newDictInfo[k] = model.value[k];
    }
  });
  // 若有信息被更新则添加id
  if (JSON.stringify(newDictInfo) !== "{}") {
    newDictInfo["id"] = dict?.id;
  }
  // 找到已删除的键值
  const deleteValues = originDictValues.filter((v) => {
    return (
      model.value.values.findIndex(
        (inputValue) =>
          inputValue.label === v.label && inputValue.value === v.value
      ) === -1
    );
  });

  // 找到添加的键值
  const addValues = model.value.values.filter((v) => {
    return (
      originDictValues.findIndex(
        (originValue) =>
          originValue.label === v.label && originValue.value === v.value
      ) === -1
    );
  });
  if (addValues.length) {
    newDictInfo["addValues"] = addValues;
  }
  if (deleteValues.length) {
    newDictInfo["deleteValues"] = deleteValues;
  }

  console.log(newDictInfo);

  formRef.value?.validate().then(() => {
    isFetching.value = true;
    const { execute, data, onFetchResponse } = fetchUpdateDict(newDictInfo);
    onFetchResponse((res) => {
      if (data.value?.data) {
        window.$message.success("成功更新字典信息");
      }
    });
    execute().finally(() => (isFetching.value = false));
  });
}
</script>
<template>
  <n-form
    ref="form"
    :model="model"
    :rules="rules"
    :disabled="!isEdit"
    loading
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
    <n-form-item v-if="!dict || isEdit">
      <n-space
        justify="center"
        style="width: 100%">
        <n-button
          v-if="!dict"
          @click="createDict"
          :loading="isFetching"
          >新增</n-button
        >
        <n-button
          v-else-if="isEdit"
          @click="updateDict"
          :loading="isFetching"
          >更新</n-button
        >
      </n-space>
    </n-form-item>
  </n-form>
</template>
<style></style>
