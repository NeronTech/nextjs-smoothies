"use client";

import Script from "next/script";

export default function GoogleMapsLoader() {
  return (
    <Script
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBcpApXaxF5oRAYsQ0-yqj2M_jODFNzMBM&callback=initAutocomplete&libraries=places"
      strategy="afterInteractive" // ensure it loads on client
    />
  );
}
