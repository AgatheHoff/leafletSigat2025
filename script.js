// Initialiser la carte
var map = L.map('map', {
  center: [48.11, -1.64],
  zoom: 15,
  attributionControl: true
});

//Appel du fond de carte
//L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(map);

// Ajouter des fonds de carte
var baselayers = {
  Positron: L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map),
  OSM: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {opacity:0.5}),
  ESRI: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'),
  //WMS
  OrthoRM: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',{layers: 'raster:ortho2021'}),
  PlanRM: L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',{layers: 'ref_fonds:pvci_simple_gris'})
};

var Cadastre = L.tileLayer.wms('http://geobretagne.fr/geoserver/cadastre/wms',
  {layers: 'CP.CadastralParcel',format: 'image/png',transparent: true, opacity:0.5});

var Bati = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
  {layers: 'ref_cad:batiment',format: 'image/png',transparent: true});

var Velo = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
  {layers: 'trp_doux:v_voirie_amenagement_velo',format: 'image/png',transparent: true});

var Trafic = L.tileLayer.wms('https://public.sig.rennesmetropole.fr/geoserver/ows?',
  {layers: 'trp_rout:v_rva_trafic_fcd',format: 'image/png',transparent: true});


// Ajouter une attribution personnalisée directement via la carte
map.attributionControl.addAttribution('Réalisation :  <a href = "https://esigat.wordpress.com/" target="_blank"> Master SIGAT</a> / Sources : OSM et Rennes Métropole');

// Ajouter une MiniMap
var miniMapLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png');
var miniMap = new L.Control.MiniMap(miniMapLayer, { toggleDisplay: true, minimized: true, position: 'bottomright'}).addTo(map);

// Écouter l'événement de changement de fond de carte
map.on('baselayerchange', function(event) {
  miniMapLayer.setUrl(event.layer._url); // Met à jour l'URL de la MiniMap
});

/*// Ajouter des marqueurs manuels
  var Rennes2 = L.marker([48.119, -1.7013]).addTo(map);
  var GareRennes = L.marker([48.103, -1.672]).addTo(map);

//Groupe de marqueur
  var Rennes1 = new L.LayerGroup();
  L.marker([48.125, -1.627]).addTo(map),
  L.marker([48.118, -1.638]).addTo(map);*/

//marqueur perso
//popup
var popupRennes2 = '<b>Université Rennes 2 </b> <hr> <p>Photo</p> <img src="https://static.actu.fr/uploads/2023/02/universite-rennes-2-blocage-6-fevrier-2023.jpeg" width="250px">';
var customOptions = {'maxWidth': '500', 'className' : 'custom'}
    
var rennes2icone = L.icon({
  iconUrl: 'https://www.anrt.asso.fr/sites/default/files/styles/large/public/logos-membres/universite_rennes_2.png?itok=Bbefo8m0',
  iconSize: [50, 50] });
var Rennes2 = L.marker([48.119, -1.7013], {icon: rennes2icone}).bindPopup(popupRennes2,customOptions);

var gareicone = L.icon({
  iconUrl: 'data:image/jpeg;base64,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',
  iconSize: [50, 30] });
var GareRennes = L.marker([48.103, -1.672], {icon: gareicone}).bindPopup('<b>Gare de Rennes</b>');

// Ajouter un gestionnaire d'événements pour le survol (hover)
GareRennes.on('mouseover', function (e) {
  this.openPopup();
  });
// Ajouter un gestionnaire d'événements pour quitter le survol (hover)
GareRennes.on('mouseout', function (e) {
  this.closePopup();
  });

//ajout stations de vélos 
var url = 'https://raw.githubusercontent.com/mastersigat/data/main/velostar.geojson';
$.getJSON(url, function (geojson) {
var velos = L.geoJson(geojson,{
  // Transformer les marqueurs en point
  pointToLayer: function (geoJsonPoint, latlng) {
  return L.circleMarker(latlng);
  },
    // Modifier la symbologie des points
    style: function (geoJsonFeature) {
    return {
    fillColor: '#001f3f',
    radius: 6,
    fillOpacity: 0.7,
    stroke: false};
    },
   }
 ).addTo(map);
 // Ajout Popup
velos.bindPopup(function(velos) {console.log(velos.feature.properties);
return "<h3> Station : "+velos.feature.properties.nom+"</h3>"+"<hr><p>"+velos.feature.properties.nombreemplacementstheorique+ "&nbsp; vélos</p>" ;
});
});

//gestion des marqueurs
var donnees = {"Université Rennes2": Rennes2, "Gare de Rennes": GareRennes, "Cadastre": Cadastre, "Batiments": Bati, "Voie cyclables":Velo, "Trafic en temps réel": Trafic};

// menu fond de carte
var menu1 = L.control.layers(baselayers, null, {position: 'topleft', collapsed : true }).addTo(map);
// menu couches
var menu2 = L.control.layers(null, donnees, {position: 'topright', collapsed : false }).addTo(map);

// Fonction pour ajouter un titre au menu
function addTitle(control, title) {
    var container = control.getContainer(); // Récupère le conteneur du menu
    var titleElement = document.createElement("div"); // Crée un élément div
    titleElement.innerHTML = `<strong>${title}</strong>`; // Ajoute le titre en gras
    titleElement.style.padding = "5px"; // Ajoute un peu de style
    titleElement.style.textAlign = "center";
    titleElement.style.backgroundColor = "grey";
    titleElement.style.color = "white";
    container.prepend(titleElement); // Insère le titre en haut du menu
}

// Ajouter des titres aux menus
addTitle(menu1, "Fonds de carte");
addTitle(menu2, "Couches de données");

// Ajouter l'echelle cartographique
L.control.scale().addTo(map);