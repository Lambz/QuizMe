import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { getRandomImage } from "../Utils";
import { BlurView } from "expo-blur";
const windowWidth = Dimensions.get("window").width;
export default function QuizItem({ item, quizClicked }) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => quizClicked(item)}
        >
            <Image
                source={getRandomImage(item.typeOfQuiz)}
                style={{
                    resizeMode: "cover",
                    height: 250,
                    width: windowWidth - 20,
                    borderRadius: 10,
                    backgroundColor: "#0000ff",
                }}
            ></Image>
            <BlurView
                intensity={97}
                style={[
                    StyleSheet.absoluteFillObject,
                    styles.nonBlurredContent,
                ]}
            >
                <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                >
                    {item.name}
                </Text>
            </BlurView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
        maxHeight: 300,
        borderRadius: 10,
        overflow: "hidden",
    },
    nonBlurredContent: {
        maxHeight: 150,
        position: "absolute",
        top: 150,
        padding: 10,
    },
});
