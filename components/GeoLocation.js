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
        console.log(geoloc);
    }

    return (
        <View styles={styles.container2}>

            {geoloc.main ? 
                <View styles={styles.container2}>
                    <View style={{flexDirection: 'row', justifyContent:"space-around", alignItems: 'center', margin:"auto"}}>
                        <Text>{geoloc.name}</Text>
                            <Text>{geoloc.weather[0].description}</Text>
                            <Text>{geoloc.main.temp}</Text>

                    <Image
                        source={{ uri: "https://openweathermap.org/img/wn/" + geoloc.weather[0].icon + ".png", }} style={{ width: 100, height: 100 }}
                        />       
                    </View>
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

const styles = StyleSheet.create({
    contain: {
        backgroundColor: "rgba(254,254,254,0.1)",
        width: "80%",
        margin: "auto",
        flexDirection: "column",
        justifyContent: "center",
    },
    contain2: {
        backgroundColor: "rgba(254,254,254,0.1)",
        width: "80%",
        margin: "auto",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh"
    }
})