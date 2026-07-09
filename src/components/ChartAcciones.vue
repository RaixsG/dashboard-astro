<template>
  <div class="card p-3">
    <h6 class="section-title">Acciones de Atención (2026)</h6>
    <div class="chart-container"><canvas ref="canvasRef"></canvas></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { tAccion } from './translations.js';

const props = defineProps({
  data: { type: Array, required: true }
});

const canvasRef = ref(null);

onMounted(() => {
  if (!canvasRef.value) return;
  new Chart(canvasRef.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: props.data.map(a => tAccion(a.ACC_AT_DESC).substring(0,25)),
      datasets: [{ label:'Casos', data: props.data.map(a => a.total), backgroundColor: '#0d6efd' }]
    },
    options: { responsive:true, maintainAspectRatio:false, indexAxis:'y', plugins:{legend:{display:false}} }
  });
});
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
.chart-container { position: relative; height: 300px; width: 100%; }
</style>