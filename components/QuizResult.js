import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import { Audio } from "expo-av";
import { sounds } from "../Utils";

const {width: screenWidth} = Dimensions.get("window");

export default function QuizResult({route, navigation}) {

    async function playSound(audio) {
        console.log(audio);
        const { sound } = await Audio.Sound.createAsync(audio);
        await sound.playAsync();
        await sound.unloadAsync();
    }

    const displayWinner = () => {
        if (route.params.score / route.params.totalQuestions > 0.5) {
            playSound(sounds.winner);
            return (
                <View
                    style={{
                        zIndex: 2,
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Image
                        style={{
                            zIndex: 2,
                            height: "100%",
                            width: "100%",
                        }}
                        source={require("../assets/winner.gif")}
                    />
                </View>
            );
        }
    };

    return(
        <View style={styles.container}>
            <View styles={styles.card}>
                <Text style={{fontSize: 33, fontWeight: "bold", textAlign: "center", marginBottom: 20}}>Quiz finished!</Text>
                <Text style={{fontSize: 23, textAlign: "center", marginBottom: 20}}>You Scored {route.params.score}/{route.params.totalQuestions}</Text>
                <View style={styles.button}>
                    <TouchableOpacity style={{
                                paddingVertical: 10,
                                backgroundColor: "#a6efce",
                                borderRadius: 10,
                                paddingHorizontal: 50,
                            }}>
                        <Text>Play Again</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                                paddingVertical: 10,
                                borderColor: "#a6efce",
                                borderWidth: 2,
                                borderRadius: 10,
                                paddingHorizontal: 50,
                            }} onPress={() => navigation.popToTop()}>
                        <Text>Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {displayWinner()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: 10
    },
    card: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 20,
        borderRadius: 10,
        margin: 10,
        height: 300,
        width: 400,
        backgroundColor: "#f8f8f8",
    },
    button: {
        flexDirection: "row",
        margin: 5,
        justifyContent: "space-around"
    }
})