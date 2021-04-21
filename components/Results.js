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
import {
    fetchQuizByID,
    getResultsRequest,
} from "../networking/DatabaseCommunications";
import ResultItem from "./subcomponents/ResultItem";

import { LinearGradient } from "expo-linear-gradient";

export default function Results({ route, navigation }) {
    const [results, setResults] = useState([]);

    const moveToQuiz = (quiz) => {
        navigation.navigate("QuizDetail", { quiz: quiz });
    };

    useFocusEffect(
        React.useCallback(() => {
            getResultsRequest((json) => {
                json.forEach((result) => {
                    let rank = -1;
                    for (let i = 0; i < result.quiz.max_scores.length; i++) {
                        if (result.quiz.max_scores[i]._id == result._id) {
                            rank = i + 1;
                            break;
                        }
                    }
                    result.quiz.max_scores.splice(5);
                    result["rank"] = rank;
                });
                setResults(json);
            });
        }, [])
    );

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#e68321", "#b41e75"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <FlatList
                    data={results}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <ResultItem item={item} moveToQuiz={moveToQuiz} />
                    )}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fd9426",
    },
});
