// Справочник иглы

<template>

  <div style="padding: 20px; width: 80%">

    <a-typography-title :level="3">Справочник иглы</a-typography-title>

    <div>
      <a-form
          :model="formState"
          name="nest-messages"
          :validate-messages="{required: '${label} обязателен!'}"
          @finish="add"
      >
        <div style="display: flex; align-items: center; gap: 5px">
          <a-form-item style="width: 100%" :name="['name']" label="Наименование справочника" :rules="[{ required: true }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">
              <DiffOutlined />
              Создать
            </a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>

    <div>
        <a-space direction="vertical" style="width: 100%; margin-bottom: 10px">
          <a-input-search
              v-model:value="value"
              placeholder="Введите название..."
              enter-button
          />
        </a-space>
    </div>

    <a-table :columns="columns" :data-source="filteredDataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div>
            <a-input
                v-if="editableData[record.key]"
                v-model:value="editableData[record.key][column.dataIndex]"
                style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
            <span v-else style="display: flex; justify-content: space-around;">
              <a @click="edit(record.key)">
                <EditOutlined/>
              </a>
              <a @click="deleteRow(record.key)">
                <DeleteOutlined />
              </a>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';
import { EditOutlined, DeleteOutlined, DiffOutlined } from '@ant-design/icons-vue';
import { useSpineStore} from "../../store/spine/spineStore.ts";

const { filteredDataSource, add, formState, value, columns, editableData, edit, save, cancel, deleteRow } = toRefs(useSpineStore());

</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>



