<script lang="ts" setup>
import type { TableRow } from "@/types";
import { computed } from "vue";

interface IProps {
  data: TableRow[];
  title: string;
}

const props = defineProps<IProps>();

const header = computed(() => Object.keys(props.data[0].data));

const hasChildren = (data: TableRow) => {
  console.log(data);
  for (let el in data.kids) return true;
  return false;
};

const childrens = (data: TableRow) => {
  if (!hasChildren(data)) return [];

  return Object.keys(data.kids);
};
</script>

<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <h2 class="my-2 text-gray-900 text-lg font-semibold">{{ props.title }}</h2>
    <div class="table w-fulltext-sm text-left text-gray-500 dark:text-gray-400">
      <div
        class="table-header-group text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <div class="table-row">
          <div class="table-cell px-6 py-3">Song</div>
          <div class="table-cell px-6 py-3" v-for="head in header" :key="head">
            {{ head }}
          </div>
        </div>
      </div>
      <div class="table-row-group">
        <div
          v-for="data in props.data"
          :key="data.data[header[0]]"
          class="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <div class="table-cell px-6 py-3">
            <button type="reset" v-if="hasChildren(data)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M16 12l-6 6V6z" />
              </svg>
            </button>
          </div>
          <div class="table-cell px-6 py-3" v-for="head in header" :key="head">
            {{ data.data[head] }}
          </div>
          <div v-if="hasChildren(data)" class="table">
            supa
            <TheTable
              v-for="child in childrens"
              :data="data.kids[child].records"
              :key="child"
              :title="child"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
