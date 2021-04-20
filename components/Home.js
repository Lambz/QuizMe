import React, { useState } from "react";
import { Button, RefreshControl, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AuthSession, WebBrowser, Linking } from "expo";
import QuizItem from "./subcomponents/QuizItem";
import { getCookies, storeSetCookies } from "../Utils";
import { fetchAllQuizes } from "../networking/DatabaseCommunications";
export default function Home({ route }) {
    const [quizes, setQuizes] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const addClicked = () => {
        route.params.moveTo("Create");
    };
    const checkLogin = async () => {
        const cookie = await getCookies();
        let items = null;
        if (cookie) {
            setLoggedIn(true);
            items = (
                <TouchableOpacity
                    style={{ marginRight: 10 }}
                    onPress={addClicked}
                >
                    <Text style={{ fontSize: 32, color: "#007AFF" }}>+</Text>
                </TouchableOpacity>
            );
        }
        route.params.changeHeader("Home", items);
    };
    useFocusEffect(
        React.useCallback(() => {
            checkLogin();

            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );

    const quizesCallback = (json) => {
        setQuizes(json);
    };

    if (isLoading) {
        fetchAllQuizes(quizesCallback);
        setLoading(false);
    }

    const quizClicked = (quiz) => {
        console.log(quiz);
        route.params.moveTo("Quiz", { quiz: quiz });
    };

    const moveToChallengers = (item) => {
        route.params.moveTo("SendChallenge", { quiz: item });
    };
    return (
        <View style={styles.container}>
            {/* <Button title="Login" onPress={sendRequest} /> */}
            <FlatList
                data={quizes}
                renderItem={({ item }) => (
                    <QuizItem
                        item={item}
                        quizClicked={quizClicked}
                        moveToChallengers={moveToChallengers}
                        isLoggedIn={isLoggedIn}
                    />
                )}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>
                            No Quizes to display
                        </Text>
                    </View>
                )}
                refreshControl={
                    <RefreshControl onRefresh={() => setLoading(true)} />
                }
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
