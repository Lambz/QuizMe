import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import {
    fetchAllQuizesForChallenge,
    fetchQuizByID,
} from "../networking/DatabaseCommunications";
import QuizItem from "./subcomponents/QuizItem";

// let isLoading = true;

export default function ({ route, navigation }) {
    const [quizzes, setQuizzes] = useState([]);
    const [isLoading, setLoading] = useState([]);

    let searchText = "";

    if (isLoading) {
        fetchAllQuizesForChallenge((data) => {
            if (data) {
                // isLoading = false;
                setQuizzes(data);
            }
        });
        setLoading(false);
    }
    // useFocusEffect(
    //     React.useCallback(() => {
    //         fetchAllQuizes((data) => {
    //             if(data) {
    //                 setQuizzes(data);
    //             }

    //         })
    //     }, [])
    // )

    const quizClicked = (item) => {};

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
