import React, { useState, useEffect } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { detect } from "../networking/Vision";
import EditableQuestion from "./EditableQuestion";
import { categories, makeid, showGeneralError } from "../Utils";
import { useFocusEffect } from "@react-navigation/core";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { addQuiz } from "../networking/DatabaseCommunications";
export default function Create({ route }) {
    const [questions, setQuestions] = useState([]);
    const [quizName, setQuizName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [description, setDescription] = useState("");

    const addEmptyQuestion = () => {
        let newQues = {
            ques: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            answer: "",
            id: makeid(10),
        };
        setQuestions((allQuestions) => [...allQuestions, newQues]);
    };
    useFocusEffect(
        React.useCallback(() => {
            const items = (
                <View style={{ flexDirection: "row", paddingRight: 10 }}>
                    <Button
                        style={{ fontSize: 24 }}
                        title="Scan"
                        onPress={showOptionsAlert}
                    />
                    <Button
                        style={{ fontSize: 32 }}
                        title="+"
                        onPress={addEmptyQuestion}
                    />
                </View>
            );
            route.params.changeHeader("Create Quiz", items);
            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );

    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                await ImagePicker.requestCameraPermissionsAsync();
            }
        })();
    }, []);

    const setQuestion = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques.id == id) {
                    ques.ques = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const setOp1 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques.id == id) {
                    ques.option1 = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const setOp2 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques.id == id) {
                    ques.option2 = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };
    const setOp3 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques.id == id) {
                    ques.option3 = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };
    const setOp4 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques.id == id) {
                    ques.option4 = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const setSelection = (id, answer) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques.id == id) {
                    ques.answer = answer;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const deleteItem = (id) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.filter((ques) => ques.id != id);
            return allQuestions;
        });
    };

    const textCallBack = (text) => {
        text = text.split("\n");
        let ques = [];
        try {
            let itr = 0;
            let newQues;
            for (let i = 0; i < text.length / 5; i++) {
                itr = i * 5;
                if (text[itr + 4] != undefined) {
                    newQues = {
                        ques: text[itr],
                        option1: text[itr + 1],
                        option2: text[itr + 2],
                        option3: text[itr + 3],
                        option4: text[itr + 4],
                        answer: "",
                        id: makeid(10),
                    };
                    ques.push(newQues);
                }
            }
        } catch (error) {
            console.log("Create Error: ", error);
        }
        setQuestions((allQuestions) => [...allQuestions, ...ques]);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        detect(result.uri, textCallBack);
    };

    const pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });
        detect(result.uri, textCallBack);
    };

    const showOptionsAlert = () => {
        Alert.alert("Select Image", "Where would you like to get image from?", [
            {
                text: "Camera",
                onPress: pickImageCamera,
            },
            {
                text: "Gallery",
                onPress: pickImage,
            },
            {
                text: "Cancel",
                onPress: () => console.log("OK Pressed"),
            },
        ]);
    };

    const createQuizCallback = (json) => {
        if (json["Message"] == undefined) {
            setQuestions([]);
            setQuizName("");
            setSelectedCategory(-1);
            setDescription("");
        } else {
            showGeneralError(
                "Error!",
                "There was a problem in creating this quiz"
            );
        }
    };

    const createQuiz = () => {
        let noProb = true;
        if (quizName == "" || selectedCategory == -1) {
            noProb = false;
        }
        questions.forEach((question) => {
            console.log(question);
            if (
                question.ques == "" ||
                question.option1 == "" ||
                question.option2 == "" ||
                question.option3 == "" ||
                question.option4 == "" ||
                question.answer == ""
            ) {
                noProb = false;
            }
        });
        if (noProb) {
            let json = { name: quizName };
            let ques = [];
            questions.forEach((question) => {
                ques.push({
                    question: question.ques,
                    options: [
                        question.option1,
                        question.option2,
                        question.option3,
                        question.option4,
                    ],
                    answer: question.answer,
                });
            });
            json["questions"] = ques;
            json["description"] = description;
            json["typeOfQuiz"] = selectedCategory;
            json = { quiz: json };
            console.log(json);
            addQuiz(json, createQuizCallback);
        } else {
            showGeneralError(
                "Error!",
                "One of the questions either has an empty field or the answer has not been selected"
            );
        }
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={questions}
                renderItem={({ item }) => (
                    <EditableQuestion
                        item={item}
                        setQ={setQuestion}
                        setOp1={setOp1}
                        setOp2={setOp2}
                        setOp3={setOp3}
                        setOp4={setOp4}
                        setSelection={setSelection}
                        deleteItem={deleteItem}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
            />
            <View style={{ padding: 10 }}>
                <TextInput
                    placeholder="Quiz Name"
                    style={{ marginBottom: 10, fontSize: 20 }}
                    onChangeText={setQuizName}
                    value={quizName}
                />

                <TextInput
                    placeholder="Description"
                    style={{ marginBottom: 10, fontSize: 16 }}
                    onChangeText={setDescription}
                    value={description}
                />
                <DropDownPicker
                    items={categories}
                    containerStyle={{
                        height: 40,
                        marginVertical: 5,
                        zIndex: 10000,
                    }}
                    style={{ backgroundColor: "#fafafa", zIndex: 10 }}
                    itemStyle={{
                        justifyContent: "flex-start",
                        zIndex: 10000,
                    }}
                    dropDownStyle={{
                        backgroundColor: "#fafafa",
                        zIndex: 10000,
                    }}
                    onChangeItem={(item) =>
                        setSelectedCategory(Number(item.value))
                    }
                    zIndex={10000}
                />
                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: "#007AFF",
                        borderRadius: 10,
                    }}
                    onPress={createQuiz}
                >
                    <Text
                        style={{
                            color: "#fff",
                            textAlign: "center",
                            fontSize: 20,
                        }}
                    >
                        Create
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
