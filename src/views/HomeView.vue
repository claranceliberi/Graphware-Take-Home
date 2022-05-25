<script setup lang="ts">
import TheTable from "@/components/TheTable.vue";

import { useCustomStore } from "@/stores/store";

const store = useCustomStore();
</script>

<template>
  <main>
    <div v-if="store.users.data">
      <TheTable :data="store.users.data" title="Users" />
    </div>
    <div v-else>
      <p class="mt-20 ml-5">There is no more data to show...</p>
    </div>
  </main>
</template>
