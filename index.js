$( document ).ready(function() {
  $(".foo").submit(function(e) {
    e.preventDefault();
  })

  $('#boner').click(function () {
    console.log($('#address').val())
    let address = $('#address').val()
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAPKACRgyqd9NmpbeA37CYl1gcKgQcJglM

    // do the AJAX
    let array = address.split(" ")
    console.log(array)
    let string = array.join("+")
    let theurl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + string
    console.log(theurl)
    $.ajax({
      url: theurl,
      method: 'GET',
      dataType: 'JSON',
      headers: {},
      data: {
        key: "AIzaSyAPKACRgyqd9NmpbeA37CYl1gcKgQcJglM",
      }
    }).done((response) => {
      console.log("data from spotify is...", response)
      let lat = response['results'][0]['geometry']['location']['lat']
      let long = response['results'][0]['geometry']['location']['lng']
      console.log(lat)
      console.log(long)
      initialize(lat, long)
      getVenue(lat, long)

    }).fail((err) => { console.log("a bad thing happened with getting albums", err) })
  })
    console.log( "ready!" );
});


var map;
var service;
var infowindow;


function initialize(lat, long) {
  var pyrmont = new google.maps.LatLng(lat,long);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  // var request = {
  //   location: pyrmont,
  //   radius: '500',
  //   type: ['restaurant']
  // };
  //
  // service = new google.maps.places.PlacesService(map);
  // service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}
// curl -X GET -G "https://api.foursquare.com/v2/venues/49d51ce3f964a520675c1fe3" -d v=20170101 -d client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS
// -d client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1
//
// https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS&client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1&v=20170101
//
// https://api.foursquare.com/v2/venues/search?ll=40.7,-74&client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS&client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1&v=20170101
//
// https://api.foursquare.com/v2/venues/49d51ce3f964a520675c1fe3?v=20170101&client_id=KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS&client_secret=SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1


function getVenue(lat, long) {
  lat = lat.toFixed(1)
  long = long.toFixed(1)
  console.log('hello' + lat)
  console.log(long)

    let theurl = "https://api.foursquare.com/v2/venues/search?ll=" + lat + "," + long
    // do the AJAX
    $.ajax({
      url: theurl,
      method: 'GET',
      dataType: 'JSON',
      headers: {},
      data: {
        client_id: "KU34WKY2TBASPPEKWVGEEN3DWBOSDCFC3YY5FAJAVE1QH3KS",
        client_secret: "SJ0D1HE3BKGMSBH1LREV0MUTKS0T1R3GPJ5B3MWRBJK2PVE1",
        v:"20170101",
      }
    }).done((response) => {
      console.log("data from spotify is...", response)
      let venues = response['response']['venues']
      console.log(venues)
      let newul = $('<ul>')
      for (let i = 0; i<venues.length; i++) {
        let newli = $('<li>')

        newli.text("Name: " + venues[i].name)
        newul.append(newli)
        console.log(venues[i].name)
      }
      $('.tyler').append(newul)
    }).fail((err) => { console.log("a bad thing happened with getting albums", err) })
  }
