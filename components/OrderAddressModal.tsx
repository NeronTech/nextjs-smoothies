"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import useLoadGoogleMaps from "../hooks/useLoadGoogleMaps";

export default function OrderAddressModal() {
  const { isOrderAddressModalOpen, closeOrderAddressModal, saveAddress } =
    useCart();

  const [mode, setMode] = useState<"map" | "manual">("map");
  const [manualAddress, setManualAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const googleLoaded = useLoadGoogleMaps();

  // Debug
  useEffect(() => {
    console.log(
      "Address Modal Open:",
      isOrderAddressModalOpen,
      "Google Loaded:",
      googleLoaded
    );
  }, [isOrderAddressModalOpen, googleLoaded]);

  /** Initialize Google Map */
  useEffect(() => {
    if (!googleLoaded || !mapRef.current || mode !== "map") return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 14.5995, lng: 120.9842 },
      zoom: 14,
    });

    const marker = new google.maps.Marker({
      map,
      draggable: true,
      position: map.getCenter(),
    });

    setSelectedLocation(map.getCenter()!.toJSON());

    marker.addListener("dragend", () => {
      setSelectedLocation(marker.getPosition()!.toJSON());
    });

    map.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      marker.setPosition(e.latLng);
      setSelectedLocation(e.latLng.toJSON());
    });
  }, [googleLoaded, mode]);

  /** Initialize Autocomplete */
  useEffect(() => {
    if (!googleLoaded || mode !== "manual" || !autocompleteRef.current) return;

    const autocomplete = new google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        fields: ["formatted_address", "geometry"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.formatted_address || !place.geometry?.location) return;

      setManualAddress(place.formatted_address);
      setSelectedLocation(place.geometry.location.toJSON());
    });
  }, [googleLoaded, mode]);

  /** Save Address */
  const handleSave = () => {
    if (!selectedLocation) return;

    saveAddress({
      address: manualAddress || "Pinned on map",
      coordinates: selectedLocation,
    });

    closeOrderAddressModal();
  };

  if (!isOrderAddressModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Select Delivery Address</h2>

        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setMode("map")}
            className={`px-2 py-1 rounded ${
              mode === "map" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            📍 Pick from Map
          </button>
          <button
            onClick={() => setMode("manual")}
            className={`px-2 py-1 rounded ${
              mode === "manual" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            ✏️ Enter Address
          </button>
        </div>

        {mode === "map" && (
          <div
            ref={mapRef}
            style={{ width: "100%", height: 300, borderRadius: 8 }}
          />
        )}

        {mode === "manual" && (
          <input
            ref={autocompleteRef}
            type="text"
            placeholder="Enter your address"
            className="border p-2 w-full rounded"
          />
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeOrderAddressModal}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSave}
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}
