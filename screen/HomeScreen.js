import React, {useState, useEffect} from 'react';
import { View, TextInput, Button, FlatList, Text, Image, ScrollView, ListItem } from 'react-native'
import Search from '../components/Search'
import Header from '../components/Header'
import CitiesList from '../components/CitiesList'
import GeoLocation from '../components/GeoLocation'
import AsyncStorage from "@react-native-async-storage/async-storage";


const ChangeName = (props) => {

    useEffect(() => {
        async function getName() {
            const temp = await AsyncStorage.getItem("userName");
            setName(temp);
        }

        getName();
    })

    const [userName, setName] = useState("");


    
        return (
            <View>
                <Header/>
                <GeoLocation />
                <Search />
                <CitiesList />

            </View>
        )
    

}



import {connect} from 'react-redux'
export default connect(({user})=> ({user}))(ChangeName);

