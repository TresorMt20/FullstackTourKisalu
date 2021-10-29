import { format } from "date-fns";
import { makeAutoObservable, makeObservable, observable, runInAction } from "mobx"
import agent from "../api/agent";
import { Place } from "../models/place";

export default class PlaceStore  {
   
    placeRegistry = new Map<string, Place>();
    selectedPlace: Place | undefined = undefined;
    loading = false;
    loadingInitial = true;

    constructor(){
        makeAutoObservable(this)
    }

    get placesByDate(){
        return Array.from(this.placeRegistry.values()).sort((a,b) => 
        a.date!.getTime() - b.date!.getTime());
    }

    get groupedPlaces() {

        return Object.entries(
            this.placesByDate.reduce((places,place) => {
                const date = format( place.date!,'dd MMM yyyy')
                places[date] = places[date] ? [...places[date], place] : [place];
                return places;
            },{} as {[key: string]: Place[]})
        )
    }

    

    loadPlaces = async () => {
        this.loadingInitial = true;
        try {
            

            const places = await agent.Places.list();
                places.forEach(place => {
                    this.setPlace(place);
                  })
                  this.setLoadingInitial(false);

            
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPlace = async (id: string) =>{
        let place =this.getPlace(id);
        if(place){
            this.selectedPlace = place;
            return place;
        }else{
            this.loadingInitial = true;
            try {
                place = await agent.Places.details(id);
                this.setPlace(place);
                    this.selectedPlace = place;
                    this.setLoadingInitial(false);

            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPlace = (place: Place) =>{
        place.date = new Date(place.date!);
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
    setLoadingInitial = (state : boolean) => {
        this.loadingInitial = state;
    }

}