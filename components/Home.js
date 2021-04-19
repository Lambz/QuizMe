import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList } from "react-native-gesture-handler";
import { AuthSession, WebBrowser, Linking } from "expo";
import QuizItem from "./QuizItem";
import { getCookies, storeSetCookies } from "../Utils";
import { fetchAllQuizes } from "../networking/DatabaseCommunications";
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
            typeOfQuiz: 1,
        },
    ]);
    const [isLoading, setLoading] = useState(true);
    useFocusEffect(
        React.useCallback(() => {
            route.params.changeHeader("Home", null);
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

    // const sendRequest = async () => {
    //     const response = await fetch("http://localhost:3000/auth/login", {
    //         method: "POST", // *GET, POST, PUT, DELETE, etc.
    //         mode: "cors", // no-cors, *cors, same-origin
    //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: "same-origin", // include, *same-origin, omit
    //         headers: {
    //             "Content-Type": "application/json",
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: "follow", // manual, *follow, error
    //         referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //         body: JSON.stringify({
    //             email: "chaitanya.sanoriya@gmail.com",
    //             password:
    //                 "$2b$10$vRrNVKG1OIHCTqE.fjQOsO4QT7CHz1x2.BBJ0aV7uUm3zETpLM97e",
    //         }), // body data type must match "Content-Type" header
    //     });
    //     storeSetCookies(response.headers);
    //     let json = await response.json();
    //     console.log("login: ", json);
    //     // await CookieManager.clearAll();
    //     Networking.clearCookies((cleared) => {
    //         console.debug("cleared hadCookies: " + cleared.toString());
    //         // ApiUtils.login(your_login_params); // call your login function
    //     });
    //     let cookies = await getCookies();
    //     console.log("cookies: ", cookies);
    //     let response1 = await fetch("http://localhost:3000/user", {
    //         method: "GET",
    //         mode: "cors",
    //         cache: "no-cache",
    //         credentials: "same-origin", // or 'include' depending on CORS
    //         headers: {
    //             Cookie: cookies,
    //         },
    //     });
    //     let json1 = await response1.json();
    //     console.log("response from user: ", json1);
    // };
    return (
        <View style={styles.container}>
            {/* <Button title="Login" onPress={sendRequest} /> */}
            <FlatList
                data={quizes}
                renderItem={({ item }) => (
                    <QuizItem item={item} quizClicked={quizClicked} />
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
