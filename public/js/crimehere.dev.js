/*
* crimehere jQuery Scripts
*/

var map;
var latlng;
var data;
var crime, latLng;

function getData(callback){
  $.getJSON('5.101.104.178', callback)
}

//Initializing the map
function initialize(data) {
    //var coords = [-25.363882,131.044922]
    var image = '../img/bookmark1.png';
    var mapOptions = {
      center: new google.maps.LatLng(28.580212, 77.366661),
      zoom: 5,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      panControl:true,
      zoomControl:true,
      styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"on"},{"color":"#f3f4f4"}]},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"weight":0.9},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#83cead"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"visibility":"on"},{"color":"#fee379"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#7fc8ed"}]}]
    }
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  function bindInfoWindow(marker, map, infowindow, strDescription) {
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(strDescription);
    infowindow.open(map, marker);
    });
  }    

  var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
  });
    var markers = [];
    if(!data){
        getData(function(data) {
          for(i in data) {
              crime = data[i];
              latLng = new google.maps.LatLng(parseFloat(crime.lat), 
                                              parseFloat(crime.lng));
              var marker = new google.maps.Marker({
                  position: latLng,
                  map:      map,
                  icon: image
              });
              markers.push(marker);
              var window_desc = '<address class=\"address\">\n\t\t\t<strong>Crime:<\/strong>'
            + crime.incident_desc + '<br>\n\t\t\t<strong>Identifier: <\/strong>'+ crime.id +'<br>\n\t\t\t<strong>Area: <\/strong>'+ crime.address + '<br>\n\t\t\t<strong>Description: <\/strong>'+ crime.incident_desc +'<br>\n\t\t\t<\/address>\n\t\t\t\n\t\t<address class=\"address\">\n\t\t\t<strong>Occured On: <\/strong>'+ crime.date_occured +'\n\t\t<\/address>';
            bindInfoWindow(marker, map, infowindow, window_desc)
          }
          var markerCluster = new MarkerClusterer(map, markers);
      });
    }
    else{
          for(i in data) {
              crime = data[i];
              latLng = new google.maps.LatLng(parseFloat(crime.lat), 
                                              parseFloat(crime.lng));
              var marker = new google.maps.Marker({
                  position: latLng,
                  map:      map,
                  icon: image
              });
              markers.push(marker);
              var window_desc = '<address class=\"address\">\n\t\t\t<strong>Crime:<\/strong>'
            + crime.incident_desc + '<br>\n\t\t\t<strong>Identifier: <\/strong>'+ crime.id +'<br>\n\t\t\t<strong>Area: <\/strong>'+ crime.address + '<br>\n\t\t\t<strong>Description: <\/strong>'+ crime.incident_desc +'<br>\n\t\t\t<\/address>\n\t\t\t\n\t\t<address class=\"address\">\n\t\t\t<strong>Occured On: <\/strong>'+ crime.date_occured +'\n\t\t<\/address>';
            bindInfoWindow(marker, map, infowindow, window_desc)
          }
          var markerCluster = new MarkerClusterer(map, markers);      
    }

}    

$( document ).ready(function(){
  $("#overlay-search").submit(function(e)
  {
      var postData = $(this).serializeArray();
      var formURL = $(this).attr("action");
      $.ajax(
      {
          url : formURL,
          type: "POST",
          data : postData,
          success:function(data, textStatus, jqXHR) 
          {
            if(data.Error){
              initialize();
              console.log(data.Error); //Debug
            }
            else{
              initialize(data);
              console.log(data.Error); //Debug
            }
          },
          error: function(jqXHR, textStatus, errorThrown) 
          {
              console.log("Error Fetching Data"); //Debug
              initialize();

          }
      });
      e.preventDefault(); //STOP default action
  });
   
  $("#ajaxform").submit(); //Submit  the FORM
})