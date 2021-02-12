import React, { useState, useEffect } from 'react';
import { Platform, Text, View, Image, StyleSheet } from 'react-native';
import { getGeoLocWeatherFromOPMWithSearch } from '../API/GetGeoLocOWMApi'
import * as Location from 'expo-location';

const GeoLocation = (props) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            let textLocation = 'Waiting..';
            if (errorMsg) {
                textLocation = errorMsg;
            } else if (location) {
                textLocation = JSON.stringify(location);
                dispatch({
                    type: "meteo/getLocalMeteoInformation",
                    payload: location
                })
            }
        })();

    }, []);

    const {
        dispatch,
        meteo: {
            geoloc,
        }
    } = props;

    if (geoloc.main) {
        console.log(geoloc.main.temp);
    }

    return (
        <View >
            {geoloc.main ? 
                <View>
                    <Text>Votre position</Text>
                    <Text>{geoloc.name}</Text>
                    <Image
                        source={{ uri: "https://openweathermap.org/img/wn/" + geoloc.weather[0].icon + ".png", }} style={{ width: 100, height: 100 }}
                    />

                            
                </View>
                :
                <View>

                </View>

            }
                
            
        </View>
    );
}

import { connect } from 'react-redux';
export default connect(({ meteo }) => ({ meteo }))(GeoLocation);