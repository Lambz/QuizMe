import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { getQuizesByUser } from "../networking/DatabaseCommunications";
import QuizItem from "./QuizItem";
export default function Quizes({ navigation, route }) {
    const [quizes, setQuizes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    if (isLoading) {
        getQuizesByUser((json) => {
            setQuizes(json);
        });
        setLoading(false);
    }

    const showEmptyComponent = () => {
        return (
            <View
                style={{
                    alignItems: "center",
                    marginTop: 20,
                }}
            >
                <Text style={{ fontSize: 20 }}>You have no quizes</Text>
            </View>
        );
    };
    const quizClicked = (quiz) => {
        
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={quizes}
                renderItem={({ item }) => <QuizItem item={item} quizClicked={quizClicked}/>}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={showEmptyComponent}
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
