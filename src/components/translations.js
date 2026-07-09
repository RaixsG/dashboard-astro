// Traducciones de datos en ingles a español para visualizacion en el dashboard
export const GRU_ET = {
  '0-11 months': '0 \u2013 11 meses',
  '1-5 years': '1 \u2013 5 a\u00f1os',
  '6-11 years': '6 \u2013 11 a\u00f1os',
  '12-17 years': '12 \u2013 17 a\u00f1os',
  '18-25 years': '18 \u2013 25 a\u00f1os',
  '26-59 years': '26 \u2013 59 a\u00f1os',
  '60+ years': '60 a m\u00e1s a\u00f1os'
};

export const SEXO = {
  'Male': 'Hombre',
  'Female': 'Mujer'
};

export const CASO = {
  'Emergency': 'Emergencia',
  'Urgency': 'Urgencia'
};

export const ESTADO = {
  'Active': 'Activo',
  'Inactive': 'Inactivo'
};

export const SEGURO = {
  'SIS': 'SIS',
  'ESSALUD': 'ESSALUD',
  'Private': 'Privado',
  'Armed Forces/Police': 'Fuerzas Armadas/Policiales',
  'Uninsured': 'No afiliado',
  'Other': 'Otro',
  'N/A': 'S/D'
};

export const ESPECIALIDAD = {
  'Legal': 'Legal',
  'Psychological': 'Psicol\u00f3gico',
  'Social': 'Social'
};

export const ACCION = {
  'Network articulation': 'Articulaci\u00f3n con redes',
  'Social care': 'Atenci\u00f3n social',
  'Management/coordination': 'Gesti\u00f3n y/o coordinaci\u00f3n',
  'Crisis intervention': 'Intervenci\u00f3n en crisis',
  'Family guidance': 'Orientaci\u00f3n familiar',
  'Legal guidance': 'Orientaci\u00f3n legal',
  'Social guidance': 'Orientaci\u00f3n social',
  'Counseling': 'Orientaci\u00f3n y/o consejer\u00eda',
  'Psychological first aid': 'Primeros auxilios psicol\u00f3gicos',
  'Emotional support': 'Soporte emocional',
  'Home visit': 'Visita domiciliaria',
  'Institutional visit': 'Visita institucional'
};

export function tGrupo(desc) {
  return GRU_ET[desc] || desc;
}

export function tSexo(desc) {
  return SEXO[desc] || desc;
}

export function tCaso(desc) {
  return CASO[desc] || desc;
}

export function tSeguro(desc) {
  return SEGURO[desc] || desc;
}

export function tEspecialidad(desc) {
  return ESPECIALIDAD[desc] || desc;
}

export function tAccion(desc) {
  return ACCION[desc] || desc;
}
