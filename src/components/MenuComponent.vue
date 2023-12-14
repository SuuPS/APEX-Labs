<template>
  <div :class="toggleMenu ? 'h-screen' : 'flex'">
    <div :class="toggleMenu ? 'w-full' : 'w-256 h-full'">
      <a-menu
          v-model:openKeys="menu.openKeys"
          v-model:selectedKeys="menu.selectedKeys"
          :mode="toggleMenu ? 'horizontal' : 'inline'"
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
import {ref} from "vue";

const { menu, menuItems, loading } = useMenuStore();

const getWidth = () => {
  // Создаем медиа-запрос, соответствующий условиям вашего CSS-медиа-запроса
  const mediaQuery = window.matchMedia('(min-width: 1024px)');

  // Возвращаем текущую ширину в зависимости от того, соответствует ли медиа-запрос
  return mediaQuery.matches ? false : true;
}

window.addEventListener('resize', () => {
  toggleMenu.value = getWidth()
});

const toggleMenu = ref<boolean>(false);

</script>

<style scoped>

.menu-parent {
  display: flex;
}

.menu {
  width: 256px; height: 100vh;
}


</style>
