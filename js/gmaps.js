var app = app || {};

(function () {
    "use strict";
    function Map() {
        var map = null;
        var markerBounds = new google.maps.LatLngBounds();       
        // Create a map object centered with latitude and longitude and specify the DOM element for display.
        function initMap() {
            map = new google.maps.Map(document.getElementById("map"), {
                scrollwheel: true
            });
            var element = document.getElementById("map");
            element.style.height = window.innerHeight - 150 + "px";
        }; //End of initMap()

        // Create a marker with a name and set its position.
        function createMarker(latitude, longitude, name, source) {
            var latlng = new google.maps.LatLng(latitude, longitude);
            var image;
            if(source === "songkick"){
                image = 'images/songkick.png';
            }
            if(source === "eventbrite"){
                image = 'images/eventbrite.png';
            }
            var marker = new google.maps.Marker({
                map: map,
                position: latlng,
                title: name,
                icon: image
            });
            markerBounds.extend(latlng);
            return marker;
        };

        function createInfoWindow(text) {
            var infowindow = new google.maps.InfoWindow({ content: text });
            return infowindow;
        };

        function attachInfoWindow(marker, infowindow) {
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });
        };

        function fitTheMap() {
            map.fitBounds(markerBounds);
            map.setCenter(markerBounds.getCenter());
        };
        
        function geoCodeThis(address, cb){
            var status = $.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ address +'&key=AIzaSyB7OAjINcISCaEJXnbInGc0iZB1OoOMBQM', function (res) {
                if (res) {
                    //console.log("GEOCODED ADDRESS HERE:");
                    //console.log(res.results[0].geometry.location);
                } else {
                    console.log("it's not possible to geocode the location");
                }
                
                return res;
            });
            
            status.done(cb);
                    
            //return latLng;        
                                   
        };

        //Revealing module of the class Map
        return {
            initMap: initMap,
            createMarker: createMarker,
            createInfoWindow: createInfoWindow,
            attachInfoWindow: attachInfoWindow,
            fitTheMap: fitTheMap,
            geoCodeThis: geoCodeThis
        };

    }// End of class Map()

    app.Map = Map;
}());