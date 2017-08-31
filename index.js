function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 40.01685,
      lng: -105.2816839
    },
    zoom: 10,
    mapTypeId: 'roadmap'
  });
  var infowindow = new google.maps.InfoWindow({

  });

  var service = new google.maps.places.PlacesService(map);
  // Create the search box and link it to the UI element.
  var input = document.getElementById('address');
  var searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    console.log(places)
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        icon: icon,
        title: place.name,
        position: place.geometry.location
      }));
      //console.log("marker")

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
    service.nearbySearch({
      location: map.center,
      radius: 600,
      type: ['restaurants', 'bars', 'nightclubs', 'brewery' , 'tavern', 'restaurant' , 'pub' , 'food']
    }, callback);
    console.log(map.center.lng(), map.center.lat())

    function callback(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
      console.log(results)
    }

    function createMarker(place) {
      var placeLoc = place.geometry.location;
      var id = place.place_id;
      //console.log("id is ", id);
      var detailRequest = {placeId: id};
      // console.log("detailRequest is ",detailRequest);
      // service.getDetails({
      //           placeId: id})
      service.getDetails(place, function(destination, status){
          //  console.log("destination is ", destination, " status is ", status);
        var marker = new google.maps.Marker({
          map: map,
          title: place.name,
          position: place.geometry.location,
          address: destination.formatted_address,
          phoneNum: destination.formatted_phone_number,
          url: destination.website,
        });

        marker.addListener('click', function() {
          infowindow.setContent("<h3>" + place.name + "</h3>" + marker['phoneNum'] + "<br>" + marker['address'] + "<br>" + marker['url'] + "<div> Desc: Food & Beverage </div>");
          infowindow.open(map, marker);
        });
      })
    }
  });
}
