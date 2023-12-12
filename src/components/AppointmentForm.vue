
<template>
  <div class="">
    <a-form
        :model="formState"
        name="validate_other"
        v-bind="formItemLayout"
        @finishFailed="onFinishFailed"
        @finish="onFinish"
        class="container border m-auto mt-8 rounded p-5 grid grid-cols-12 gap-2">

      <!-- Заголовок -->
      <div class="col-span-12 grid grid-cols-12 mt-3">

        <div class="col-span-5">
          <a-typography-title :level="3">
            Сеанс гемодиализа
          </a-typography-title>
        </div>

        <div class="col-span-2 text-center pt-2">
          <a-typography-title :level="5">
            № месяце: <span class="text-cyan-900">4</span>
          </a-typography-title>
        </div>

        <div class="col-span-12">
          <a-typography-title :level="3">Назначения сеанса гемодиализа</a-typography-title>
        </div>
      </div>

      <!-- Программа аппарата -->
      <div class="col-span-12">
        <a-typography-text strong class="font-medium mb-2">Программа аппарата</a-typography-text>
        <a-form-item
            class="mt-1 mb-0"
            name="radio-button"
            :rules="[{ required: true, message: 'Please pick an item!' }]">
          <a-radio-group v-model:value="formState.softType" class="flex items-center gap-1">
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="SoftType.HD">HD</a-radio-button>
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="SoftType.HDF">HDF</a-radio-button>
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="SoftType.UF">UF</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </div>

      <!-- Диализатор -->
      <div class="col-span-12 grid grid-cols-12">
        <a-typography-text strong class="font-medium col-span-12">Диализатор</a-typography-text>
        <div class="col-span-4 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.dialyzer.name !== '' ? formState.dialyzer.name : 'Спр. Диализатор'"/>
          <button
              type="button"
              @click="showModal('dialyzer', 'dialyzer')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Концентратор -->
      <div class="col-span-12 grid grid-cols-12">
        <div class="font-medium col-span-4">
          <a-typography-text class="" strong>Концентратор</a-typography-text>
          <div class="flex items-center gap-2 mt-2">
            <a-input placeholder="Basic usage" :value="formState.dialyzer.name !== '' ? formState.dialyzer.name : 'Спр. Концентратор'"/>
            <button
                type="button"
                @click="showModal('concentrator', 'concentrator')"
                class="border flex justify-center items-center w-10 h-full py-2 rounded">
              <MenuUnfoldOutlined/>
            </button>
          </div>
        </div>

        <div class="col-span-1"></div>

        <div class="font-medium col-span-1 grid grid-cols-12 gap-2">
          <a-typography-text class="col-span-12" strong>Объем л.</a-typography-text>
          <a-input-number v-model:value="formState.concentratorVolume" class="col-span-12" addon-after="л"></a-input-number>
        </div>
      </div>

      <!-- Тип инъекции -->
      <div class="col-span-12 mt-3">
        <a-typography-text strong class="font-medium mb-2">Тип инъекции</a-typography-text>
        <a-form-item
            class="mt-1"
            :rules="[{ required: true, message: 'Пожалуйста, выберите тип инъекции!' }]">
          <a-radio-group v-model:value="formState.injectionType" class="flex items-center gap-1">
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="InjectionType.Spine">Игла</a-radio-button>
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="InjectionType.Catheter">Катетер</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </div>

      <div class="col-span-12 grid grid-cols-12">
          <a-input placeholder="Basic usage" :value="formState.dialyzer.name !== '' ? formState.dialyzer.name : 'Спр. Иглы'"/>
          <button
              type="button"
              @click="showModal('spine', 'spine')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
      </div>

    </a-form>

    <!-- Модальное окно -->
    <div>
      <a-modal
          v-model:open="modal.open">
        <CommonView @handleSelect="handleSelect" :modal-name="modal.tableName"/>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue';
import CommonView from "./CommonView.vue";
import { UploadOutlined, InboxOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useAppointmentStore } from '../store/appointment/appointmentStore.ts'
import {SoftType, modalType, InjectionType} from "../store/appointment/appointmentTypes.ts";
import { DataItem } from "../store/common/commonTypes.ts";

const useAppointment = useAppointmentStore()

const { formState, setDataIttem } = useAppointment

const modal = reactive<modalType>({
  open: false,
  tableName: '',
  inputField: '',
})

const showModal = (tableName: string, inputField: string) => {
  modal.open = true;
  modal.tableName = tableName;
  modal.inputField = inputField
};

const handleSelect = (event) => {
  console.log(event, 'select');
  setDataIttem(modal.tableName, event)

  modal.open = false;
  modal.tableName = ''
  modal.inputField = ''
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};


const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style>
.ant-modal-footer{
  display: none;
}
</style>

