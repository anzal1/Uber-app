import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDestination,
  selectOrigin,
  setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";

export default function Map() {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapref = React.useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!origin || !destination) return;
    mapref.current.fitToCoordinates(["origin", "destination"], {
      edgePadding: { top: 40, right: 40, bottom: 40, left: 40 },
      animated: true,
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(
            setTravelTimeInformation(data.rows[0].elements[0]));
        });
    };
  }, [origin, destination, GOOGLE_MAPS_APIKEY]);

  return (
    <MapView
      ref={mapref}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: 28.561657,
        longitude: 77.281258,
        // latitude: origin.location.lat,
        // longitude: origin.location.lng,
        longitudeDelta: 0.005,
        latitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="Destination"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({});
