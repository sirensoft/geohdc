var direction = function(origin, destination) {
    var directionsService = new google.maps.DirectionsService();
    var directionsRequest = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };
    return new Promise(function(resolve, reject) {
        directionsService.route(directionsRequest, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                var route = response.routes[0].overview_polyline;
                var descript = response.routes[0].legs[0];
                //console.log(descript)
                var data = {
                    route: route,
                    descript: {
                        distance: descript.distance.text,
                        duration: descript.duration.text
                    }

                };
                resolve(data)
            } else {
                reject("ผิดพลาด:" + status)
            }
        })
    });
};