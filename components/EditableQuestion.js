import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { AntDesign } from "@expo/vector-icons";
import { updateQuestionRequest } from "../networking/DatabaseCommunications";
export default function EditableQuestion({
    item,
    setQ,
    setOp1,
    setOp2,
    setOp3,
    setOp4,
    setSelection,
    deleteItem,
    isEditing,
}) {
    const [selectedIndex, setSelectedIndex] = useState(item.answer);
    const [question, setQuestion] = useState(item.question);
    const [option1, setOption1] = useState(item.options[0]);
    const [option2, setOption2] = useState(item.options[1]);
    const [option3, setOption3] = useState(item.options[2]);
    const [option4, setOption4] = useState(item.options[3]);

    const updateText = (text, callback, updater) => {
        callback(item._id, text);
        updater(text);
    };

    const updateSelection = (option) => {
        setSelection(item._id, option);
        setSelectedIndex(option);
    };

    const updateHandler = () => {
        item.question = question;
        item.options = [option1, option2, option3, option4];
        item.answer = selectedIndex;
        updateQuestionRequest(item, (json) => {
            console.log(json);
        });
    };
    const displayUpdate = () => {
        if (item.isEditing) {
            return (
                <TouchableOpacity
                    style={{
                        borderColor: "#007AFF",
                        borderWidth: 2,
                        borderRadius: 10,
                        paddingVertical: 10,
                        marginTop: 10,
                        marginHorizontal: 10,
                    }}
                    onPress={updateHandler}
                >
                    <Text style={{ textAlign: "center", color: "#007AFF" }}>
                        Update
                    </Text>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.fieldView}>
                    <TextInput
                        style={[styles.field, styles.ques]}
                        placeholder="Question"
                        value={question}
                        onChangeText={(text) =>
                            updateText(text, setQ, setQuestion)
                        }
                    />
                    <TextInput
                        style={[styles.field]}
                        placeholder="Option 1"
                        value={option1}
                        onChangeText={(text) =>
                            updateText(text, setOp1, setOption1)
                        }
                    />
                    <TextInput
                        style={[styles.field]}
                        placeholder="Option 2"
                        value={option2}
                        onChangeText={(text) =>
                            updateText(text, setOp2, setOption2)
                        }
                    />
                    <TextInput
                        style={[styles.field]}
                        placeholder="Option 3"
                        value={option3}
                        onChangeText={(text) =>
                            updateText(text, setOp3, setOption3)
                        }
                    />
                    <TextInput
                        style={[styles.field]}
                        placeholder="Option 4"
                        value={option4}
                        onChangeText={(text) =>
                            updateText(text, setOp4, setOption4)
                        }
                    />
                </View>
                <View
                    style={{
                        width: "10%",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignContent: "center",
                    }}
                >
                    <AntDesign
                        name="delete"
                        size={24}
                        color="red"
                        onPress={() => deleteItem(item)}
                    />
                    <AntDesign
                        name={selectedIndex === option1 ? "check" : ""}
                        size={24}
                        color="green"
                        onPress={() => updateSelection(option1)}
                    />
                    <AntDesign
                        name={selectedIndex === option2 ? "check" : ""}
                        size={24}
                        color="green"
                        onPress={() => updateSelection(option2)}
                    />
                    <AntDesign
                        name={selectedIndex === option3 ? "check" : ""}
                        size={24}
                        color="green"
                        onPress={() => updateSelection(option3)}
                    />
                    <AntDesign
                        name={selectedIndex === option4 ? "check" : ""}
                        size={24}
                        color="green"
                        onPress={() => updateSelection(option4)}
                    />
                </View>
            </View>
            {displayUpdate()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        margin: 5,
        shadowColor: "#aaaaaa",
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        borderRadius: 17,
    },
    fieldView: {
        width: "85%",
        marginRight: "5%",
    },
    field: {
        borderWidth: 1,
        borderColor: "#dddddd",
        borderRadius: 5,
        padding: 7,
        marginVertical: 5,
    },
    ques: {
        fontSize: 20,
    },
});
