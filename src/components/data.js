// Datos compartidos: se carga desde /data.js que genera Python
// window.DASHBOARD_DATA está disponible globalmente

export function getData() {
  return window.DASHBOARD_DATA;
}

export const COORDS = {
  'AMAZONAS': [-5.3,-78.5],'ANCASH':[-9.3,-77.5],'APURIMAC':[-14.0,-73.0],
  'AREQUIPA':[-16.4,-71.5],'AYACUCHO':[-13.2,-74.2],'CAJAMARCA':[-7.2,-78.5],
  'CALLAO':[-12.0,-77.1],'CUSCO':[-13.5,-72.0],'HUANCAVELICA':[-13.0,-75.0],
  'HUANUCO':[-9.9,-76.2],'ICA':[-14.0,-75.7],'JUNIN':[-11.5,-75.0],
  'LA LIBERTAD':[-8.0,-78.5],'LAMBAYEQUE':[-6.5,-79.8],'LIMA':[-12.0,-77.0],
  'LORETO':[-4.0,-75.0],'MADRE DE DIOS':[-12.0,-70.0],'MOQUEGUA':[-17.0,-71.0],
  'PASCO':[-10.5,-75.5],'PIURA':[-5.0,-80.5],'PUNO':[-15.5,-70.0],
  'SAN MARTIN':[-7.0,-76.5],'TACNA':[-18.0,-70.5],'TUMBES':[-3.5,-80.5],
  'UCAYALI':[-8.5,-75.0]
};