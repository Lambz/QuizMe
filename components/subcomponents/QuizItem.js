import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { getRandomImage } from "../../Utils";
import { BlurView } from "expo-blur";
const windowWidth = Dimensions.get("window").width;
export default function QuizItem({
    item,
    quizClicked,
    moveToChallengers,
    isLoggedIn,
}) {
    console.log("item: ", item);
    const showChallengeButton = () => {
        if (isLoggedIn) {
            return (
                <TouchableOpacity
                    style={{
                        paddingVertical: 5,
                        borderColor: "#a6efce",
                        borderWidth: 2,
                        borderRadius: 10,
                        paddingHorizontal: 20,
                    }}
                    onPress={() => moveToChallengers(item)}
                >
                    <Text
                        style={{
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: 16,
                        }}
                    >
                        Challenge
                    </Text>
                </TouchableOpacity>
            );
        }
    };

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
            <BlurView intensity={96} style={styles.nonBlurredContent}>
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 20,
                        fontWeight: "bold",
                    }}
                >
                    {item.name}
                </Text>
                {showChallengeButton()}
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
        bottom: 0,
        width: "100%",
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
