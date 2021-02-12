import React, {useState} from 'react';
import Header from '../components/Header'
import CitiesList from '../components/CitiesList'
import { View, TextInput, Button, FlatList, Text, Image, ScrollView, ListItem } from 'react-native'


const AddCityScreen = (props) => {

    function handleSubmit() {
        dispatch({
            type: "meteo/addCity",
            payload: {
                city: cityInput 
            }
        });

        setCityInput("")
    }

    const {dispatch} = props;
    const [cityInput, setCityInput] = useState('')
    
        return (
            <View>
                <Header/>
                <TextInput
                    placeholder='Ville'
                    onChangeText = {(text) => setCityInput(text)}
                    value = {cityInput}
                    onSubmitEditing={() => handleSubmit()}
                />

                <Button
                    title="Rechercher"
                    onPress={() => handleSubmit()}
                />

                <CitiesList />

            </View>
        )
    

}



import {connect} from 'react-redux'
export default connect(({meteo})=> ({meteo}))(AddCityScreen);

