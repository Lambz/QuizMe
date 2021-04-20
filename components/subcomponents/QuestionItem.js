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
} from "react-native";

export default function QuestionItem({ item, addQuestion, removeQuestion }) {
    const [isSelected, setSelected] = useState(false);
    const selectionHandler = () => {
        if (isSelected) {
            removeQuestion(item);
        } else {
            addQuestion(item);
        }
        setSelected(!isSelected);
    };
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: isSelected ? "#eee" : "#fff" },
            ]}
            onPress={selectionHandler}
        >
            <Text style={{ fontSize: 18 }}>{item.question}</Text>
            <Text>Options:</Text>
            <View style={{ marginLeft: 10 }}>
                {item.options.map((option) => (
                    <Text
                        style={{
                            fontWeight: item.answer === option ? "bold" : 0,
                            color: item.answer === option ? "#53d769" : "#000",
                        }}
                    >
                        {option}
                    </Text>
                ))}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        borderBottomColor: "#dddddd",
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
});
