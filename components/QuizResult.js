import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { sounds } from "../Utils";
import { LinearGradient } from "expo-linear-gradient";

const { width: screenWidth } = Dimensions.get("window");

let imageTimer = true;

export default function QuizResult({ route, navigation }) {
    async function playSound(audio) {
        console.log(audio);
        const { sound } = await Audio.Sound.createAsync(audio);
        await sound.playAsync();
        await sound.unloadAsync();
        imageTimer = false;
    }

    const playAgainHandler = () => {
        route.params.resetQuiz();
        navigation.pop();
    };

    const displayWinner = () => {
        if (
            imageTimer &&
            route.params.score / route.params.totalQuestions > 0.1
        ) {
            playSound(sounds.winner);
            return (
                <View
                    style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Image
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                        source={require("../assets/winner.gif")}
                    />
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#e68321", "#b41e75"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{ paddingTop: 50, width: "100%" }}
            >
                {displayWinner()}
                <View>
                    <Text
                        style={{
                            fontSize: 33,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: 20,
                        }}
                    >
                        Quiz finished!
                    </Text>
                    <Text
                        style={{
                            fontSize: 23,
                            textAlign: "center",
                            marginBottom: 20,
                        }}
                    >
                        You Scored {route.params.score}/
                        {route.params.totalQuestions}
                    </Text>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                backgroundColor: "#e5ad58",
                                borderRadius: 10,
                                paddingHorizontal: 50,
                            }}
                            onPress={playAgainHandler}
                        >
                            <Text>Play Again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                borderColor: "#e5ad58",
                                borderWidth: 2,
                                borderRadius: 10,
                                paddingHorizontal: 50,
                            }}
                            onPress={() => navigation.popToTop()}
                        >
                            <Text>Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },
    button: {
        flexDirection: "row",
        margin: 5,
        justifyContent: "space-around",
    },
});
