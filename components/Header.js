import React, {useState, useEffect} from 'react'

import { StyleSheet,View, Text } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const Header = (props) => {

    useEffect(() => {
        async function getName() {
            const temp = await AsyncStorage.getItem("userName");
            setName(temp);
        }
        getName();
    })

    const [userName, setName] = useState("");

        return (
            <View style={styles.header}>

                <Text>{userName}</Text>

            </View>
        )
}



import {connect} from 'react-redux'
export default connect(({user})=> ({user}))(Header);


const styles = StyleSheet.create({
    header:  {
        backgroundColor : 'blue',
    }
})