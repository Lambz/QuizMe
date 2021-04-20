import React, { useRef, useState } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { fetchAllQuestionsRequest } from "../networking/DatabaseCommunications";
import QuestionItem from "./subcomponents/QuestionItem";
import { BlurView } from "expo-blur";

export default function ImportQuestions({ navigation, route }) {
    const [isLoading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [selectedQuestions, setSelectedQuestion] = useState([]);
    if (isLoading) {
        fetchAllQuestionsRequest((json) => {
            // console.log("questions: ", json);
            setQuestions(json);
        });
        setLoading(false);
    }

    const addQuestion = (question) => {
        question["isEditing"] = false;
        setSelectedQuestion([...selectedQuestions, question]);
    };

    const removeQuestion = (question) => {
        setSelectedQuestion((allQuestions) => {
            allQuestions = allQuestions.filter(
                (ques) => ques._id != question._id
            );
            return allQuestions;
        });
    };

    const importHandler = () => {
        // console.log(route.params);
        // console.log("selectedQuestions: ", selectedQuestions);
        route.params.importQuestionsCallback(selectedQuestions);
        navigation.pop();
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={questions}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <QuestionItem
                        item={item}
                        addQuestion={addQuestion}
                        removeQuestion={removeQuestion}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 80 }}
            />
            <BlurView intensity={96} style={styles.nonBlurredContent}>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 20,
                        paddingVertical: 10,
                        backgroundColor: "#007AFF",
                        borderRadius: 10,
                    }}
                    onPress={importHandler}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 20,
                        }}
                    >
                        Import
                    </Text>
                </TouchableOpacity>
            </BlurView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    nonBlurredContent: {
        position: "absolute",
        bottom: 0,
        paddingTop: 20,
        paddingBottom: 40,
        width: "100%",
    },
});
