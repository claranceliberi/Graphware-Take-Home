<script lang="ts">
export default {
  name: "TheTable",
};
</script>
<script lang="ts" setup>
import { useCustomStore } from "@/stores/store";
import type { Path, TableRow } from "@/types";
import { computed, ref } from "vue";

interface IProps {
  data: TableRow[];
  title: string;
  child?: boolean;
  path?: Path[];
}

const props = defineProps<IProps>();
const store = useCustomStore();

// titles which are used in table header
const header = computed(() =>
  props.data.length == 0 ? [] : Object.keys(props.data[0].data)
);

//check whether the node has children
const hasChildren = (data: TableRow) => {
  for (let el in data.kids) return true;
  return false;
};

// childrens which are in node
const childrens = (data: TableRow) => {
  if (!hasChildren(data)) return [];

  return Object.keys(data.kids);
};

const active = ref(0);

function deleteIt(index: number) {
  active.value = 0;
  store.delete(index, props.path);
}
</script>

<template>
  <div
    class="relative overflow-x-auto my-2 sm:rounded-lg"
    :class="props.child ? 'ml-8' : ''"
  >
    <h2 class="my-2 text-gray-900 text-lg font-semibold">
      {{ props.title.toUpperCase() }}
    </h2>
    <table
      class="table w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        class="table-header-group font-semibold text-xs border-y border-gray-300 text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr class="table-row">
          <th class="table-cell px-6 py-3"></th>
          <th v-for="head in header" :key="head" class="table-cell px-6 py-3">
            {{ head }}
          </th>
          <th class="table-cell px-6 py-3"></th>
        </tr>
      </thead>
      <tbody class="table-row-group">
        <!-- loop in data that that was passed in component -->
        <template
          v-for="(node, rowNum) in props.data"
          :key="node.data[header[0]]"
        >
          <tr
            class="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="table-cell px-6 py-3">
              <!-- button to show kids that when they are available -->
              <button
                v-if="hasChildren(node)"
                type="reset"
                @click="
                  active == rowNum + 1 ? (active = 0) : (active = rowNum + 1)
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  class="fill-gray-500"
                  :class="active == rowNum + 1 ? 'rotate-90' : ''"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M16 12l-6 6V6z" />
                </svg>
              </button>
            </td>
            <td v-for="head in header" :key="head" class="table-cell px-6 py-3">
              {{ node.data[head] }}
            </td>
            <td>
              <!-- button to delete data -->
              <button class="px-2" @click="deleteIt(rowNum)">
                <svg
                  class="rotate-45 fill-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
                </svg>
              </button>
            </td>
          </tr>
          <!-- when current node has children we render this component to show children data -->
          <tr v-if="hasChildren(node) && active == rowNum + 1">
            <td :colspan="header.length + 1">
              <TheTable
                v-for="(childNode, childIndex) in childrens(node)"
                :key="childIndex"
                :data="node.kids[childNode].records"
                :title="childNode"
                :child="true"
                :path="
                  props.path
                    ? [...props.path, { index: rowNum, property: childNode }]
                    : [{ index: rowNum, property: childNode }]
                "
              />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
