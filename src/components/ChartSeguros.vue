<template>
  <div class="card p-3">
    <h6 class="section-title">Tipo de Seguro (2026)</h6>
    <div class="chart-container"><canvas ref="canvasRef"></canvas></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  data: { type: Array, required: true }
});

const canvasRef = ref(null);

onMounted(() => {
  if (!canvasRef.value) return;
  new Chart(canvasRef.value.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: props.data.map(s => s.TIP_SEG_SAL_DESC),
      datasets: [{ data: props.data.map(s => s.total), backgroundColor: ['#0d6efd','#198754','#ffc107','#dc3545','#6f42c1','#fd7e14'] }]
    },
    options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'bottom'}} }
  });
});
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
.chart-container { position: relative; height: 300px; width: 100%; }
</style>