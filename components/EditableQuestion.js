import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useState } from "react/cjs/react.development";
export default function EditableQuestion({ item }) {
    // console.log("item: ", item);
    const [question, setQuestion] = useState(item.ques);
    const [option1, setOption1] = useState(item.option1);
    const [option2, setOption2] = useState(item.option2);
    const [option3, setOption3] = useState(item.option3);
    const [option4, setOption4] = useState(item.option4);
    return (
        <View style={styles.container}>
            <TextInput placeholder="Question" value={question} />
            <TextInput placeholder="Option 1" value={option1} />
            <TextInput placeholder="Option 2" value={option2} />
            <TextInput placeholder="Option 3" value={option3} />
            <TextInput placeholder="Option 4" value={option4} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
    },
});
