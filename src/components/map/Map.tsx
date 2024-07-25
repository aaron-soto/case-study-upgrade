"use client";

import { useEffect, useRef } from "react";

import { Loader } from "@googlemaps/js-api-loader";
import { mapOptions } from "./config";

function Map() {
  const mapRef = useRef(null);
  const coordinates = { lat: 33.50754, lng: -112.0479 };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
    });

    loader
      .load()
      .then(() => {
        if (!(window as any).google) {
          console.error("Google Maps JavaScript API not loaded.");
          return;
        }

        const map = new (window as any).google.maps.Map(
          mapRef.current,
          mapOptions(coordinates)
        );

        const marker = new (window as any).google.maps.Marker({
          map,
          position: coordinates,
          title: "Case Study Phoenix",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
            scaledSize: new (window as any).google.maps.Size(48, 48),
          },
        });

        const infoWindow = new (window as any).google.maps.InfoWindow({
          content: `
            <div style="font-size: 16px; color: #000000;">
              <h2>Case Study Phoenix</h2>
              <p>4802 N 16th St Phoenix, AZ</p>
              <p><a href="https://www.google.com/maps/dir/?api=1&destination=33.50754,-112.0479" target="_blank" style="color: #ffa500;">Get Directions</a></p>
            </div>
          `,
        });

        marker.addListener("click", () => {
          infoWindow.open(map, marker);
        });
      })
      .catch((error) => {
        console.error("Error loading Google Maps API:", error);
      });
  }, []);

  return (
    <div
      style={{ height: "400px", width: "100%", marginTop: "20px" }}
      ref={mapRef}
    />
  );
}

export default Map;
