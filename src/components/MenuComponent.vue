<template>
  <div class="menu-flex">
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
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue';
import { useMenuStore } from '../store/menu/menu.ts';

const { menu, menuItems } = useMenuStore();
const state = reactive(menu);
const items = ref(menuItems);

</script>

<style scoped>

.menu-flex {
  display: flex;
  height: 100vh;
}


</style>
