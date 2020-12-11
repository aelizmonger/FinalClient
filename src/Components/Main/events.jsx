import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const getInfoWindowString = (event) => `
    <div>
      <div style="font-size: 16px;">
        ${event.name}
      </div>
      <div style="font-size: 14px;">
        <span style="color: grey;">
        ${event.info}
        </span>
        <span style="color: orange;">${event.dates.start.dateTime}</span>
      </div>
    </div>`;


const handleApiLoaded = (map, maps, events) => {
    const markers = [];
    const infowindows = [];
  
    events.forEach((event) => {
      markers.push(new maps.Marker({
        position: new maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
        // {
        //   lat: event._embedded.venues[0].location.latitude,
        //   lng: event._embedded.venues[0].location.longitude,
        // },
        map,
      }));
  
      infowindows.push(new maps.InfoWindow({
        content: getInfoWindowString(event),
      }));
    });
  
    markers.forEach((marker, i) => {
      marker.addListener('click', () => {
        infowindows[i].open(map, marker);
      });
    });
  };

const Event = () => {
    const [location, setLocation] = useState ('')
    const [error, setError] = useState (false)
    const [events, setEvents] = useState ([])
    const [center, setCenter] = useState (false)


    //getLocation when app loads.
    useEffect(getLocation, [])
    //When location updates, fetch event data.
    useEffect(async () => {
       try {
            setEvents( await fetchEvents (location))
            setCenter({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
       } catch (err) {
           setError (err)
       }
    }, [location]) 
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(setLocation, setError);
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    }
      return (
        <div>
          <p id="location">Events Near You </p>
          {center && events.length ? (
          <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                defaultCenter={center}
                defaultZoom={10}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps, events)}
                />
            </div>
            ) : null}
          <div id="events" >
              {events.map((event, index) => { 
                  const img = event.images.find((image) => {
                        return image.ratio == '3_2'
                  })
                  const imgSrc = img.url || false 
                  return (
                      <div id="image" key={index}> 
                      <div className="eventImage">
                          {imgSrc ? <img src={imgSrc} alt="" /> : null}
                      </div>
                        <p>
                            {event.name}
                            {event.info}
                            {event.dates.start.dateTime}
                        </p>
                      </div>
                  )
              } )}
          </div>
        </div>
      );
    }
 export default Event;


async function fetchEvents(position) {
    try {

    
    const { latitude, longitude } = position.coords
    
    const response = await axios.get( `http://localhost:5000/api/events/${latitude}/${longitude}`)
    return response.data
    } catch (err) {
       throw err
    }
}


// function showError(error) {
//     switch(error.code) {
//         case error.PERMISSION_DENIED:
//             x.innerHTML = "User denied the request for Geolocation."
//             break;
//         case error.POSITION_UNAVAILABLE:
//             x.innerHTML = "Location information is unavailable."
//             break;
//         case error.TIMEOUT:
//             x.innerHTML = "The request to get user location timed out."
//             break;
//         case error.UNKNOWN_ERROR:
//             x.innerHTML = "An unknown error occurred."
//             break;
//     }
// }





// function initMap(position, json) {
//   var mapDiv = document.getElementById('map');
//   var map = new google.maps.Map(mapDiv, {
//     center: {lat: position.coords.latitude, lng: position.coords.longitude},
//     zoom: 10
//   });
//   for(var i=0; i<json.page.size; i++) {
//     addMarker(map, json._embedded.events[i]);
//   }
// }

// function addMarker(map, event) {
//   var marker = new google.maps.Marker({
//     position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
//     map: map
//   });
//   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
//   console.log(marker);
// }




