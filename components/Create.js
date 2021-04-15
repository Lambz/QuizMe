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
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { detect } from "../networking/Vision";
import EditableQuestion from "./EditableQuestion";
import { makeid } from "../Utils";
import { useFocusEffect } from "@react-navigation/core";
export default function Create({ route }) {
    const [questions, setQuestions] = useState([]);
    // console.log("route: ", route);

    const addEmptyQuestion = () => {
        let newQues = {
            ques: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            selectedIndex: 0,
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

    const setSelection = (id, index) => {
        setQuestions((allQuestions) => {
            allQuestions = allQuestions.map((ques) => {
                if (ques.id == id) {
                    ques.selectedIndex = index;
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
                        selectedIndex: 0,
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
    return (
        <View style={styles.container}>
            {/* <Text>Open up App.js to start working on your app!</Text>
            <Button title="Scan" onPress={showOptionsAlert} /> */}
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
                <TouchableOpacity
                    style={{
                        padding: 10,
                        backgroundColor: "#007AFF",
                        borderRadius: 10,
                    }}
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
