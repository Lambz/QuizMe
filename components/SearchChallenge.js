import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { SearchBar } from "react-native-elements";
import {
    fetchAllQuizesForChallenge,
    sendInvite,
} from "../networking/DatabaseCommunications";
import QuizItem from "./subcomponents/QuizItem";

export default function ({ route, navigation }) {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setLoading] = useState([]);

    let searchText = "";

    if (isLoading) {
        fetchAllQuizesForChallenge((data) => {
            if (data) {
                setQuizzes(data);
            }
        });
        setLoading(false);
    }

    const quizClicked = (item) => {
        sendInvite({
            quiz: item._id,
            sendTo: route.params.id
        }, (data) => {
            if(data) {
                Alert.alert("Invite Sent", `Your invitation has been successfully sent to ${route.params.name}!`);
            }
            else{
                Alert.alert("Invite Sending Error", `Your invitation has not been sent!`);
            }
        })
        
    };

    const emptyQuiz = () => {
        return (
            <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>No quizzes available</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search Quizzes"
                value={searchText}
                platform="ios"
            />
            <FlatList
                data={quizzes}
                renderItem={({ item }) => (
                    <QuizItem
                        item={item}
                        quizClicked={quizClicked}
                        moveToChallengers={null}
                        isLoggedIn={false}
                    />
                )}
                ListEmptyComponent={emptyQuiz}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyList: {
        textAlign: "center",
    },
    emptyListText: {
        fontSize: 22,
        textAlign: "center",
    },
});
