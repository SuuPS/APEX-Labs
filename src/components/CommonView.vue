
<template>

  <div class="container">

    <!-- Заголовок -->
    <a-typography-title :level="3">{{ getTitle }}</a-typography-title>

    <!-- Инпут для ввода наименования-->
    <div>
      <a-form
          :model="formState"
          name="nest-messages"
          :validate-messages="{required: '${label} обязателен!'}"
          @finish="add">
        <a-typography-text strong class="font-medium">Наименование справочника<span style="color: red"> *</span></a-typography-text>
        <div style="display: flex; align-items: center; gap: 5px">
          <a-form-item class="w-full" :name="['name']" :rules="[{ required: true }]">
            <a-input v-model:value="formState.name" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" class="flex items-center justify-around" ghost html-type="submit">
              <DiffOutlined />
              Создать
            </a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>

    <!-- Поиск -->
    <div>
      <a-space direction="vertical" style="width: 100%; margin-bottom: 10px">
        <a-input-search
            v-model:value="search"
            placeholder="Введите название..."
            enter-button
        />
      </a-space>
    </div>

    <!-- Таблица -->
    <a-table :columns="columns" :data-source="filteredDataSource" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.dataIndex === 'name'">
          <div>
            <a-input
                v-if="editableData[record.id]"
                v-model:value="editableData[record.id][column.dataIndex]"
                style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
          <span v-if="editableData[record.id]">
            <a-typography-link @click="save(record.id)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
            <span v-else style="display: flex; justify-content: space-around;">
              <div v-if="props.modalName">
                <a-button @click="selectValue(record)" class="flex items-center justify-around" type="text">
                  <ArrowRightOutlined />
                </a-button>
              </div>
              <div v-else>
                <a @click="edit(record.id)">
                  <EditOutlined/>
                </a>
                <a @click="deleteRow(record.id)">
                  <DeleteOutlined />
                </a>
              </div>
            </span>
          </div>
        </template>
      </template>
    </a-table>
  </div>

</template>

<script lang="ts" setup>
import {onMounted, toRefs, computed, watch, ref} from 'vue';
import { EditOutlined, DeleteOutlined, DiffOutlined, ArrowRightOutlined } from '@ant-design/icons-vue';
import { useCommonStore } from "../store/common/commonStore.ts";
import { useMenuStore} from "../store/menu/MenuStore.ts";
import {DataItem} from "../store/common/commonTypes.ts";

const emit = defineEmits(['handleSelect'])

const props = defineProps({
  modalName: { type: String, required: false }
})

const commonStore = useCommonStore();

const { setCurrentDataSource, add, formState, columns, editableData, edit, save, cancel, deleteRow } = commonStore;

const { filteredDataSource, search, getTitle } = toRefs(commonStore);

const selectValue = (dataItem: DataItem) => {
  emit('handleSelect', dataItem)
}

onMounted(()=>{
  setCurrentDataSource(props.modalName ? props.modalName : useMenuStore().pageName)
})

watch(() => props.modalName, (newValue) => {
  setCurrentDataSource(newValue)
});

watch(() => useMenuStore().pageName, (newValue) => {
  setCurrentDataSource(newValue)
});



</script>

<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>