import React, {useState} from 'react'
import { ImageBackground, ActivityIndicator, SafeAreaView, StyleSheet, View, TextInput, Button, FlatList, Text, Image, ScrollView, ListItem } from 'react-native'
import { getWeatherFromOPMWithSearch } from '../API/OWMApi'
import { getWeatherTimeFromOPMWithSearch } from '../API/TimeOWMApi'
import Icon from 'react-native-ionicons'
import Moment from 'moment'
import { connect } from 'react-redux'
import Header from './Header'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            forecast: null,
            time: [],
            isLoading: false
        }
        this.searchedText = ""
    }

    _loadWeather() {
        if (this.searchedText.length > 0) {

            getWeatherFromOPMWithSearch(this.searchedText).then(data => { this.setState({ forecast: data, isLoading: false }, () => console.log(this.state.forecast)) })
            getWeatherTimeFromOPMWithSearch(this.searchedText).then(data => { this.setState({ time: data, isLoading: false }, () => console.log(this.state.time)) })

        }
    }
    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
    }


    _searchTextInputChanged(text) {
        this.searchedText = text
    }



    render() {

        console.log("RENDER")
        console.log(this.state.isLoading);
        Moment.locale('fr');

        const renderItem = ({item}) => (
            <View>
                <Text>
                    {item.dt_txt}
                </Text>
                <Image
                    source={{ uri: "https://openweathermap.org/img/wn/" + item.weather[0].icon + ".png", }} style={{ width: 100, height: 100 }}
                />        
            </View>
        )  
            
        const iconSearch = <FontAwesomeIcon icon={faSearch} onPress={() => this._loadWeather()} style={{color: 'blue'}} />;

        const sourceImgSky = require("../media/sky.jpg");
        const sourceImgClouds = require("../media/clouds.jpg");

        return (

            <View>
                
                <View style={{flexDirection: "row", justifyContent:"center"}}>

                    <TextInput placeholder='Ville' onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} onSubmitEditing={() => this._loadWeather()}/>

                    <Button color="none" title="rechercher" onPress={() => this._loadWeather()} />

                </View>

                {this.state.forecast !== null ? (
                    <ImageBackground source={this.state.forecast.weather[0].icon == "01d" ? sourceImgSky : sourceImgClouds }>

                    <View style={styles.main_container}>
                        <View >
                            <Text>Bonjour <Header /></Text>
                            <Text style={styles.dayDate}>{Moment().format('dddd d MMMM')}</Text>
                            <Text style={styles.town}>{this.state.forecast.name}</Text>

                        </View>
                        <View >
                            <Image
                                source={{ uri: "https://openweathermap.org/img/wn/" + this.state.forecast.weather[0].icon + ".png", }} style={{ width: 100, height: 100 }}
                                />
                        </View>
                        <View >
                            <Text >{Math.round(this.state.forecast.main.temp)} °C</Text>
                            <Text>{this.state.forecast.weather[0].description}</Text>
                        </View>
                        <Text style={{ textAlign: 'center', padding: 10 }}>Vitesse du vent : {Math.round((this.state.forecast.wind.speed * 3.6))} km/h</Text>
                        <Text>
                            Levé du soleil : {Moment().startOf('day')
                                .seconds(this.state.forecast.sys.sunrise)
                                .format('H:mm:ss')}
                        </Text>
                        <Text>
                            Couché du soleil : {Moment().startOf('day')
                                .seconds(this.state.forecast.sys.sunset)
                                .format('H:mm:ss')}
                        </Text>

                        <View>
                            <SafeAreaView>

                            <ScrollView horizontal={true}>
                                    <FlatList 
                                        horizontal
                                        pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                        legacyImplementation={false}
                                        data={this.state.time.list}
                                        renderItem={renderItem}
                                        keyExtractor={item => item.dt_txt}
                                        />
                            </ScrollView>

                            </SafeAreaView>
                        </View>                        
                        
                    </View>
                </ImageBackground>
                ) : (<Text style={{}}>Choisissez une ville</Text>)}

                {this._displayLoading()}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        marginTop: 50,
        margin: "auto",
        flex: 1,
        height: "100vh"
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    dayDate: {
        textTransform: "capitalize",
        margin: "5px",
        fontSize: "1.5em"
    },
    town: {
        margin: "5px",
        fontSize: "1.5em",
        fontWeight: "bold"
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }

})

export default connect()(Search)