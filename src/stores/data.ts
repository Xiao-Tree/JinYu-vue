import { fetchDict } from "@/api/auth";
import { defineStore } from "pinia";

export const useDictStore = defineStore("dict", () => {
  let dictData = new Map<string, data.dict>();

  async function getDict(key: string) {
    if (!dictData.has(key)) {
      const { data, onFetchResponse, execute } = fetchDict(key);
      onFetchResponse((response) => {
        // @ts-ignore
        dictData.set(key,data.value.data)
      });
      await execute();
    }
    return dictData.get(key);
  }
  return { getDict };
});
