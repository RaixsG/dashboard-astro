<template>
  <div class="card p-3">
    <h6 class="section-title">Riesgo de Transición Urgencia → Emergencia</h6>
    <div class="chart-container"><canvas ref="canvasRef"></canvas></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { tGrupo } from './translations.js';

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
    type: 'bar',
    data: {
      labels: props.data.map(r => tGrupo(r.GRU_ET_DESC)),
      datasets: [{
        label:'% Emergencia sobre total',
        data: props.data.map(r => r.pct_emergencia),
        backgroundColor: props.data.map(r => r.pct_emergencia > 50 ? '#dc3545' : r.pct_emergencia > 20 ? '#ffc107' : '#198754')
      }]
    },
    options: { responsive:true, maintainAspectRatio:false, scales: { y: { beginAtZero:true, max:100, ticks:{callback:v=>v+'%'} } }, plugins:{legend:{display:false}} }
  });
}

onMounted(render);
watch(() => props.data, render, { deep: true });
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
.chart-container { position: relative; height: 300px; width: 100%; }
</style>