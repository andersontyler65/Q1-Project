// var map;
// var service;
// var infowindow;
//
// function initialize() {
//   var pyrmont = new google.maps.LatLng(-33.8665433,151.1956316);
//
//   map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont,
//       zoom: 15
//     });
//
//   var request = {
//     location: pyrmont,
//     radius: '500',
//     type: ['restaurant']
//   };
//
//   service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, callback);
// }
//
// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       var place = results[i];
//       createMarker(results[i]);
//     }
//   }
// }
curl -X GET -G "https://api.foursquare.com/v2/venues/49d51ce3f964a520675c1fe3" -d v=20170101 -d client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS
-d client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1

https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS&client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1&v=20170101

https://api.foursquare.com/v2/venues/49d51ce3f964a520675c1fe3&v=20170101&client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS&client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1

function getVenue(lookingFor, location) {
    console.log("doing tough ajax stuff with", lookingFor, location)

    // do the AJAX
    $.ajax({
      url: "https://api.foursquare.com/v2/venues/49d51ce3f964a520675c1fe3",
      method: 'GET',
      dataType: 'JSON',
      headers: {},
      data: {
        v=20170101,
        client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS,
        client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1
      }
    }).done((response) => {
      console.log("data from spotify is...", response)
      parseAlbum(response)
    }).fail((err) => { console.log("a bad thing happened with getting albums", err) })
  }
