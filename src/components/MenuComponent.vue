<template>
  <div :class="isTabletResolution ? 'menu-parent-active' : 'menu-parent'">
    <div :class="isTabletResolution ? 'menu-mode' : 'menu'">
      <a-menu
          v-model:openKeys="menu.openKeys"
          v-model:selectedKeys="menu.selectedKeys"
          :mode="isTabletResolution ? 'horizontal' : 'inline'"
          theme="dark"
          :inline-collapsed="menu.collapsed"
          :items="menuItems"
      ></a-menu>
    </div>
    <div style="width: 100%">
      <LoaderComponent v-if="loading"/>
      <router-view v-else/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMenuStore } from '../store/menu/MenuStore.ts';
import LoaderComponent from "./LoaderComponent.vue";

const { menu, menuItems, loading, isTabletResolution } = useMenuStore();

</script>

<style scoped>

.menu-parent {
  display: flex;
}

.menu-parent-active {
  display: block;
  width: 100%;
}

.menu {
  width: 256px; height: 100vh;
}

.menu-mode{
  width: 100%;
}


</style>
