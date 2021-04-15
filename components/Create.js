import React, { useState, useEffect } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { detect } from "../networking/Vision";
import { FlatList } from "react-native-gesture-handler";
import EditableQuestion from "./EditableQuestion";
import { makeid } from "../Utils";
import { useFocusEffect } from "@react-navigation/core";
export default function Create({ route }) {
    const [questions, setQuestions] = useState([]);
    console.log("route: ", route);

    useFocusEffect(
        React.useCallback(() => {
            route.params.changeHeader("Create Quiz");
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
            <Text>Open up App.js to start working on your app!</Text>
            <Button title="Scan" onPress={showOptionsAlert} />
            <FlatList
                data={questions}
                renderItem={({ item }) => <EditableQuestion item={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
    },
});
