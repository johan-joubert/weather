import React from 'react'
import { ListItem, Avatar, Icon, Card } from 'react-native-elements'

import { StyleSheet, View, Text, Button } from 'react-native'

const CitiesList = (props) => {

    
    function handleDeleting() {
        dispatch({
            type: "meteo/deleteCity",
            payload: {
                city: cityName
            }
        });
    }
    
    const { dispatch, cities, citiesInformations, cityName } = props
    

    console.log(citiesInformations)

    return (
        <View>
            {
                cities.map(cityName => (
                    <ListItem key={citiesInformations[cityName].id} bottomDivider >
                        <ListItem.Content>
                            <Text>{citiesInformations[cityName].name}</Text>
                            <Text>{citiesInformations[cityName].main.temp}</Text>
                            <Icon name='clear' type='material' onPress={handleDeleting}/>
                        </ListItem.Content>
                    </ListItem>
                ))

            }
        </View>
    )

}


import { connect } from 'react-redux'
export default connect(state => state.meteo)(CitiesList);