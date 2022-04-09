import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { fetchPlaces } from "../util/database";


function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState();

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      loadPlaces();
      //setLoadedPlaces(curPlaces => [...curPlaces, route.params.place]); //needs to implement the location API in order for it to work
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />
}


export default AllPlaces;