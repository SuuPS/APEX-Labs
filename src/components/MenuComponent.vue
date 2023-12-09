<template>
  <div class="menu-flex">
    <div style="width: 256px; height: 100vh;">
      <a-menu
          style="height: 100%"
          v-model:openKeys="menu.openKeys"
          v-model:selectedKeys="menu.selectedKeys"
          mode="inline"
          theme="dark"
          :inline-collapsed="menu.collapsed"
          :items="menuItems"
      ></a-menu>
    </div>
    <div>
      <LoaderComponent v-if="loading"/>
      <router-view v-else/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '../store/menu/menu.ts';
import LoaderComponent from "./LoaderComponent.vue";

const { menu, menuItems, loading } = useMenuStore();

</script>

<style scoped>

.menu-flex {
  display: flex;
  height: 100vh;
}


</style>
