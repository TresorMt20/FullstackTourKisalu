import { createContext, useContext } from "react";
import ModalStore from "../models/modalStore";
import CommonStore from "./commonStore";
import PlaceStore from "./placeStore";
import UserStore from "./userStore";

interface Store{
    placeStore: PlaceStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {

    placeStore: new PlaceStore(),
    commonStore: new CommonStore(),
    modalStore: new ModalStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore( ){
    return useContext(StoreContext);
}