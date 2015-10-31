var app = app || {};

(function () {
    "use strict";
    function Eventbrite() {
        
        var content = {
            url: "https://www.eventbriteapi.com/v3/events/search/?token=V3JOI66SWU6O2P3CB4IO&expand=venue,category",
            eventsList: [],
            events: null
        };
        
        
        
        var getEventbriteEvents = function(country, city, lat, lng){
            var url = content.url + "&venue.country=" + country + "&venue.city=" + city;
            var promise = $.get(url).done(function (res) {
                //console.log(res);
                if (res.events.length) {
                    res.events.forEach(function(ev, i , arr){
                        //console.log(ev);
                        if(ev.venue){ //Only events with a phifical venue
                            var element = new app.Event();
                            var date = ev.start.local.split("T");
                            var location = ev.venue.address.address_1 + ", " + ev.venue.address.city + ", " +  ev.venue.address.country;
                            var latitude, longitude;
                            var category = "";
                            if(ev.category){
                                category = ev.category.name;
                            }
                            var imgUrl = "images/eventbrite.jpg";
                            if(ev.logo){
                                imgUrl= ev.logo.url;
                            }
                            
                            if(ev.address){
                               latitude =  ev.venue.address.latitude;
                               longitude = ev.venue.address.longitude;
                            }else{
                               latitude =  lat;
                               longitude = lng;
                            }
                            
                            element.createEvent(
                                ev.name.text,
                                ev.description.text,
                                date[0],
                                date[1],
                                category,
                                ev.venue.name,
                                location,
                                latitude,
                                longitude,
                                ev.url,
                                "eventbrite",
                                imgUrl
                             );
                            var event = element.getTheEvent();
                            //console.log(event);
                            content.eventsList.push(event);  
                        }
                    });
                } else {
                    console.log("Sorry, there are no upcoming events.");  
                }
                
                
            }).fail(function(err){
                console.log("err", err);
            });
            
            return promise;
        };
        
        var getList = function(){
            return content.eventsList;
        };
        
        
        return {
            getEventbriteEvents: getEventbriteEvents,
            getList: getList
        };
    }
    
    app.Eventbrite = Eventbrite;
}());