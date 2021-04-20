import React, { useState, useEffect } from "react";
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { detect } from "../networking/Vision";
import EditableQuestion from "./EditableQuestion";
import { categories, makeid, showGeneralError } from "../Utils";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import {
    addQuiz,
    updateQuizRequest,
    addQuestionsRequest,
} from "../networking/DatabaseCommunications";
import ToggleSwitch from "rn-toggle-switch";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
export default function Create({ navigation, route }) {
    const [questions, setQuestions] = useState([]);
    const [quizName, setQuizName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [description, setDescription] = useState("");
    const [toggleValue, setToggleValue] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [buttonText, setButtonText] = useState("Create");

    const addEmptyQuestion = () => {
        let newQues = {
            question: "",
            options: [],
            answer: "",
            _id: makeid(10),
            isEditing: false,
        };
        setQuestions((allQuestions) => [...allQuestions, newQues]);
    };

    const importQuestionsCallback = (array) => {
        setQuestions([...questions, ...array]);
    };
    const importQuestions = () => {
        navigation.navigate("ImportQuestions", {
            importQuestionsCallback: importQuestionsCallback,
        });
    };

    if (isLoading) {
        // console.log("quiz: ", route.params.quiz);
        let title = "Create a new Quiz";
        if (route.params != null && route.params.quiz != undefined) {
            title = "Edit quiz";
            setQuizName(route.params.quiz.name);
            let questions = route.params.quiz.questions;
            questions.forEach((question) => {
                question["isEditing"] = true;
            });
            setQuestions(questions);
            setSelectedCategory(route.params.quiz.typeOfQuiz);
            setDescription(route.params.quiz.description);
            if (route.params.quiz.isPublic) {
                setToggleValue(true);
            }
            setButtonText("Save");
        }
        navigation.setOptions({
            title: title,
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        paddingRight: 10,
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{ marginRight: 10 }}
                        onPress={showOptionsAlert}
                    >
                        <AntDesign name="scan1" size={20} color="#007AFF" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={importQuestions}>
                        <MaterialCommunityIcons
                            name="database-import"
                            size={20}
                            color="#007AFF"
                        />
                    </TouchableOpacity>
                    {/* <Button title="Scan" onPress={showOptionsAlert} />
                    <Button title="Import" onPress={showOptionsAlert} /> */}
                    <Button title="+" onPress={addEmptyQuestion} />
                </View>
            ),
        });
        setLoading(false);
    }

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
                if (ques._id == id) {
                    ques.question = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const setOp1 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques._id == id) {
                    ques.options[0] = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const setOp2 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques._id == id) {
                    ques.options[1] = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };
    const setOp3 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques._id == id) {
                    ques.options[2] = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };
    const setOp4 = (id, text) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques._id == id) {
                    ques.options[3] = text;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const setSelection = (id, answer) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques._id == id) {
                    ques.answer = answer;
                }
                return ques;
            });
            return allQuestions;
        });
    };

    const deleteQuestion = (item) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.filter((ques) => ques._id != item._id);
            return allQuestions;
        });
    };

    const updateQuiz = async (quiz, item) => {
        updateQuizRequest(quiz, (json) => {
            // console.log("updateQuizRequest Response: ", json);
            deleteQuestion(item);
        });
    };

    const deleteItem = (item) => {
        if (item.isEditing) {
            Alert.alert(
                "Delete this question?",
                "Are you sure you want to delete this question?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: () => {
                            let ques = questions.filter(
                                (ques) => ques._id != item._id
                            );
                            let quiz = route.params.quiz;
                            quiz.questions = ques;
                            quiz = { quiz: quiz };
                            updateQuiz(quiz, item);
                        },
                    },
                ]
            );
            return;
        }
        deleteQuestion(item);
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
                        question: text[itr],
                        options: [
                            text[itr + 1],
                            text[itr + 2],
                            text[itr + 3],
                            text[itr + 4],
                        ],
                        answer: "",
                        _id: makeid(10),
                        isEditing: false,
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
            // setSelectedCategory(-1);
            setDescription("");
        } else {
            showGeneralError(
                "Error!",
                "There was a problem in creating this quiz"
            );
        }
    };

    const addQuestionsAndUpdateQuiz = async () => {
        let newQuestions = questions.filter((ques) => !ques.isEditing);
        addQuestionsRequest(newQuestions, (array) => {
            let quiz = route.params.quiz;
            quiz.name = quizName;
            let oldQuestions = questions.filter((ques) => ques.isEditing);
            oldQuestions = oldQuestions.map((ques) => ques._id);
            quiz.questions = [...oldQuestions, ...array];
            quiz.descriptions = description;
            quiz.typeOfQuiz = selectedCategory;
            quiz.isPublic = toggleValue;
            quiz = { quiz: quiz };
            updateQuizRequest(quiz, (json) => {
                if (json["Message"] == undefined) {
                    showGeneralError("Success", "Quiz Successfully updated!");
                    navigation.pop();
                    return;
                }
                showGeneralError(
                    "Error",
                    "There was a problem updating this quiz"
                );
            });
        });
    };

    const createQuiz = () => {
        let noProb = true;
        if (quizName == "" || selectedCategory == -1) {
            noProb = false;
        }
        questions.forEach((question) => {
            if (
                question.ques == "" ||
                question.options[0] == "" ||
                question.options[1] == "" ||
                question.options[2] == "" ||
                question.options[3] == "" ||
                question.answer == ""
            ) {
                noProb = false;
            }
        });
        if (noProb) {
            if (route.params != null && route.params.quiz != undefined) {
                addQuestionsAndUpdateQuiz();
                return;
            }
            let json = { name: quizName };
            json["questions"] = questions;
            json["description"] = description;
            json["typeOfQuiz"] = selectedCategory;
            json["isPublic"] = toggleValue;
            json = { quiz: json };
            addQuiz(json, createQuizCallback);
        } else {
            showGeneralError(
                "Error!",
                "One of the questions either has an empty field or the answer has not been selected"
            );
        }
    };
    return (
        <SafeAreaView style={styles.container}>
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
                keyExtractor={(item) => item._id}
                contentContainerStyle={{ padding: 10 }}
                ListEmptyComponent={() => (
                    <View
                        style={{
                            alignItems: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>No questions yet</Text>
                    </View>
                )}
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
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 5,
                        alignItems: "center",
                    }}
                >
                    <DropDownPicker
                        items={categories}
                        containerStyle={{
                            height: 40,
                            zIndex: 10000,
                            width: "65%",
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
                        defaultValue={selectedCategory}
                    />
                    <View style={{ marginLeft: 10 }}>
                        <ToggleSwitch
                            text={{
                                on: "Public",
                                off: "Private",
                                activeTextColor: "white",
                                inactiveTextColor: "#B7B8BA",
                            }}
                            textStyle={{ fontWeight: "bold" }}
                            color={{
                                indicator: "white",
                                active: "rgba(32, 193, 173, 1)",
                                inactive: "rgba( 247, 247, 247, 1)",
                                activeBorder: "#41B4A4",
                                inactiveBorder: "#E9E9E9",
                            }}
                            active={toggleValue}
                            disabled={false}
                            width={60}
                            radius={25}
                            onValueChange={setToggleValue}
                        />
                    </View>
                </View>
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
                        {buttonText}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
