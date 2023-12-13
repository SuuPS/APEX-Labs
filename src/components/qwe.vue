<script setup lang="ts">

</script>

<template>
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
</template>

<style scoped>

</style>