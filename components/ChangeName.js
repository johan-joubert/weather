import React, {useState} from 'react';
import Header from './Header';
import { View, TextInput, Button, FlatList, Text, Image, ScrollView, ListItem } from 'react-native'

const ChangeName = (props) => {


    function handleSubmit() {
        dispatch({
            type: "user/storeName",
            payload:  {
                userName: nameInput
            }
        });
        
        setNameInput("")
    }  
    
    const {dispatch} = props;
    const [nameInput, setNameInput] = useState("");

    
    
        return (
            <View>
                <Header />
                <TextInput
                    placeholder='Votre Nom'
                    onChangeText = {(text) => setNameInput(text)}
                    value = {nameInput}
                />

                <Button 
                    color="red" 
                    title='Rechercher' 
                    onPress={() => handleSubmit()} 
                />

            </View>
        )
    

}



import {connect} from 'react-redux'
export default connect(({user})=> ({user}))(ChangeName);

