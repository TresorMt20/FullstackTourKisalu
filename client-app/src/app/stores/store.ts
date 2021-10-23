import { createContext, useContext } from "react";
import PlaceStore from "./placeStore";

interface Store{
    placeStore: PlaceStore
}

export const store: Store = {

    placeStore: new PlaceStore()
}

export const StoreContext = createContext(store);

export function useStore( ){
    return useContext(StoreContext);
}