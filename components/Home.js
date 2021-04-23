import React, { useState } from "react";
import { Button, RefreshControl, StyleSheet, Text, Image, View, ScrollView, Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { AuthSession, WebBrowser, Linking } from "expo";
import QuizItem from "./subcomponents/QuizItem";
import { getCookies, storeSetCookies } from "../Utils";
import { fetchAllQuizes } from "../networking/DatabaseCommunications";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const {width: screenWidth} = Dimensions.get('window');

export default function Home({ route }) {
    const [quizes, setQuizes] = useState([]);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const addClicked = () => {
        route.params.moveTo("Create");
    };
    const challengesClicked = () => {
        route.params.moveTo("Challenges");
    };

    const resultsClicked = () => {
        route.params.moveTo("Results");
    };
    const checkLogin = async () => {
        const cookie = await getCookies();
        let items = null;
        if (cookie) {
            setLoggedIn(true);
            items = (
                <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                    <TouchableOpacity
                        onPress={resultsClicked}
                        style={{ marginRight: 10 }}
                    >
                        <MaterialCommunityIcons
                            name="clipboard-check-multiple-outline"
                            size={20}
                            color="#007AFF"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={challengesClicked}>
                        <MaterialCommunityIcons
                            name="sword-cross"
                            size={20}
                            color="#007AFF"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ marginHorizontal: 10, alignItems: "center" }}
                        onPress={addClicked}
                    >
                        <Text style={{ fontSize: 32, color: "#007AFF" }}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
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
        route.params.moveTo("QuizDetail", { quiz: quiz });
    };

    const moveToChallengers = (item) => {
        route.params.moveTo("SendChallenge", { quiz: item });
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={{fontSize: 33, fontWeight: "bold", marginBottom: 20}}>Welcome User</Text>
            <View style={[styles.card, {backgroundColor: "#ff6f52"}]}>
                <Image source={require('../assets/badges/cadet.png')}></Image>
                <Text style={{fontSize: 23, marginBottom: 10}}>Rank Cadet</Text>
            </View>
            <View style={[styles.card, {backgroundColor: "#e5e85a", marginBottom: 10}]}>
                <Text style={{fontSize: 23}}>Games Played</Text>
            </View>
            <Text style={{fontSize: 33, fontWeight: "bold", marginBottom: 20}}>Explore Quizzes</Text>
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    card: {
        alignSelf: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 20,
        borderRadius: 10,
        margin: 10,
        height: 80,
        width: screenWidth - 20,
        backgroundColor: "#f8f8f8",
        flexDirection: "row"
    },
});
