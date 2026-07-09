<template>
  <div class="card p-3">
    <h6 class="section-title">Distribución por Sexo</h6>
    <div class="chart-container" style="height:280px"><canvas ref="canvasRef"></canvas></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { tSexo } from './translations.js';

const props = defineProps({
  data: { type: Array, required: true }
});

const canvasRef = ref(null);
let chart = null;

function render() {
  if (chart) chart.destroy();
  if (!canvasRef.value) return;
  const ctx = canvasRef.value.getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: props.data.map(s => tSexo(s.label)), datasets: [{ data: props.data.map(s => s.total), backgroundColor: ['#0d6efd','#dc3545'] }] },
    options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}} }
  });
}

onMounted(render);
watch(() => props.data, render, { deep: true });
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
.chart-container { position: relative; width: 100%; }
</style>