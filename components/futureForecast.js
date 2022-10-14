import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import moment from 'moment-timezone';

const FutureForeCast = ({data}) => {
    return (
        <View style={{flexDirection: "row"}}>

            {
                data && data.lenght > 0?

                data.map((data, idx) => (
                    idx !==0 && <FutureForeCastItem key={idx} forecastItem={data}/>
                ))

                :

                <View/>
            }
        </View>
    )
}



const FutureForeCastItem = ({forecastItem}) => {
    const img = {uri: "https://openweathermap.org/img/wn" + forecastItem.weather[0].icon + "@2x.png"}
    return(
        <View style ={styles.FutureForeCastItemContainer}>
            <Text style={styles.day}>{moment(forecastItem.dt *1000).format("ddd")}</Text>
            <Image source={img} style={styles.image}/>
            <Text style={styles.temp}>Night - {forecastItem.temp.night}&#176;C</Text>
            <Text style={styles.temp}>Day - {forecastItem.temp.night}&#176;C</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
    },
    FutureForeCastItemContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#00000033",
        borderRadius: 10,
        borderColor: "#eee",
        borderWidth: 1,
        padding: 20,
        marginLeft: 10
    },
    day: {
        fontSize: 20,
        color: "white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign: "center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },
    temp: {
        fontSize: 14,
        color: "white",
        fontWeight: "100",
        textAlign: "center"
    }
});

export default FutureForeCast;