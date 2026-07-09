<template>
  <div class="card p-3">
    <h6 class="section-title">Top Distritos con Mayor Incidencia</h6>
    <div class="table-responsive">
      <table id="tablaDistritos" class="table table-sm table-striped">
        <thead><tr><th>N°</th><th>Distrito</th><th>Total</th></tr></thead>
        <tbody>
          <tr v-for="(d, i) in distritosFiltrados" :key="d.distrito">
            <td>{{ i + 1 }}</td><td>{{ d.distrito }}</td><td>{{ d.total }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  distritos: { type: Array, required: true }
});

const distritosFiltrados = computed(() => props.distritos.slice(0, 20));
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
</style>