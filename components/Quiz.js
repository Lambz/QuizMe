import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Alert, StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Audio } from "expo-av";
import { shuffle, sounds } from "../Utils";
import { sendResultRequest } from "../networking/DatabaseCommunications";
export default function Quiz({ navigation, route }) {
    const [isFinished, setFinished] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [bgOption1Color, setBgOption1Color] = useState("#fff");
    const [bgOption2Color, setBgOption2Color] = useState("#fff");
    const [bgOption3Color, setBgOption3Color] = useState("#fff");
    const [bgOption4Color, setBgOption4Color] = useState("#fff");
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState(
        route.params.quiz.questions[currentIndex].question
    );
    const [options, setOptions] = useState(
        route.params.quiz.questions[currentIndex].options
    );
    async function playSound(audio) {
        console.log(audio);
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync(audio);
        // console.log(sound);
        // setSound(sound);
        console.log("Playing Sound");
        await sound.playAsync();
        await sound.unloadAsync();
    }
    React.useEffect(
        () =>
            navigation.addListener("beforeRemove", (e) => {
                if (isFinished) {
                    return;
                }
                e.preventDefault();
                Alert.alert(
                    "Quit Quiz?",
                    "The quiz is not yet over, would you like to quit?",
                    [
                        {
                            text: "Don't leave",
                            style: "cancel",
                            onPress: () => {},
                        },
                        {
                            text: "Leave",
                            style: "destructive",
                            onPress: () => navigation.dispatch(e.data.action),
                        },
                    ]
                );
            }),
        [navigation, isFinished]
    );

    const optionSelected = (index) => {
        let currentScore = score;
        if (
            route.params.quiz.questions[currentIndex].answer == options[index]
        ) {
            playSound(sounds.correctAnswer);
            switch (index) {
                case 0:
                    setBgOption1Color("#4cd964");
                    break;
                case 1:
                    setBgOption2Color("#4cd964");
                    break;

                case 2:
                    setBgOption3Color("#4cd964");
                    break;
                case 3:
                    setBgOption4Color("#4cd964");
                    break;
            }
            currentScore += 1;
            setScore(score + 1);
        } else {
            playSound(sounds.wrongAnswer);
            let correctIndex = -1;
            for (let i = 0; i < 4; i++) {
                if (
                    route.params.quiz.questions[currentIndex].options[i] ==
                    route.params.quiz.questions[currentIndex].answer
                ) {
                    correctIndex = i;
                    break;
                }
            }
            switch (index) {
                case 0:
                    setBgOption1Color("#ff3b30");
                    break;
                case 1:
                    setBgOption2Color("#ff3b30");
                    break;

                case 2:
                    setBgOption3Color("#ff3b30");
                    break;
                case 3:
                    setBgOption4Color("#ff3b30");
                    break;
            }
            switch (correctIndex) {
                case 0:
                    setBgOption1Color("#4cd964");
                    break;
                case 1:
                    setBgOption2Color("#4cd964");
                    break;

                case 2:
                    setBgOption3Color("#4cd964");
                    break;
                case 3:
                    setBgOption4Color("#4cd964");
                    break;
            }
        }
        setTimeout(() => {
            if (currentIndex < route.params.quiz.questions.length - 1) {
                setQuestion(
                    route.params.quiz.questions[currentIndex + 1].question
                );
                setOptions(
                    shuffle(
                        route.params.quiz.questions[currentIndex + 1].options
                    )
                );
                setBgOption1Color("#fff");
                setBgOption2Color("#fff");
                setBgOption3Color("#fff");
                setBgOption4Color("#fff");
                setCurrentIndex(currentIndex + 1);
            } else {
                setFinished(true);
                sendResultRequest({
                    quiz: route.params.quiz,
                    score: currentScore,
                });
            }
        }, 1000);
    };
    const displayWinner = () => {
        console.log(
            "displayWinner: ",
            isFinished,
            score,
            route.params.quiz.questions.length
        );
        if (isFinished && score / route.params.quiz.questions.length > 0.5) {
            playSound(sounds.winner);
            return (
                <View
                    style={{
                        zIndex: 50000,
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                    }}
                >
                    <Image
                        style={{
                            zIndex: 50000,
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
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                    {route.params.quiz.name}
                </Text>
                <Text
                    style={{ marginTop: 60, fontSize: 28, fontWeight: "bold" }}
                >
                    {question}
                </Text>
                <View
                    style={{
                        marginTop: 40,
                        width: "100%",
                    }}
                >
                    <TouchableOpacity
                        style={[
                            styles.option,
                            {
                                backgroundColor: bgOption1Color,
                            },
                        ]}
                        activeOpacity={0.6}
                        onPress={() => optionSelected(0)}
                    >
                        <Text style={{ fontSize: 20 }}>{options[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.option,
                            {
                                marginTop: 20,
                                backgroundColor: bgOption2Color,
                            },
                        ]}
                        activeOpacity={0.6}
                        onPress={() => optionSelected(1)}
                    >
                        <Text style={{ fontSize: 20 }}>{options[1]}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.option,
                            {
                                marginTop: 20,
                                backgroundColor: bgOption3Color,
                            },
                        ]}
                        activeOpacity={0.6}
                        onPress={() => optionSelected(2)}
                    >
                        <Text style={{ fontSize: 20 }}>{options[2]}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.option,
                            {
                                marginTop: 20,
                                backgroundColor: bgOption4Color,
                            },
                        ]}
                        activeOpacity={0.6}
                        onPress={() => optionSelected(3)}
                    >
                        <Text style={{ fontSize: 20 }}>{options[3]}</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        width: "100%",
                    }}
                >
                    <TouchableOpacity
                        style={[
                            styles.option,
                            {
                                paddingVertical: 15,
                                paddingHorizontal: 50,
                                backgroundColor: "#ff3b30",
                                borderRadius: 10,
                            },
                        ]}
                        onPress={() => navigation.pop()}
                    >
                        <Text style={{ color: "#fff", fontSize: 16 }}>
                            Quit
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Score: {score}
                    </Text>
                </View>
                {displayWinner()}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#eee",
        alignItems: "center",
        width: "100%",
    },
    option: {
        padding: 20,
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#aaaaaa",
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },
});
