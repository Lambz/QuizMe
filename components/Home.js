import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import { AuthSession, WebBrowser, Linking } from "expo";
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
        route.params.moveTo("Quiz", { quiz: quiz });
    };

    const handleRedirect = async (event) => {
        WebBrowser.dismissBrowser();
    };

    const handleOAuthLogin = async () => {
        // gets the app's deep link
        let redirectUrl = await Linking.getInitialURL();
        console.log(redirectUrl);
        // this should change depending on where the server is running
        let authUrl = `http://localhost:3000/auth/google`;
        addLinkingListener();
        try {
            let authResult = await WebBrowser.openAuthSessionAsync(
                `http://localhost:3000/auth/google`,
                redirectUrl
            );
            await this.setState({ authResult: authResult });
        } catch (err) {
            console.log("ERROR:", err);
        }
        removeLinkingListener();
    };
    const addLinkingListener = () => {
        Linking.addEventListener("url", handleRedirect);
    };
    const removeLinkingListener = () => {
        Linking.removeEventListener("url", handleRedirect);
    };

    const sendRequest = async () => {
        try {
            let response = await fetch("http://localhost:3000/auth/google");
            console.log(response);
            let json = await response.json();
            console.log("JSON: ", json);
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    return (
        <View style={styles.container}>
            <Button title="Login" onPress={handleOAuthLogin} />
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
