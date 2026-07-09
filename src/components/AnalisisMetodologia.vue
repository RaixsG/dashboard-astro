<template>
  <div class="card p-4">
    <h5 class="section-title mb-3">Análisis y Metodología del Dashboard</h5>
    <div class="row g-4">
      <div class="col-md-6">
        <h6 class="fw-bold text-primary">📊 Datos y Procedencia</h6>
        <p class="small text-muted mb-1">
          Este dashboard utiliza datos abiertos del servicio <strong>"INABIF en Acción"</strong> del
          Programa Integral Nacional para el Bienestar Familiar (INABIF), publicados en la
          <a href="https://datosabiertos.gob.pe" target="_blank">Plataforma Nacional de Datos Abiertos</a>
          del Ministerio de la Mujer y Poblaciones Vulnerables (MIMP).
        </p>
        <ul class="small text-muted">
          <li><strong>Período analizado:</strong> Enero 2025 - Marzo 2026 (15 meses)</li>
          <li><strong>Total de registros:</strong> {{ total }}</li>
          <li><strong>Beneficiarios únicos:</strong> {{ benefUnicos }}</li>
          <li><strong>Actualización:</strong> Mensual · Licencia: Open Data Commons</li>
        </ul>

        <h6 class="fw-bold text-primary mt-3">Variables Clave</h6>
        <p class="small text-muted">
          El análisis se centra en <strong>CASO_CLASIF</strong> (Emergencia vs Urgencia) como variable
          dependiente. Las variables independientes incluyen <strong>GRU_ET</strong> (grupo etario),
          <strong>SEXO_USU</strong>, <strong>DEP_RES</strong> (ubicación geográfica),
          <strong>ACC_AT</strong> (acciones tomadas) y <strong>ESP_ATE</strong> (especialidad).
        </p>
      </div>

      <div class="col-md-6">
        <h6 class="fw-bold text-primary">Indicador de Riesgo de Transición</h6>
        <p class="small text-muted">
          El gráfico <strong>"Riesgo de Transición Urgencia → Emergencia"</strong> muestra el
          porcentaje de casos clasificados como Emergencia dentro de cada grupo etario.
          Un valor alto indica que en ese grupo, una mayor proporción de atenciones requirió
          respuesta inmediata, lo que sugiere mayor vulnerabilidad.
        </p>
        <p class="small text-muted">
          Actualmente INABIF no realiza este cálculo de forma sistemática. Este indicador
          permite a los tomadores de decisiones priorizar recursos y personal especializado
          hacia los segmentos poblacionales de mayor riesgo.
        </p>

        <h6 class="fw-bold text-primary mt-3">Interpretación del Mapa</h6>
        <p class="small text-muted">
          El <strong>tamaño de las burbujas</strong> representa el volumen de casos por departamento.
          El <strong>color</strong> indica la intensidad relativa:
          <span class="badge bg-success">baja</span>
          <span class="badge bg-warning text-dark">media</span>
          <span class="badge bg-danger">alta</span>.
          Lima concentra el 77% de los casos, reflejando la centralización de los servicios sociales.
        </p>
      </div>
    </div>

    <hr class="my-3">

    <div class="row g-4">
      <div class="col-md-4 text-center">
        <div class="fw-bold text-primary">Procesamiento ETL</div>
        <small class="text-muted">Pipeline en Python (pandas) que unifica, limpia y estandariza 15 archivos CSV mensuales. Se corrigieron inconsistencias de formato, nombres de columnas y tipos de datos.</small>
      </div>
      <div class="col-md-4 text-center">
        <div class="fw-bold text-primary">Modelo de Datos</div>
        <small class="text-muted">Esquema estrella con tabla de hechos (atenciones) y dimensiones (beneficiario, tiempo, clasificación, estado). Alineado con ISO 8000.</small>
      </div>
      <div class="col-md-4 text-center">
        <div class="fw-bold text-primary">Arquitectura</div>
        <small class="text-muted">Astro 7 genera HTML estático. Los datos se sirven como JSON desde <code>/data.js</code>. Sin backend, desplegable en Netlify/Vercel/GitHub Pages.</small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  total: { type: String, default: '8,005' },
  benefUnicos: { type: String, default: '3,473' }
});
</script>

<style scoped>
.section-title { font-weight: 700; color: #212529; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #0d6efd; }
</style>