<template>
  <div class="row g-3 mb-4">
    <div class="col-md-3 col-6">
      <div class="card card-benef p-3">
        <div class="card-title">Total Atenciones</div>
        <div class="card-value">{{ kpis.total.toLocaleString() }}</div>
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="card card-emergencia p-3">
        <div class="card-title">Emergencias</div>
        <div class="card-value text-danger">{{ kpis.emergencias.toLocaleString() }}</div>
        <div class="trend text-danger">{{ kpis.pctEmerg }}% del total</div>
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="card card-urgencia p-3">
        <div class="card-title">Urgencias</div>
        <div class="card-value text-warning">{{ kpis.urgencias.toLocaleString() }}</div>
        <div class="trend text-warning">{{ kpis.pctUrg }}% del total</div>
      </div>
    </div>
    <div class="col-md-3 col-6">
      <div class="card card-activo p-3">
        <div class="card-title">Casos Activos</div>
        <div class="card-value text-success">{{ kpis.activos.toLocaleString() }}</div>
        <div class="trend text-muted">{{ kpis.sinClasif }} sin clasificar</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  kpis: { type: Object, required: true }
});
</script>

<style scoped>
.card { border: none; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); transition: transform 0.2s; }
.card:hover { transform: translateY(-2px); }
.card-title { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.5px; color: #6c757d; }
.card-value { font-size: 2rem; font-weight: 700; color: #212529; }
.card .trend { font-size: 0.85rem; }
.card-emergencia { border-left: 4px solid #dc3545; }
.card-urgencia { border-left: 4px solid #ffc107; }
.card-activo { border-left: 4px solid #198754; }
.card-benef { border-left: 4px solid #0d6efd; }
</style>