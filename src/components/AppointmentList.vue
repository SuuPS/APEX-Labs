
<template>

  <div style="padding: 20px; width: 80%">

    <a-typography-title :level="3">Назначения сеанса гемодиализа</a-typography-title>

    <a-space>
      <router-link
          class="flex items-center justify-around"
          :to="{name : 'AppointmentForm'}">
        Добавить
      </router-link>
    </a-space>


    <div>
      <a-space direction="vertical" style="width: 100%; margin: 10px 0px 10px 0px">
        <a-input-search
            placeholder="Поиск..."
            enter-button
        />
      </a-space>
    </div>

    <a-table :columns="columns" :data-source="data" :scroll="{ x: 1500, y: 300 }">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'operation'">
          <a>action</a>
        </template>
      </template>
    </a-table>

  </div>
</template>

<script lang="ts" setup>
import { useAppointmentStore } from '../store/appointment/appointmentStore.ts'
import {TableColumnsType} from "ant-design-vue";

const columns: TableColumnsType = [
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
  },
];

const { data } = useAppointmentStore()

</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>