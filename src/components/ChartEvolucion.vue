<template>
  <div class="card p-3">
    <h6 class="section-title">Evolución Mensual de Casos</h6>
    <div class="chart-container"><canvas ref="canvasRef"></canvas></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  data: { type: Array, required: true },
  casoFiltro: { type: String, default: 'all' }
});

const canvasRef = ref(null);
let chart = null;

function render() {
  if (chart) chart.destroy();
  if (!canvasRef.value || !props.data.length) return;
  const ctx = canvasRef.value.getContext('2d');
  const datasets = [];
  if (props.casoFiltro === 'all') {
    datasets.push({ label: 'Total', data: props.data.map(e=>e.total_casos), borderColor:'#0d6efd', backgroundColor:'rgba(13,110,253,0.1)', fill:true, tension:0.3 });
    datasets.push({ label: 'Emergencias', data: props.data.map(e=>e.emergencias), borderColor:'#dc3545', backgroundColor:'rgba(220,53,69,0.1)', fill:true, tension:0.3 });
    datasets.push({ label: 'Urgencias', data: props.data.map(e=>e.urgencias), borderColor:'#ffc107', backgroundColor:'rgba(255,193,7,0.1)', fill:true, tension:0.3 });
  } else if (props.casoFiltro === '1') {
    datasets.push({ label: 'Emergencias', data: props.data.map(e=>e.emergencias), borderColor:'#dc3545', backgroundColor:'rgba(220,53,69,0.1)', fill:true, tension:0.3 });
  } else if (props.casoFiltro === '2') {
    datasets.push({ label: 'Urgencias', data: props.data.map(e=>e.urgencias), borderColor:'#ffc107', backgroundColor:'rgba(255,193,7,0.1)', fill:true, tension:0.3 });
  }
  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: props.data.map(e => e.MES.substring(0,3) + ' ' + e.ANIO),
      datasets
    },
    options: { responsive:true, maintainAspectRatio:false, plugins:{legend:{position:'top'}} }
  });
}

onMounted(render);
watch([() => props.data, () => props.casoFiltro], render, { deep: true });
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
.chart-container { position: relative; height: 300px; width: 100%; }
</style>