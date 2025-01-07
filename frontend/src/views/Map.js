import React from "react";
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

const MapWrapper = () => {
  const mapRef = React.useRef(null);

  React.useEffect(() => {
    const loadMap = () => {
      const google = window.google;

      if (google && google.maps) {
        const mapElement = mapRef.current;
        const lat = 40.748817; // Koordinat harus berupa angka
        const lng = -73.985428;
        const myLatlng = new google.maps.LatLng(lat, lng);

        // Definisikan mapOptions di sini
        const mapOptions = {
          zoom: 13,
          center: myLatlng,
          scrollwheel: false, // Menonaktifkan scroll pada peta
          styles: [
            {
              elementType: "geometry",
              stylers: [{ color: "#1d2c4d" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#8ec3b9" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1a3646" }],
            },
            {
              featureType: "administrative.country",
              elementType: "geometry.stroke",
              stylers: [{ color: "#4b6878" }],
            },
            {
              featureType: "administrative.land_parcel",
              elementType: "labels.text.fill",
              stylers: [{ color: "#64779e" }],
            },
            {
              featureType: "administrative.province",
              elementType: "geometry.stroke",
              stylers: [{ color: "#4b6878" }],
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.stroke",
              stylers: [{ color: "#334e87" }],
            },
            {
              featureType: "landscape.natural",
              elementType: "geometry",
              stylers: [{ color: "#023e58" }],
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#283d6a" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6f9ba5" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1d2c4d" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#023e58" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#3C7680" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#304a7d" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#98a5be" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1d2c4d" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#2c6675" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.fill",
              stylers: [{ color: "#9d2a80" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#9d2a80" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#b0d5ce" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#023e58" }],
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [{ color: "#98a5be" }],
            },
            {
              featureType: "transit",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#1d2c4d" }],
            },
            {
              featureType: "transit.line",
              elementType: "geometry.fill",
              stylers: [{ color: "#283d6a" }],
            },
            {
              featureType: "transit.station",
              elementType: "geometry",
              stylers: [{ color: "#3a4762" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#0e1626" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#4e6d70" }],
            },
          ],
        };

        const newMap = new google.maps.Map(mapElement, mapOptions);

        const marker = new google.maps.Marker({
          position: myLatlng,
          map: newMap,
          animation: google.maps.Animation.DROP,
          title: "BLK Design System PRO React!",
        });

        const contentString =
          '<div class="info-window-content"><h2>BLK Dashboard React</h2>' +
          "<p>A freebie Admin for ReactStrap, Bootstrap, React, and React Hooks.</p></div>";

        const infowindow = new google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("click", () => {
          infowindow.open(newMap, marker);
        });
      } else {
        console.error("Google Maps API is not loaded yet.");
      }
    };

    if (!window.google || !window.google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadMap;
      script.onerror = () => {
        console.error("Failed to load Google Maps script.");
      };
      document.body.appendChild(script);
    } else {
      loadMap();
    }
  }, []);

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }} />;
};

function Map() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>Google Maps</CardHeader>
              <CardBody>
                <div
                  id="map"
                  className="map"
                  style={{ position: "relative", overflow: "hidden" }}
                >
                  <MapWrapper />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Map;
