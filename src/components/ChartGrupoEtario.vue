<template>
  <div class="card p-3">
    <h6 class="section-title">Distribución por Grupo Etario</h6>
    <div class="chart-container"><canvas ref="canvasRef"></canvas></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { tGrupo } from './translations.js';

const props = defineProps({
  grupos: { type: Array, required: true },
  mostrarEmerg: { type: Boolean, default: true },
  mostrarUrgen: { type: Boolean, default: true }
});

const canvasRef = ref(null);
let chart = null;

function render() {
  if (chart) chart.destroy();
  if (!canvasRef.value) return;
  const ge = props.grupos;
  const ds = [];
  if (props.mostrarEmerg) ds.push({ label: 'Emergencias', data: ge.map(g => g.emergencias), backgroundColor: '#dc3545' });
  if (props.mostrarUrgen) ds.push({ label: 'Urgencias', data: ge.map(g => g.urgencias), backgroundColor: '#ffc107' });
  const ctx = canvasRef.value.getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: { labels: ge.map(g => tGrupo(g.GRU_ET_DESC)), datasets: ds },
    options: { responsive:true, maintainAspectRatio:false, scales: { x: { stacked: true }, y: { stacked: true } } }
  });
}

onMounted(render);
watch([() => props.grupos, () => props.mostrarEmerg, () => props.mostrarUrgen], render, { deep: true });
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
.chart-container { position: relative; height: 300px; width: 100%; }
</style>