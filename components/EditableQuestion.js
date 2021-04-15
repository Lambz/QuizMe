import React from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
import { AntDesign } from "@expo/vector-icons";
export default function EditableQuestion({
    item,
    setQ,
    setOp1,
    setOp2,
    setOp3,
    setOp4,
    setSelection,
    deleteItem,
}) {
    const [selectedIndex, setSelectedIndex] = useState(item.answer);
    const [question, setQuestion] = useState(item.ques);
    const [option1, setOption1] = useState(item.option1);
    const [option2, setOption2] = useState(item.option2);
    const [option3, setOption3] = useState(item.option3);
    const [option4, setOption4] = useState(item.option4);

    const updateText = (text, callback, updater) => {
        callback(item.id, text);
        updater(text);
    };

    const updateSelection = (index) => {
        setSelection(item.id, index);
        setSelectedIndex(index);
    };
    return (
        <View style={styles.container}>
            <View style={styles.fieldView}>
                <TextInput
                    style={[styles.field, styles.ques]}
                    placeholder="Question"
                    value={question}
                    onChangeText={(text) => updateText(text, setQ, setQuestion)}
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
                    onPress={() => deleteItem(item.id)}
                />
                <AntDesign
                    name={selectedIndex === 1 ? "check" : ""}
                    size={24}
                    color="green"
                    onPress={() => updateSelection(1)}
                />
                <AntDesign
                    name={selectedIndex === 2 ? "check" : ""}
                    size={24}
                    color="green"
                    onPress={() => updateSelection(2)}
                />
                <AntDesign
                    name={selectedIndex === 3 ? "check" : ""}
                    size={24}
                    color="green"
                    onPress={() => updateSelection(3)}
                />
                <AntDesign
                    name={selectedIndex === 4 ? "check" : ""}
                    size={24}
                    color="green"
                    onPress={() => updateSelection(4)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        flexDirection: "row",
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
