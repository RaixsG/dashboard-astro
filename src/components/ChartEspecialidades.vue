<template>
  <div class="card p-3">
    <h6 class="section-title">Especialidades (2026)</h6>
    <div class="chart-container"><canvas ref="canvasRef"></canvas></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { tEspecialidad } from './translations.js';

const props = defineProps({
  data: { type: Array, required: true }
});

const canvasRef = ref(null);

onMounted(() => {
  if (!canvasRef.value) return;
  new Chart(canvasRef.value.getContext('2d'), {
    type: 'pie',
    data: {
      labels: props.data.map(e => tEspecialidad(e.ESP_ATE_DESC)),
      datasets: [{ data: props.data.map(e => e.total), backgroundColor: ['#0d6efd','#dc3545','#198754'] }]
    },
    options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}} }
  });
});
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
.chart-container { position: relative; height: 300px; width: 100%; }
</style>