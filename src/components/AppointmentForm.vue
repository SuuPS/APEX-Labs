
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
      </div>


      <!------------------------------------- STEP 1 START ----------------------------------------->

      <!-- Назначения сеанса гемодиализа -->
      <div class="col-span-12">
        <a-typography-title :level="3">Назначения сеанса гемодиализа</a-typography-title>
      </div>

      <!-- Программа аппарата -->
      <div class="col-span-12">
        <a-typography-text strong class="font-medium mb-2">Программа аппарата</a-typography-text>
        <a-form-item
            class="mt-1 mb-0"
            name="radio-button"
            :rules="[{ required: true, message: 'Пожалуйста, выберите программу аппарата!' }]">
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
            <a-input placeholder="Basic usage" :value="formState.concentrator.name !== '' ? formState.concentrator.name : 'Спр. Концентратор'"/>
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

      <!-- Спр. "Иглы" -->
      <div class="col-span-12 grid grid-cols-12 gap-3">
        <div class="col-span-3 flex items-center gap-2">
          <a-input
              :disabled="formState.injectionType === InjectionType.Catheter"
              class="w-full"
              placeholder="Basic usage"
              :value="formState.spineType.name !== '' ? formState.spineType.name : 'Спр. Иглы...'"/>
          <button
              :disabled="formState.injectionType === InjectionType.Catheter"
              type="button"
              @click="showModal('spineType', 'spineType')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>

        <div class="col-span-3 flex items-center gap-2">
          <a-input
              :disabled="formState.injectionType === InjectionType.Catheter"
              class="w-full"
              placeholder="Basic usage"
              :value="formState.spine.name !== '' ? formState.spine.name : 'Спр. Типы иглы...'"/>
          <button
              :disabled="formState.injectionType === InjectionType.Catheter"
              type="button"
              @click="showModal('spine', 'spine')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Спр. "Катетеры" -->
      <div class="col-span-12 grid grid-cols-12 gap-3 mb-2">
        <div class="col-span-3 flex items-center gap-2">
          <a-input
              :disabled="formState.injectionType === InjectionType.Spine"
              class="w-full"
              placeholder="Basic usage"
              :value="formState.catheterType.name !== '' ? formState.catheterType.name : 'Спр. Катетеры...'"/>
          <button
              :disabled="formState.injectionType === InjectionType.Spine"
              type="button"
              @click="showModal('spineType', 'catheterType')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>

        <div class="col-span-3 flex items-center gap-2">
          <a-input
              :disabled="formState.injectionType === InjectionType.Spine"
              class="w-full"
              placeholder="Basic usage"
              :value="formState.catheter.name !== '' ? formState.catheter.name : 'Спр. Типы катетеров...'"/>
          <button
              :disabled="formState.injectionType === InjectionType.Spine"
              type="button"
              @click="showModal('catheter', 'catheter')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Спр. "Бикарбонат" -->
      <div class="col-span-3">
        <a-typography-text strong class="font-medium mb-2">Бикарбонат</a-typography-text>
        <div class="gap-2 flex items-center">
          <a-input
              class="w-full"
              placeholder="Basic usage"
              :value="formState.bicarbonate.name !== '' ? formState.bicarbonate.name : 'Спр. Катетеры...'"/>
          <button
              type="button"
              @click="showModal('bicarbonate', 'bicarbonate')"
              class="border flex justify-center items-center w-10 py-2 rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Сухой вес пациента -->
      <div class="col-span-2">
        <a-typography-text strong class="font-medium mb-2">Сухой Вес пациента</a-typography-text>
        <a-input-number
            v-model:value="formState.patientWeight"
            addon-after="кг">
        </a-input-number>
      </div>

      <!-- Антикоагуляция -->
      <div class="col-span-2">
        <a-typography-text strong class="font-medium mb-2">Антикоагуляция</a-typography-text>
        <a-input
            placeholder="Наименование"
            v-model:value="formState.anticoagulation"/>
      </div>

      <!-- Объем -->
      <div class="col-span-2">
        <a-typography-text strong class="font-medium mb-2">Объем</a-typography-text>
        <a-input
            v-model:value="formState.anticoagulationVolume"
            addon-after="ед" />
      </div>

      <!-- Назначения сеанса гемодиализа -->
      <div class="col-span-12 mt-3 mb-3">

        <!-- Сформировать сеанс -->
        <div class="rounded" style="width: fit-content; border: 1px solid #61b045">
          <a-button
              @click="createdSession"
              style="padding: 15px 25px 15px 25px; color: #61b045"
              type="text"
              class="flex items-center justify-around border">
            Сформировать сеанс
          </a-button>
        </div>

        <!-- Результат -->
        <div v-if="formState.createdSession" class="border p-5 flex flex-wrap gap-5 mt-4">
          <!-- Программа аппарата -->
          <div class="flex items-center gap-2">
            <FundProjectionScreenOutlined />
            <a-typography-text strong class="font-medium mb-2">Программа аппарата: {{formState.softType}}</a-typography-text>
          </div>

          <!-- Диализатор -->
          <div class="flex items-center gap-2" v-if="formState.dialyzer.name !== ''">
            <ColumnWidthOutlined />
            <a-typography-text strong class="font-medium mb-2">Диализатор: {{formState.dialyzer.name}}</a-typography-text>
          </div>

          <!-- Концентратор -->
          <div class="flex items-center gap-2" v-if="formState.concentrator.name !== ''">
            <BgColorsOutlined />
            <a-typography-text strong class="font-medium mb-2">Концентратор: {{formState.concentrator.name}}</a-typography-text>
          </div>

          <!-- Игла/Катетер -->
          <div class="flex items-center gap-2" v-if="formState.catheter.name !== '' || formState.spine.name !== ''">
            <ToolOutlined />
            <a-typography-text v-if="formState.injectionType === InjectionType.Spine" strong class="font-medium mb-2">
              Игла/Катетер:
              {{ formState.spineType.name }} - {{ formState.spine.name }}
            </a-typography-text>
            <a-typography-text v-else-if="formState.injectionType === InjectionType.Catheter" strong class="font-medium mb-2">
              Игла/Катетер:
              {{ formState.catheterType.name }} - {{ formState.catheter.name }}
            </a-typography-text>
          </div>

          <!-- Бикарбонат -->
          <div class="flex items-center gap-2" v-if="formState.bicarbonate.name !== ''">
            <ExperimentOutlined />
            <a-typography-text strong class="font-medium mb-2">Бикарбонат: {{ formState.bicarbonate.name }}</a-typography-text>
          </div>

          <!-- Антикоагуляция -->
          <div class="flex items-center gap-2" v-if="formState.anticoagulation !== ''">
            <ExperimentOutlined />
            <a-typography-text strong class="font-medium mb-2">Антикоагуляция: {{ formState.anticoagulation }}</a-typography-text>
          </div>

          <!-- Сухой Вес пациента -->
          <div class="flex items-center gap-2" v-if="formState.anticoagulationVolume > 0">
            <ExperimentOutlined />
            <a-typography-text strong class="font-medium mb-2">Сухой Вес пациента: {{ formState.anticoagulationVolume }}</a-typography-text>
          </div>

        </div>

      </div>

      <!------------------------------------- STEP 1 END ----------------------------------------->

      <!------------------------------------- STEP 2 START ----------------------------------------->


      <!-- Назначения после сеанса -->
      <div class="col-span-12 border-t pt-5">
        <a-typography-title :level="3">Назначения после сеанса</a-typography-title>
      </div>

      <!-- Лекарственный препарат -->
      <div class="col-span-12 grid grid-cols-12">
        <a-typography-text strong class="font-medium col-span-12">Лекарственный препарат</a-typography-text>
        <div class="col-span-6 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.medicinalProduct.name !== '' ? formState.medicinalProduct.name : 'Спр. препараты'"/>
          <button
              type="button"
              @click="showModal('medicinalProducts', 'medicinalProduct')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Путь приёма -->
      <div class="col-span-3 grid grid-cols-12 mt-2">
        <a-typography-text strong class="font-medium col-span-12">Путь приёма</a-typography-text>
        <div class="col-span-12 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.receptionPath.name !== '' ? formState.receptionPath.name : 'Спр. Путь приёма'"/>
          <button
              type="button"
              @click="showModal('receptionPath', 'receptionPath')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Дозировка -->
      <div class="col-span-3 grid grid-cols-12 mt-2">
        <a-typography-text strong class="font-medium col-span-12">Дозировка</a-typography-text>
        <div class="col-span-12 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.dialyzer.name !== '' ? formState.dialyzer.name : 'Спр. Дозы препаратов'"/>
          <button
              type="button"
              @click="showModal('dialyzer', 'dialyzer')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Номера сеансов: -->
      <div class="col-span-12 mt-2">
        <a-typography-text strong class="font-medium">Номера сеансов:</a-typography-text>
        <div class="flex items-center gap-2">
          <div
              v-for="num in 7" :key="num"
              :class="num === 4 ? 'number-active' : ''"
              class="border w-10 h-10 rounded flex justify-center items-center cursor-pointer">
            {{ num }}
          </div>
        </div>
      </div>

      <!-- Начало приёма -->
      <div class="col-span-2 mt-2">
        <a-typography-text strong class="font-medium">Начало приёма</a-typography-text>
        <a-date-picker
            placeholder="Выберите дату"
            :format="['DD/MM/YYYY', 'DD/MM/YY']" />
      </div>

      <!-- Конец приёма -->
      <div class="col-span-2 mt-2">
        <a-typography-text strong class="font-medium">Конец приёма</a-typography-text>
        <a-date-picker
            placeholder="Выберите дату"
            :format="['DD/MM/YYYY', 'DD/MM/YY']" />
      </div>


      <!-- Список назначений после сеансов -->
      <div class="col-span-12 mt-3">

        <!-- Сформировать -->
        <div class="rounded" style="width: fit-content; border: 1px solid #61b045">
          <a-button
              @click="createdSession"
              style="padding: 15px 25px 15px 25px; color: #61b045"
              type="text"
              class="flex items-center justify-around border">
            Сформировать
          </a-button>
        </div>

        <!-- Результат -->
        <div v-if="formState.createdSession" class="border p-5 flex flex-wrap gap-5 mt-4">
          <!-- Программа аппарата -->
          <div class="flex items-center gap-2">
            <FundProjectionScreenOutlined />
            <a-typography-text strong class="font-medium mb-2">Программа аппарата: {{formState.softType}}</a-typography-text>
          </div>

          <!-- Диализатор -->
          <div class="flex items-center gap-2" v-if="formState.dialyzer.name !== ''">
            <ColumnWidthOutlined />
            <a-typography-text strong class="font-medium mb-2">Диализатор: {{formState.dialyzer.name}}</a-typography-text>
          </div>

          <!-- Концентратор -->
          <div class="flex items-center gap-2" v-if="formState.concentrator.name !== ''">
            <BgColorsOutlined />
            <a-typography-text strong class="font-medium mb-2">Концентратор: {{formState.concentrator.name}}</a-typography-text>
          </div>

          <!-- Игла/Катетер -->
          <div class="flex items-center gap-2" v-if="formState.catheter.name !== '' || formState.spine.name !== ''">
            <ToolOutlined />
            <a-typography-text v-if="formState.injectionType === InjectionType.Spine" strong class="font-medium mb-2">
              Игла/Катетер:
              {{ formState.spineType.name }} - {{ formState.spine.name }}
            </a-typography-text>
            <a-typography-text v-else-if="formState.injectionType === InjectionType.Catheter" strong class="font-medium mb-2">
              Игла/Катетер:
              {{ formState.catheterType.name }} - {{ formState.catheter.name }}
            </a-typography-text>
          </div>

          <!-- Бикарбонат -->
          <div class="flex items-center gap-2" v-if="formState.bicarbonate.name !== ''">
            <ExperimentOutlined />
            <a-typography-text strong class="font-medium mb-2">Бикарбонат: {{ formState.bicarbonate.name }}</a-typography-text>
          </div>

          <!-- Антикоагуляция -->
          <div class="flex items-center gap-2" v-if="formState.anticoagulation !== ''">
            <ExperimentOutlined />
            <a-typography-text strong class="font-medium mb-2">Антикоагуляция: {{ formState.anticoagulation }}</a-typography-text>
          </div>

          <!-- Сухой Вес пациента -->
          <div class="flex items-center gap-2" v-if="formState.anticoagulationVolume > 0">
            <ExperimentOutlined />
            <a-typography-text strong class="font-medium mb-2">Сухой Вес пациента: {{ formState.anticoagulationVolume }}</a-typography-text>
          </div>

        </div>

      </div>

      <!------------------------------------- STEP 2 END ----------------------------------------->

    </a-form>

    <!-- Модальное окно -->
    <div>
      <a-modal
          :after-close="closeModal"
          v-model:open="modal.open">
        <CommonView
            @handleSelect="handleSelect"
            :modal-name="modal.tableName"/>
      </a-modal>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive} from 'vue';
import CommonView from "./CommonView.vue";
import {FundProjectionScreenOutlined, MenuUnfoldOutlined, ColumnWidthOutlined,
  BgColorsOutlined, ToolOutlined, ExperimentOutlined} from '@ant-design/icons-vue';
import {useAppointmentStore} from '../store/appointment/appointmentStore.ts'
import {InjectionType, modalType, SoftType} from "../store/appointment/appointmentTypes.ts";
import {DataItem} from "../store/common/commonTypes.ts";
// import { message } from 'ant-design-vue';
// const success = () => {
//   message.success('This is a prompt message for success, and it will disappear in 10 seconds', 10);
// };

const useAppointment = useAppointmentStore()

const { formState, setDataIttem, createdSession } = useAppointment

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

const handleSelect = (event: DataItem) => {
  console.log(event, 'select');
  setDataIttem(modal.inputField, event)

  modal.open = false;
  modal.tableName = ''
  modal.inputField = ''
}

const closeModal = () => {
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

.number-active{
  border: 1px solid #1677ff;
  color: #1677ff;
}
</style>

