<template>
  <div class="card p-3">
    <h6 class="section-title">Mapa de Calor por Departamento</h6>
    <div ref="mapRef" id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { COORDS } from './data.js';

const props = defineProps({
  data: { type: Array, required: true },
  casoFiltro: { type: String, default: 'all' }
});

const mapRef = ref(null);
let map = null;

function render() {
  if (map) { map.remove(); map = null; }
  if (!mapRef.value) return;

  map = L.map(mapRef.value).setView([-9.2, -74.5], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:18, attribution:'OSM' }).addTo(map);

  let deptoData = [...props.data];
  let maxV = Math.max(...deptoData.map(d => d.total), 1);

  if (props.casoFiltro !== 'all') {
    const campo = props.casoFiltro === '1' ? 'emergencias' : 'urgencias';
    deptoData = deptoData.map(d => ({ ...d, total: d[campo] }));
    maxV = Math.max(...deptoData.map(d => d.total), 1);
  }

  deptoData.forEach(d => {
    const c = COORDS[d.DEP_RES];
    if (!c) return;
    const ratio = d.total / maxV;
    const color = ratio > 0.5 ? '#dc3545' : ratio > 0.25 ? '#fd7e14' : ratio > 0.1 ? '#ffc107' : '#198754';
    const radius = Math.max(8, Math.min(30, d.total / maxV * 30));
    L.circleMarker(c, { radius, color, fillColor:color, fillOpacity:0.7, weight:2 })
      .bindPopup(`<b>${d.DEP_RES}</b><br>Total: ${d.total}<br>Emergencias: ${d.emergencias}<br>Urgencias: ${d.urgencias}`)
      .addTo(map);
  });
}

onMounted(render);
watch([() => props.data, () => props.casoFiltro], render, { deep: true });
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
#map { height: 400px; border-radius: 12px; }
</style>