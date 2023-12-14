
<template>
  <div class="mb-10">
    <a-form
        :model="formState"
        name="validate_other"
        v-bind="formItemLayout"
        class="container border m-auto my-8 rounded p-5 grid grid-cols-12 gap-2">

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
        <a-typography-title :level="3">
          <span style="color: #4096ff">Назначения</span>
          сеанса гемодиализа</a-typography-title>
      </div>

      <!-- Программа аппарата -->
      <div class="col-span-12">
        <a-typography-text strong class="font-medium mb-2">Программа аппарата</a-typography-text>
        <a-form-item
            class="mt-1 mb-0"
            name="radio-button">
          <a-radio-group v-model:value="formState.softType" class="flex items-center gap-1">
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="SoftType.HD">HD</a-radio-button>
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="SoftType.HDF">HDF</a-radio-button>
            <a-radio-button style="width: 100px" class="flex justify-center items-center" :value="SoftType.UF">UF</a-radio-button>
          </a-radio-group>
        </a-form-item>
      </div>

      <!-- Диализатор -->
      <div class="col-span-12 grid grid-cols-12">
        <a-typography-text strong class="font-medium col-span-12">Диализатор<span style="color: red">*</span></a-typography-text>
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
          <a-typography-text class="" strong>Концентратор<span style="color: red">*</span></a-typography-text>
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
              :disabled="formState.injectionType !== InjectionType.Spine"
              class="w-full"
              placeholder="Basic usage"
              :value="formState.spineType.name !== '' ? formState.spineType.name : 'Спр. Иглы...'"/>
          <button
              :disabled="formState.injectionType !== InjectionType.Spine"
              type="button"
              @click="showModal('spineType', 'spineType')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>

        <div class="col-span-3 flex items-center gap-2">
          <a-input
              :disabled="formState.injectionType !== InjectionType.Spine"
              class="w-full"
              placeholder="Basic usage"
              :value="formState.spine.name !== '' ? formState.spine.name : 'Спр. Типы иглы...'"/>
          <button
              :disabled="formState.injectionType !== InjectionType.Spine"
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
      <div class="col-span-3 md:col-span-4 sm:col-span-6">
        <a-typography-text strong class="font-medium mb-2">Бикарбонат</a-typography-text>
        <div class="gap-2 flex items-center">
          <a-input
              class="w-full"
              placeholder="Basic usage"
              :addon-after="formState.bicarbonate.measurement"
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
      <div class="xl:col-span-2 lg:col-span-3 md:col-span-4 sm:col-span-6">
        <a-typography-text strong class="font-medium mb-2">Сухой Вес пациента</a-typography-text>
        <a-input-number
            v-model:value="formState.patientWeight"
            :addon-after="formState.bicarbonate.measurement">
        </a-input-number>
      </div>

      <!-- Антикоагуляция -->
      <div class="col-span-2 md:col-span-3 sm:col-span-6">
        <a-typography-text strong class="font-medium mb-2">Антикоагуляция</a-typography-text>
        <a-input
            placeholder="Наименование"
            v-model:value="formState.anticoagulation"/>
      </div>

      <!-- Объем -->
      <div class="col-span-2 md:col-span-3">
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
        <div class="border p-5 flex flex-wrap gap-5 mt-4">
          <div
              v-for="(item, index) in formState.createdSession" :key="index"
              class="flex items-center gap-2">
            <component :is="item.component"/>
            <a-typography-text strong class="font-medium mb-2">{{item.title}}: {{item.text}}</a-typography-text>
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
        <a-typography-text strong class="font-medium col-span-12">
          Лекарственный препарат
          <span style="color: red">*</span>
        </a-typography-text>
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
        <a-typography-text strong class="font-medium col-span-12">
          Путь приёма
          <span style="color: red">*</span>
        </a-typography-text>
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
        <a-typography-text strong class="font-medium col-span-12">Дозировка<span style="color: red">*</span></a-typography-text>
        <div class="col-span-12 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.doses.name !== '' ? formState.doses.name : 'Спр. Дозы препаратов'"/>
          <button
              type="button"
              @click="showModal('doses', 'doses')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Номера сеансов: -->
      <div class="col-span-12 mt-2">
        <a-typography-text strong class="font-medium">Номера сеансов: <span style="color: red">*</span></a-typography-text>
        <div class="flex items-center gap-2">
          <div
              v-for="num in 7" :key="num"
              @click="changeSessionCount(num)"
              :class="checkSessionCount(num) ? 'number-active' : ''"
              class="border w-10 h-10 rounded flex justify-center items-center cursor-pointer">
            {{ num }}
          </div>
        </div>
      </div>

      <!-- Начало приёма -->
      <div class="col-span-2 mt-2">
        <a-typography-text strong class="font-medium">Начало приёма</a-typography-text>
        <a-date-picker
            v-model:value="formState.sessionDateStart"
            placeholder="Выберите дату"
            :format="['DD/MM/YYYY']" />
      </div>

      <!-- Конец приёма -->
      <div class="col-span-2 mt-2">
        <a-typography-text strong class="font-medium">Конец приёма</a-typography-text>
        <a-date-picker
            v-model:value="formState.sessionDateEnd"
            placeholder="Выберите дату"
            :format="['DD/MM/YYYY', 'DD/MM/YY']" />
      </div>

      <!-- Список назначений после сеансов -->
      <div class="col-span-12 mt-3">
        <!-- Результат -->
        <AppointmentsFfterSessionTable/>
      </div>
      <!------------------------------------- STEP 2 END ----------------------------------------->

      <!------------------------------------- STEP 3 START ----------------------------------------->
      <!-- Назначения после сеанса -->
      <div class="col-span-12 border-t pt-5">
        <a-typography-title :level="3">Лечение на дому</a-typography-title>
      </div>

      <!-- Лекарственный препарат -->
      <div class="col-span-12 grid grid-cols-12">
        <a-typography-text strong class="font-medium col-span-12">
          Лекарственный препарат
          <span style="color: red">*</span>
        </a-typography-text>
        <div class="col-span-6 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.TreatmentMedicinalProduct.name !== '' ? formState.TreatmentMedicinalProduct.name : 'Спр. препараты'"/>
          <button
              type="button"
              @click="showModal('medicinalProducts', 'TreatmentMedicinalProduct')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Путь приёма -->
      <div class="col-span-3 grid grid-cols-12 mt-2">
        <a-typography-text strong class="font-medium col-span-12">
          Путь приёма
          <span style="color: red">*</span>
        </a-typography-text>
        <div class="col-span-12 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.TreatmentReceptionPath.name !== '' ? formState.TreatmentReceptionPath.name : 'Спр. Путь приёма'"/>
          <button
              type="button"
              @click="showModal('receptionPath', 'TreatmentReceptionPath')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Дозировка -->
      <div class="col-span-3 grid grid-cols-12 mt-2">
        <a-typography-text strong class="font-medium col-span-12">Дозировка<span style="color: red">*</span></a-typography-text>
        <div class="col-span-12 flex items-center gap-2">
          <a-input placeholder="Basic usage" :value="formState.TreatmentDoses.name !== '' ? formState.TreatmentDoses.name : 'Спр. Дозы препаратов'"/>
          <button
              type="button"
              @click="showModal('doses', 'TreatmentDoses')"
              class="border flex justify-center items-center w-10 h-full rounded">
            <MenuUnfoldOutlined/>
          </button>
        </div>
      </div>

      <!-- Кратность прием -->
      <div class="col-span-12 grid grid-cols-12 gap-3">
        <!-- Кратность приема -->
        <div class="col-span-3 grid grid-cols-12 mt-2">
          <a-typography-text strong class="font-medium col-span-12">Кратность приема<span style="color: red">*</span></a-typography-text>
          <div class="col-span-12 flex items-center gap-2">
            <a-input placeholder="Basic usage" :value="formState.TreatmentReceptionCount.name !== '' ? formState.TreatmentReceptionCount.name : 'Спр. Кратность приема'"/>
            <button
                type="button"
                @click="showModal('frequencyAdmission', 'TreatmentReceptionCount')"
                class="border flex justify-center items-center w-10 h-full rounded">
              <MenuUnfoldOutlined/>
            </button>
          </div>
        </div>

        <!-- Начало приёма -->
        <div class="col-span-2 mt-2">
          <a-typography-text strong class="font-medium">Начало приёма</a-typography-text>
          <a-date-picker
              v-model:value="formState.TreatmentSessionDateStart"
              placeholder="Выберите дату"
              :format="['DD/MM/YYYY']" />
        </div>

        <!-- Конец приёма -->
        <div class="col-span-2 mt-2">
          <a-typography-text strong class="font-medium">Конец приёма</a-typography-text>
          <a-date-picker
              v-model:value="formState.TreatmentSessionDateEnd"
              placeholder="Выберите дату"
              :format="['DD/MM/YYYY', 'DD/MM/YY']" />
        </div>
      </div>

      <!-- Список назначений после сеансов -->
      <div class="col-span-12 mt-3">
        <!-- Добавить -->
        <div class="rounded mb-3 border" style="width: fit-content">
          <a-button
              @click="treatmentReportSave"
              style="padding: 15px 25px 15px 25px"
              type="text"
              class="flex items-center justify-around border">
            Добавить
          </a-button>
        </div>

        <!-- Результат -->
        <div class="border p-5 flex flex-wrap gap-5 mt-4">
          <div class="w-full border-b pb-2" v-for="(report, index) in formState.TreatmentReport" :key="index">
            {{ report }}
          </div>
        </div>
      </div>
      <!------------------------------------- STEP 3 END ----------------------------------------->


      <!------------------------------------- STEP 4 START ----------------------------------------->
      <!-- Рекомендации -->
      <div class="col-span-12 border-t pt-5">
        <a-typography-title :level="3">Рекомендации</a-typography-title>
      </div>

      <!-- Текст рекомендации пациенту -->
      <div class="col-span-7">
        <div class="w-full flex items-center gap-2">
          <a-input
              placeholder="Текст рекомендации пациенту..."
              v-model:value="formState.recommendationValue"/>
          <!-- Добавить -->
          <div class="rounded border" style="width: fit-content">
            <a-button
                @click="newRecomendation"
                style="padding: 15px 25px 15px 25px"
                type="text"
                class="flex items-center justify-around border">
              <PlusCircleOutlined/>
            </a-button>
          </div>
        </div>
      </div>

      <!-- Рекомендации пациенту -->
      <div class="col-span-7 mt-3">
        <!-- Результат -->
        <div class="border p-5 flex flex-wrap gap-5 mt-4">
          <div class="w-full pb-2" v-for="(recommendation, index) in formState.recommendations" :key="index">
            {{ recommendation }}
          </div>
          <a-typography-text v-if="formState.recommendations.length === 0" strong class="font-medium">Рекомендаций нет</a-typography-text>
        </div>
      </div>

      <!-- Данные о назначении -->
      <div class="col-span-7 flex items-center gap-5 mt-3">
        <div class="flex items-center gap-1">
          <CalendarOutlined />
          {{ formState.dateAppointment.format('DD:MM:YYYY') }}
        </div>
        <div class="flex items-center gap-1">
          <UserOutlined/>
          {{ `${formState.doctor.surname} ${formState.doctor.name} ${formState.doctor.patronymic} : ${formState.doctor.role}` }}
        </div>
      </div>

      <div class="rounded col-span-12 my-5" style="width: fit-content; border: 1px solid #4096ff">
        <a-button
            @click="save"
            style="padding: 15px 25px 15px 25px; color: #4096ff"
            type="text"
            class="flex items-center justify-around border">
          Сохранить назначение
        </a-button>
      </div>

      <!------------------------------------- STEP 4 END ----------------------------------------->
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
import CommonView from "../CommonView.vue";
import {MenuUnfoldOutlined, PlusCircleOutlined, UserOutlined, CalendarOutlined} from '@ant-design/icons-vue';
import {useAppointmentStore} from '../../store/appointment/appointmentStore.ts'
import {InjectionType, modalType, SoftType} from "../../store/appointment/appointmentTypes.ts";
import {DataItem} from "../../store/common/commonTypes.ts";
import AppointmentsFfterSessionTable from "./AppointmentsFfterSessionTable.vue";

const useAppointment = useAppointmentStore()

const { formState, setDataIttem, createdSession, changeSessionCount,
  checkSessionCount, treatmentReportSave, newRecomendation, save} = useAppointment

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

