
<template>
  <div class="">
    <a-form
        :model="formState"
        name="validate_other"
        v-bind="formItemLayout"
        @finishFailed="onFinishFailed"
        @finish="onFinish"
        class="container border m-auto shadow-md mt-8 rounded-2xl p-5 grid grid-cols-12 gap-2">

      <div class="col-span-12">
        <a-typography-title class="col-span-5 flex justify-between items-center" :level="3">
          Сеанс гемодиализа
          <a-typography-title :level="5">
            № месяце: <span class="text-cyan-900">4</span>
          </a-typography-title>
        </a-typography-title>
        <a-typography-title class="" :level="3">Назначения сеанса гемодиализа</a-typography-title>
      </div>

      <div class="col-span-12">
        <a-typography-text strong class="font-medium mb-2">Программа аппарата</a-typography-text>
        <a-form-item
            class="mt-1"
            name="radio-button"
            :rules="[{ required: true, message: 'Please pick an item!' }]">
          <a-radio-group v-model:value="formState['radio-button']" class="flex items-center gap-1">
            <a-radio-button style="width: 100px" class="flex justify-center items-center" value="a">HD</a-radio-button>
            <a-radio-button style="width: 100px" class="flex justify-center items-center" value="b">HDF</a-radio-button>
            <a-radio-button style="width: 100px" class="flex justify-center items-center" value="c">UF</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </div>

      <div class="col-span-12 grid grid-cols-12">
        <a-typography-text strong class="font-medium col-span-12">Диализатор</a-typography-text>
        <div class="col-span-4 flex items-center gap-2 mt-2">
          <a-input placeholder="Basic usage" value='Спр. "Диализаторы"'/>
          <button class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <div class="col-span-12 grid grid-cols-12">
        <div class="font-medium col-span-4">
          <a-typography-text class="" strong>Концентратор</a-typography-text>
          <div class="flex items-center gap-2 mt-2">
            <a-input placeholder="Basic usage" value='Спр. "Концентраторы"'/>
            <button class="border flex justify-center items-center w-10 py-2 h-full rounded">
              <MenuUnfoldOutlined/>
            </button>
          </div>
        </div>

        <div class="col-span-1"></div>

        <div class="font-medium col-span-1 grid grid-cols-12 gap-2">
          <a-typography-text class="col-span-12" strong>Объем л.</a-typography-text>
          <a-input-number class="col-span-12" addon-after="л"></a-input-number>
        </div>
      </div>


    </a-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { UploadOutlined, InboxOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const formState = reactive<Record<string, any>>({
  'input-number': 3,
  'checkbox-group': ['A', 'B'],
  rate: 3.5,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

<style>
@media (max-width: 639px) {
  .container {
    max-width: 100%;
  }
}

/* Для экранов шириной от 640 пикселей до 767 пикселей */
@media (min-width: 640px) and (max-width: 767px) {
  .container {
    max-width: 100%;
  }
}

/* Для экранов шириной от 768 пикселей до 1023 пикселей */
@media (min-width: 768px) and (max-width: 1023px) {
  .container {
    max-width: 100%;
  }
}

/* Для экранов шириной 1024 пикселя и более */
@media (min-width: 1024px) {
  .container {
    max-width: 960px; /* Ваша желаемая ширина для больших экранов */
  }
}
</style>

