function displayLayer(mapa, capa) {
  if (!mapa.hasLayer(capa)) {
    mapa.addLayer(capa);
  }
}


function hideLayer(mapa, capa) {
  if (mapa.hasLayer(capa)) {
    mapa.removeLayer(capa);
  }
}


function colorPorZona(feature) {
  switch (feature.properties.z) {
    case 'I1R': return {color: "#F7B801"};
    case 'RDB': return {color: "#F7B801"};
    case 'RDM-1': return {color: "#F18701"};
    case 'RDM-2': return {color: "#F18701"};
    case 'RDA-1': return {color: "#F35B04"};
    case 'RDA-2': return {color: "#F35B04"};
    case 'CE': return {color: "#f30431"};
    case 'CV': return {color: "#f30431"};
    case 'CS': return {color: "#f30431"};
    case 'CZ': return {color: "#f30431"};
    case 'CIn': return {color: "#f30431"};
    case 'CM': return {color: "#f30431"};
    case 'I1': return {color: "#7678ED"};
    case 'I2': return {color: "#7678ED"};
    case 'I3': return {color: "#7678ED"};
    case 'I4': return {color: "#7678ED"};
    case 'E1': return {color: "#1178cf"};
    case 'E2': return {color: "#1178cf"};
    case 'E3': return {color: "#1178cf"};
    case 'H1': return {color: "#76ede7"};
    case 'H2': return {color: "#76ede7"};
    case 'H3': return {color: "#76ede7"};
    case 'H4': return {color: "#76ede7"};
    case 'OU1': return {color: "#f4caf1"};
    case 'OU2': return {color: "#f4caf1"};
    case 'ZR': return {color: "#f4caf1"};
    case 'ZRE-CH': return {color: "#a3a3a3"};
    case 'ZM': return {color: "#6d3d14"};
    case 'ZAQ': return {color: "#6d3d14"};
    case 'RP': return {color: "#2ec660"};
    case 'ZA': return {color: "#2ec660"};
    case 'EA': return {color: "#2ec660"};
    default: return {color: "#ff2af1"};
  }
}