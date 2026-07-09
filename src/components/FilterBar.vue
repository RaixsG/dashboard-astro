<template>
  <div class="filter-section mb-4">
    <div class="row g-3 align-items-end">
      <div class="col-md-3">
        <label>Departamento</label>
        <select v-model="local.depto" class="form-select form-select-sm" @change="emitFilter">
          <option value="all">Todos</option>
          <option v-for="d in deptos" :key="d" :value="d">{{ d }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label>Tipo de Caso</label>
        <select v-model="local.caso" class="form-select form-select-sm" @change="emitFilter">
          <option value="all">Todos</option>
          <option value="1">Emergencia</option>
          <option value="2">Urgencia</option>
        </select>
      </div>
      <div class="col-md-3">
        <label>Grupo Etario</label>
        <select v-model="local.grupo" class="form-select form-select-sm" @change="emitFilter">
          <option value="all">Todos</option>
          <option v-for="g in grupos" :key="g" :value="g">{{ tGrupo(g) }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <label>Período</label>
        <select v-model="local.anio" class="form-select form-select-sm" @change="emitFilter">
          <option value="all">Todos</option>
          <option v-for="a in anios" :key="a" :value="a">{{ a }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { tGrupo } from './translations.js';

const props = defineProps({
  deptos: { type: Array, default: () => [] },
  grupos: { type: Array, default: () => [] },
  anios: { type: Array, default: () => [] }
});

const emit = defineEmits(['update']);

const local = reactive({ depto: 'all', caso: 'all', grupo: 'all', anio: 'all' });

function emitFilter() {
  emit('update', { ...local });
}

function reset() {
  local.depto = 'all';
  local.caso = 'all';
  local.grupo = 'all';
  local.anio = 'all';
  emitFilter();
}

defineExpose({ reset });
</script>

<style scoped>
.filter-section { background: white; border-radius: 12px; padding: 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.filter-section label { font-weight: 600; font-size: 0.85rem; color: #495057; }
</style>