import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Button,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { getRandomImage, categories } from "../Utils";
import { useFocusEffect } from "@react-navigation/native";
import { fetchQuizByID } from "../networking/DatabaseCommunications";

let message = "";

export default function QuizDetail({ route, navigation }) {
    const [quiz, setQuiz] = useState(route.params.quiz);

    const playQuiz = () => {
        navigation.navigate("Quiz", { quiz: quiz });
    };

    const challengeFriend = () => {
        navigation.navigate("SendChallenge", { quiz: quiz });
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchQuizByID(quiz._id, (data) => {
                setQuiz(data.quiz);
                if (data.userScored) {
                    message = "You are a top scorer in this quiz!";
                }
                console.log(quiz.max_scores);
            });
        }, [])
    );

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
            <Image
                style={styles.image}
                source={getRandomImage(quiz.typeOfQuiz)}
            />
            <Text style={styles.header}>{quiz.name}</Text>
            <View style={styles.details}>
                <Text style={styles.category}>
                    <Text style={{ fontWeight: "bold" }}>Category</Text>:{" "}
                    {categories[quiz.typeOfQuiz].label}
                </Text>
                <Text style={styles.category}>
                    <Text style={{ fontWeight: "bold" }}>Questions</Text>:{" "}
                    {quiz.questions.length}
                </Text>
            </View>
            <Text>{message}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        backgroundColor: "#a6efce",
                        borderRadius: 10,
                        paddingHorizontal: 50,
                    }}
                    onPress={playQuiz}
                >
                    <Text>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        paddingVertical: 10,
                        borderColor: "#a6efce",
                        borderWidth: 2,
                        borderRadius: 10,
                        paddingHorizontal: 50,
                    }}
                    onPress={challengeFriend}
                >
                    <Text>Challenge Friend</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.descriptionView}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 10,
                    }}
                >
                    Quiz Description
                </Text>
                <Text style={styles.description}>{quiz.description}</Text>
            </View>
            <View style={[styles.descriptionView, styles.leaderboardColor]}>
                <Text style={styles.bold}>Top Scores</Text>
                <View style={styles.details}>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        Rank
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        Player
                    </Text>
                    <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                        Score
                    </Text>
                </View>
                <FlatList
                    data={quiz.max_scores.sort((a, b) => b - a)}
                    renderItem={({ item, index }) => (
                        <View style={styles.details}>
                            <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                {index + 1}
                            </Text>
                            <Text>{item.playedBy}</Text>
                            <Text>{item.score}</Text>
                        </View>
                    )}
                ></FlatList>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
        resizeMode: "cover",
    },
    header: {
        fontSize: 33,
        fontWeight: "bold",
        margin: 5,
        marginBottom: 10,
    },
    details: {
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    category: {
        fontSize: 18,
    },
    bold: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignContent: "center",
        marginBottom: 10,
    },
    descriptionView: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 20,
        borderRadius: 10,
        margin: 10,
        minWidth: 160,
        backgroundColor: "#FFDCD5",
    },
    leaderboardColor: {
        backgroundColor: "#FED82C",
    },
});
