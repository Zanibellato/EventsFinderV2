var app = app || {};

(function () {
    "use strict";
    function Songkick() {
        
        var content = {
            url: "http://api.songkick.com/api/3.0/events.json?apikey=O8wdJ6BXCMaTKv1k&location=geo:",
            eventsList: []
        };
        
        var getSongkickEvents = function(lat, lng, datetime){
            var day = datetime[0].replace(/\./g, "-");
            var date = "&min_date=" + day + "&max_date=" + day;
            var url = content.url + lat + "," + lng + date;
            var promise = $.get(url).done(function (res) {
                //console.dir(res);
                if (res.resultsPage.results.event) {
                    res.resultsPage.results.event.forEach(function(ev, i , arr){
                        //console.log(ev);
                        var latitude, longitude;
                        if(ev.venue.lat === null  || ev.venue.lng === null){
                            latitude = lat;
                            longitude = lng;
                        }else{
                            latitude = ev.venue.lat;
                            longitude = ev.venue.lng;
                        }
                        var element = new app.Event();
                        element.createEvent(
                                ev.displayName,
                                ev.displayName,
                                ev.start.date,
                                ev.start.time,
                                ev.type,
                                ev.venue.displayName,
                                ev.location.city,
                                latitude,
                                longitude,
                                ev.uri,
                                "songkick",
                                "http://images.sk-static.com/images/media/profile_images/artists/" + ev.performance[0].artist.id + "/card_avatar"
                                );
                        var event = element.getTheEvent();
                        //console.log(event);
                        content.eventsList.push(event);
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
            getSongkickEvents: getSongkickEvents,
            getList: getList
        };
    }

    app.Songkick = Songkick;
}());