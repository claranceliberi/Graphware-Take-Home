<script setup lang="ts">
import TheTable from "@/components/TheTable.vue";

import { useCustomStore } from "@/stores/store";

const store = useCustomStore();
</script>

<template>
  <main>
    <TheTable :data="store.users" title="Users" />
  </main>
</template>
