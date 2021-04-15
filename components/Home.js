import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import QuizItem from "./QuizItem";
export default function Home({ route }) {
    const [quizes, setQuizes] = useState([
        {
            name: "Simple",
            questions: [
                {
                    answer: "Carrot",
                    options: ["Cabbage", "Carrot", "Tomato", "Raddish"],
                    question: "What do you like?",
                },
                {
                    answer: "Yes",
                    options: ["N/A", "Yes", "No", "Maybe"],
                    question: "Blackerry you like?",
                },
            ],
        },
    ]);
    useFocusEffect(
        React.useCallback(() => {
            route.params.changeHeader("Home", null);
            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );
    const quizClicked = (quiz) => {
        console.log(quiz);
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={quizes}
                renderItem={({ item }) => (
                    <QuizItem item={item} quizClicked={quizClicked} />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
