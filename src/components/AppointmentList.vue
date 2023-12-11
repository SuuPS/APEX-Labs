
<template>

  <div style="padding: 20px; width: 80%">

    <a-typography-title :level="3">Назначения сеанса гемодиализа</a-typography-title>

    <a-space>
      <a-button @click="add" type="primary">Добавить</a-button>
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

const { columns, data, add } = useAppointmentStore()

</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>