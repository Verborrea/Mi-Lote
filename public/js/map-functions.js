function exp(zona) {
	return ['==', ['get', 'z'], zona];
}

const coloresPorZona = [
  'case',
  exp('I1R'), '#F7B801',
  exp('RDB'), '#F7B801',
  exp('RDM-1'), '#F18701',
  exp('RDM-2'), '#F18701',
  exp('RDA-1'), '#F35B04',
  exp('RDA-2'), '#F35B04',
  exp('CE'), '#f30431',
  exp('CV'), '#f30431',
  exp('CS'), '#f30431',
  exp('CZ'), '#f30431',
  exp('CIn'), '#f30431',
  exp('CM'), '#f30431',
  exp('I1'), '#7678ED',
  exp('I2'), '#7678ED',
  exp('I3'), '#7678ED',
  exp('I4'), '#7678ED',
  exp('E1'), '#1178cf',
  exp('E2'), '#1178cf',
  exp('E3'), '#1178cf',
  exp('H1'), '#76ede7',
  exp('H2'), '#76ede7',
  exp('H3'), '#76ede7',
  exp('H4'), '#76ede7',
  exp('OU1'), '#f4caf1',
  exp('OU2'), '#f4caf1',
  exp('ZR'), '#f4caf1',
  exp('ZRE-CH'), '#a3a3a3',
  exp('ZM'), '#6d3d14',
  exp('ZAQ'), '#6d3d14',
  exp('RP'), '#2ec660',
  exp('ZA'), '#2ec660',
  exp('EA'), '#2ec660',
  '#ff2af1'
];

const iconColors = [
  'Default', '#e32f2f','casa.svg',
  'Residencial','#ffac00','casa.svg',
  'Comercial','#e32f2f','tienda.svg',
  'Industrial','#2f8de3','fabrica.svg',
  'Recreación','#80de81','parque.svg',
  'Educación','#2f8de3','parque.svg',
  'Salud','#2f8de3','parque.svg',
]

function getIconData(zona) {
  color = iconColors[iconColors.indexOf(zona) + 1];
  image = iconColors[iconColors.indexOf(zona) + 2];
  return {color : color, image : image};
}