import { getGeoLocWeatherFromOPMWithSearch } from '../API/GetGeoLocOWMApi'
import { getWeatherFromOPMWithSearch } from '../API/OWMApi'
import * as Location from 'expo-location';
import React, { useState, useEffect } from 'react';

export const meteo = {
    state: {
        cities: [],
        geoloc: {},
        citiesInformations: {},
    },

    reducers: {
        setCities(state, { cities }) {
            return { ...state, cities };
        },
        setGeoloc(state, geoloc) {
            return { ...state, geoloc };
        },

        setCitiesInformations(state, { citiesInformations }) {
            return { ...state, citiesInformations }
        }
    },

    effects: (dispatch) => ({
        async addCity({ city }, rootState) {       // ajouter une ville à la liste et récupérer sa météo

            const {                                // création copie du state pour accéder à cities et citiesinformations
                meteo: {
                    cities,
                    citiesInformations
                }
            } = rootState;

            const newCities = [...cities];         // on crée une copie de la liste des villes

            newCities.unshift(city);                // on y ajoute la nouvelle ville (city)
            
            const response = await getWeatherFromOPMWithSearch(city);  // On récupère la météo de la nouvelle ville
            if (response && typeof response === "object") {
                const newCitiesInfos = citiesInformations; // on transforme les infos des villes en objet json
                newCitiesInfos[city] = response;     // on y ajoute les infos de la nouvelle ville à la clé [city] (nom nouvelle ville)
                this.setCities({ cities: newCities });  // on utilise le reducer setNewCity pour ajouter les infos des villes actualisées
                this.setCitiesInformations({citiesInformations : newCitiesInfos})
            } else {
                console.log("erreur " + response);
            }
        },

        async getLocalMeteoInformation(location) {

            const { coords: { latitude, longitude } } = location
            const lat = latitude;
            const lon = longitude;


            const response= await getGeoLocWeatherFromOPMWithSearch(lon, lat);
            
            console.log(response)

            dispatch.meteo.setGeoloc(response);

            console.log(meteo.state.geoloc);
        },

        deleteCity({city}, rootState) { 
            const {
                meteo: {
                    cities
                }
            } = rootState
            const arrayCities = [...cities];
            const indexCities = arrayCities.indexOf(city)
            arrayCities.splice(indexCities, 1);
            this.setCities({cities: arrayCities});
        }
    })
}
