<template>
  <div v-if="raw" class="container-fluid px-4">
    <KpiCards :kpis="kpis" />

    <FilterBar
      ref="filterBar"
      :deptos="deptosList"
      :grupos="gruposList"
      :anios="aniosList"
      @update="onFilterUpdate"
    />

    <div class="row g-3 mb-4">
      <div class="col-lg-8">
        <ChartEvolucion :data="evolucionFiltrada" :casoFiltro="filters.caso" />
      </div>
      <div class="col-lg-4">
        <ChartGrupoEtario
          :grupos="gruposData"
          :mostrarEmerg="mostrarEmerg"
          :mostrarUrgen="mostrarUrgen"
        />
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-lg-4">
        <ChartSexo :data="sexoData" />
      </div>
      <div class="col-lg-8">
        <MapaPeru :data="raw.mapa_depto" :casoFiltro="filters.caso" :deptoFiltro="filters.depto" />
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-md-4">
        <ChartAcciones :data="raw.acciones" />
      </div>
      <div class="col-md-4">
        <ChartEspecialidades :data="raw.especialidades" />
      </div>
      <div class="col-md-4">
        <ChartSeguros :data="raw.seguros" />
      </div>
    </div>

    <div class="row g-3 mb-4">
      <div class="col-lg-6">
        <ChartRiesgo :data="riesgoData" />
      </div>
      <div class="col-lg-6">
        <TablaDistritos :distritos="raw.distritos" />
      </div>
    </div>

    <div class="row g-3 mb-5">
      <div class="col-12">
        <AnalisisMetodologia
          :total="kpis.total.toLocaleString()"
          :benefUnicos="raw.kpis.benef_unicos.toLocaleString()"
        />
      </div>
    </div>
  </div>
  <div v-else class="text-center py-5 text-muted">
    <div class="spinner-border text-primary mb-3" role="status"></div>
    <p>Cargando dashboard...</p>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue';
import KpiCards from './KpiCards.vue';
import FilterBar from './FilterBar.vue';
import ChartEvolucion from './ChartEvolucion.vue';
import ChartGrupoEtario from './ChartGrupoEtario.vue';
import ChartSexo from './ChartSexo.vue';
import MapaPeru from './MapaPeru.vue';
import ChartAcciones from './ChartAcciones.vue';
import ChartEspecialidades from './ChartEspecialidades.vue';
import ChartSeguros from './ChartSeguros.vue';
import ChartRiesgo from './ChartRiesgo.vue';
import TablaDistritos from './TablaDistritos.vue';
import AnalisisMetodologia from './AnalisisMetodologia.vue';

const raw = ref(null);
const filters = reactive({ depto: 'all', caso: 'all', grupo: 'all', anio: 'all' });

const deptosList = ref([]);
const gruposList = ref([]);
const aniosList = ref([]);

onMounted(() => {
  const d = window.DASHBOARD_DATA;
  if (!d) {
    console.error('DASHBOARD_DATA no disponible. Verifique que data.js se cargó correctamente.');
    return;
  }
  raw.value = d;
  deptosList.value = [...new Set(d.mapa_depto.map(x => x.DEP_RES))].sort();
  gruposList.value = d.grupo_etario.filter(g => g.GRU_ET_DESC).map(g => g.GRU_ET_DESC);
  aniosList.value = [...new Set(d.evolucion.map(e => e.ANIO))].sort();
});

const kpis = computed(() => {
  if (!raw.value) return { total: 0, emergencias: 0, urgencias: 0, activos: 0, sinClasif: 0, pctEmerg: '0.0', pctUrg: '0.0' };
  let evol = raw.value.evolucion;
  if (filters.anio !== 'all') evol = evol.filter(e => e.ANIO === parseInt(filters.anio));
  const totalEvol = evol.reduce((s, e) => s + e.total_casos, 0);
  const emg = evol.reduce((s, e) => s + e.emergencias, 0);
  const urg = evol.reduce((s, e) => s + e.urgencias, 0);
  const showEmerg = filters.caso === '1';
  const showUrg = filters.caso === '2';
  const total = showEmerg ? emg : showUrg ? urg : totalEvol;
  const emgDisplay = showUrg ? 0 : emg;
  const urgDisplay = showEmerg ? 0 : urg;
  return {
    total, emergencias: emgDisplay, urgencias: urgDisplay,
    activos: raw.value.kpis.activos,
    sinClasif: raw.value.kpis.sin_clasificar || 0,
    pctEmerg: total > 0 ? (emgDisplay / total * 100).toFixed(1) : '0.0',
    pctUrg: total > 0 ? (urgDisplay / total * 100).toFixed(1) : '0.0'
  };
});

const evolucionFiltrada = computed(() => {
  if (!raw.value) return [];
  let evol = raw.value.evolucion;
  if (filters.anio !== 'all') evol = evol.filter(e => e.ANIO === parseInt(filters.anio));
  return evol;
});

const gruposData = computed(() => {
  if (!raw.value) return [];
  let ge = raw.value.grupo_etario.filter(g => g.GRU_ET_DESC);
  if (filters.grupo !== 'all') ge = ge.filter(g => g.GRU_ET_DESC === filters.grupo);
  return ge;
});

const mostrarEmerg = computed(() => filters.caso === 'all' || filters.caso === '1');
const mostrarUrgen = computed(() => filters.caso === 'all' || filters.caso === '2');

const sexoData = computed(() => {
  if (!raw.value) return [];
  const rawKpi = raw.value.kpis;
  if (filters.caso === '1') {
    const factor = rawKpi.total > 0 ? rawKpi.emergencias / rawKpi.total : 0;
    return raw.value.sexo.map(s => ({ label: s.SEXO_USU_DESC, total: Math.round(s.total * factor) }));
  }
  if (filters.caso === '2') {
    const factor = rawKpi.total > 0 ? rawKpi.urgencias / rawKpi.total : 0;
    return raw.value.sexo.map(s => ({ label: s.SEXO_USU_DESC, total: Math.round(s.total * factor) }));
  }
  return raw.value.sexo.map(s => ({ label: s.SEXO_USU_DESC, total: s.total }));
});

const riesgoData = computed(() => {
  if (!raw.value) return [];
  let rd = raw.value.riesgo_transicion;
  if (filters.grupo !== 'all') rd = rd.filter(r => r.GRU_ET_DESC === filters.grupo);
  return rd;
});

function onFilterUpdate(newFilters) {
  Object.assign(filters, newFilters);
}
</script>