"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import useLoadGoogleMaps from "../hooks/useLoadGoogleMaps";
import { useUser } from "../context/UserContext";

export default function OrderAddressModal() {
  const {
    isOrderAddressModalOpen,
    closeOrderAddressModal,
    saveAddress,
    openCheckoutSummary,
    addressModalTrigger,
  } = useCart();

  const [mode, setMode] = useState<"map" | "manual">("map");
  const [manualAddress, setManualAddress] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [resolvedAddress, setResolvedAddress] = useState(""); // new state

  const mapRef = useRef<HTMLDivElement>(null);
  const autocompleteRef = useRef<HTMLInputElement>(null);

  const googleLoaded = useLoadGoogleMaps();
  const { saveUserAddress, user } = useUser();

  /** Reverse geocode function */
  const reverseGeocode = (lat: number, lng: number) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === "OK" && results && results[0]) {
        setResolvedAddress(results[0].formatted_address);
      } else {
        setResolvedAddress("Address not found");
      }
    });
  };

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

    // ⬇️ If user has saved address, move map & marker
    if (user?.address) {
      const { lat, lng } = user.address.coordinates;

      const position = { lat, lng };
      map.setCenter(position);
      marker.setPosition(position);

      setResolvedAddress(user.address.address);
      setSelectedLocation(position);
    }

    const initialPos = marker.getPosition()!.toJSON();
    setSelectedLocation(initialPos);
    reverseGeocode(initialPos.lat, initialPos.lng);

    marker.addListener("dragend", () => {
      const pos = marker.getPosition()!.toJSON();
      setSelectedLocation(pos);
      reverseGeocode(pos.lat, pos.lng);
    });

    map.addListener("click", (e: any) => {
      if (!e.latLng) return;
      const pos = e.latLng.toJSON();
      marker.setPosition(e.latLng);
      setSelectedLocation(pos);
      reverseGeocode(pos.lat, pos.lng);
    });
  }, [googleLoaded, mode, user]);

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
      setResolvedAddress(place.formatted_address); // also update resolvedAddress
    });
  }, [googleLoaded, mode]);

  useEffect(() => {
    if (isOrderAddressModalOpen && user?.address) {
      setMode("manual"); // <-- ensure input exists
    }
  }, [isOrderAddressModalOpen, user]);

  useEffect(() => {
    if (isOrderAddressModalOpen && user?.address) {
      const { address, coordinates } = user.address;

      setResolvedAddress(address);
      setManualAddress(address);
      setSelectedLocation(coordinates);

      // Switch to MANUAL mode if you prefer auto-filling the textbox
      // setMode("manual");
    }

    if (mode === "manual" && user?.address && autocompleteRef.current) {
      autocompleteRef.current.value = user.address.address;

      setResolvedAddress(user.address.address);
      setManualAddress(user.address.address);
      setSelectedLocation(user.address.coordinates);
    }
  }, [isOrderAddressModalOpen, mode, user]);

  /** Save Address */
  const handleSave = () => {
    if (!selectedLocation) return;

    saveAddress({
      address: resolvedAddress || manualAddress || "Pinned on map",
      coordinates: selectedLocation,
    });

    saveUserAddress({
      address: resolvedAddress || manualAddress || "Pinned on map",
      coordinates: selectedLocation,
    }); // NEW (User Profile)

    closeOrderAddressModal();
    addressModalTrigger === "checkout" && openCheckoutSummary();
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
          <>
            <div
              ref={mapRef}
              style={{ width: "100%", height: 300, borderRadius: 8 }}
            />
            <p className="mt-2 text-gray-700">
              Selected Address: {resolvedAddress || "Loading..."}
            </p>
          </>
        )}

        {mode === "manual" && (
          <>
            <input
              ref={autocompleteRef}
              type="text"
              placeholder="Enter your address"
              className="border p-2 w-full rounded"
            />
          </>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeOrderAddressModal}
          >
            {addressModalTrigger === "login" ? "Skip for now" : "Close"}
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
