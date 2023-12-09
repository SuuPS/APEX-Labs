<template>
  <div style="width: 256px; height: 100vh;">
    <a-menu
        style="height: 100%"
        v-model:openKeys="state.openKeys"
        v-model:selectedKeys="state.selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="state.collapsed"
        :items="items"
    ></a-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMenuStore } from '../store/menu/menu.ts';

const { menu, menuItems } = useMenuStore();
const state = ref(menu);
const items = ref(menuItems);

</script>
