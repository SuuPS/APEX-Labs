
<template>
  <div class="container">
    <a-typography-title class="w-full" :level="3">Назначения сеанса гемодиализа</a-typography-title>

    <div class="rounded col-span-12 my-5" style="width: fit-content; border: 1px solid #4096ff">
      <router-link
          :to="{name : 'AppointmentForm'}"
          style="padding: 5px 8px; color: #4096ff"
          class="flex items-center justify-around border">
        Добавить назначение
      </router-link>
    </div>

    <a-table class="w-full" :columns="columns" :data-source="appointmentDatas" bordered>
      <template #bodyCell="{ column, text, record, index }">
        <template v-if="['index'].includes(column.dataIndex)">
          {{ index }}
        </template>
        <template v-if="['doctor'].includes(column.dataIndex)">
          {{ record.doctor?.surname + ' ' + record.doctor?.name + ' ' + record.doctor?.patronymic }}
        </template>
        <template v-if="['dateAppointment'].includes(column.dataIndex)">
          {{ record.dateAppointment?.format('DD:MM:YYYY') }}
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <router-link
                :to="{name : 'AppointmentForm', query : { id: record.id }}"
                style="padding: 5px 8px; color: #4096ff"
                class="flex items-center justify-around border">
              Редактировать
            </router-link>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { useAppointmentStore } from "../../store/appointment/appointmentStore.ts";

const { appointmentDatas } = useAppointmentStore()

const columns = [
  {
    title: '№',
    dataIndex: 'index',
    width: '10%',
  },
  {
    title: 'ФИО врача',
    dataIndex: 'doctor',
    width: '25%',
  },
  {
    title: 'Дата записи',
    dataIndex: 'dateAppointment',
    width: '15%',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
];


</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>



