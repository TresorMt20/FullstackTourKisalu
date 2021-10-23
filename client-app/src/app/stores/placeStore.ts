import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx"
import agent from "../api/agent";
import { Place } from "../models/place";

export default class PlaceStore  {
   
    placeRegistry = new Map<string, Place>();
    selectedPlace: Place | undefined = undefined;

    constructor(){
        makeAutoObservable(this)
    }

    get placesByDate(){
        return Array.from(this.placeRegistry.values()).sort((a,b) => 
        Date.parse(a.date) - Date.parse(b.date));
    }

    loadPlaces = async () => {
        try {

            const places = await agent.Places.list();
                places.forEach(place => {
                    this.setPlace(place);
                  })

            
        } catch (error) {
            console.log(error);
            
        }
    }

    loadPlace = async (id: string) =>{
        let place =this.getPlace(id);
        if(place){
            this.selectedPlace = place;
            return place;
        }else{
            
            try {
                place = await agent.Places.details(id);
                this.setPlace(place);
                    this.selectedPlace = place;

            } catch (error) {
                console.log(error);
            }
        }
    }

    private setPlace = (place: Place) =>{
        place.date = place.date.split('T')[0];
                    this.placeRegistry.set( place.id,place)
    }

    private getPlace= (id: string) => {
        return this.placeRegistry.get(id);
    }

    deletePlace = async (id: string) =>{
        try {
            await agent.Places.delete(id);
                this.placeRegistry.delete(id) 
        } catch (error) {
            console.log(error);
        }
    }

    updatePlace = async (place: Place) => {
        try {
            await agent.Places.update(place);
                this.placeRegistry.set(place.id, place) 
                this.selectedPlace = place;
        } catch (error) {

            console.log(error);
        }
    }
    
    createPlace = async (place: Place) => {
        try {
            await agent.Places.create(place);
                this.placeRegistry.set(place.id, place)  
                this.selectedPlace =place;
        } catch (error) 
        {
            console.log(error);
        }
    }

}