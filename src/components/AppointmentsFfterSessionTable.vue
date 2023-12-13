<template>
  <div class="rounded" style="width: fit-content; border: 1px solid #61b045">
    <a-button
        @click="addSessionTable"
        style="padding: 15px 25px 15px 25px; color: #61b045"
        type="text"
        class="flex items-center justify-around border">
      Сформировать
    </a-button>
  </div>

  <a-table bordered :data-source="formState.sessionTableResult" :columns="columns" class="mt-3">
    <template #bodyCell="{ column, text, record, index }">
      <template v-if="column.dataIndex === 'operation'">
        <a
            @click="delSessionTable(index)">
          <DeleteOutlined />
        </a>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import {DeleteOutlined} from '@ant-design/icons-vue';
import { useAppointmentStore } from "../store/appointment/appointmentStore.ts";

const { addSessionTable, formState, delSessionTable } = useAppointmentStore()

const columns = [
  {
    title: 'Лекарственный препарат',
    dataIndex: 'medicinalProduct',
    width: '25%',
  },
  {
    title: 'Путь приема',
    dataIndex: 'receptionPath',
    width: '12',
  },
  {
    title: 'Дозировка',
    dataIndex: 'doses',
    width: '12',
  },
  {
    title: 'Начало приёма',
    dataIndex: 'sessionDateStart',
    width: '12',
  },
  {
    title: 'Конец приёма',
    dataIndex: 'sessionDateEnd',
    width: '12',
  },
  {
    title: 'Номер сеанса',
    dataIndex: 'sessionCount',
    width: '12',
  },
  {
    title: 'Дней',
    dataIndex: 'days',
    width: '5',
  },
  {
    title: 'Удалить',
    dataIndex: 'operation',
  },
];

const count = computed(() => formState.sessionTableResult.length + 1);

</script>

<style lang="less" scoped>

</style>
