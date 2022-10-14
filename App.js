import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import * as Location from "expo-Location";
import DateTime from './components/datetime';
import WeatherScroll from './components/wheatherScroll';
import FutureForeCast from './components/futureforecast';

const API_KEY = "b9207d97c5ec736583ce5c67cdbc47d9"
const img = require("./assets/icon.png");

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async() => {
      let { status } = await Location.requestForegroundPermissionAsync();
      if ( status !== "granted"){
        fetchDataFromApi("40.7128","-74.0060")
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchDataFromApi(location.coords.latitude, location.coords.longitude);
    })();
  }, [])

    const fetchDataFromApi = (latitude, longitude) => {
      if(latitude && longitude){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`).then(res => res.json()).then(data => {
          setData(data)
        })
      }
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={assets} style={styles.image}>
          <DateTime current={data.current} timezone={data.timezone} lat={data.lat} lon={data.lon}/>
          <WeatherScroll weatherData={data.daily}/>
        </ImageBackground>
      </View>
    );
}



const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  }
});
