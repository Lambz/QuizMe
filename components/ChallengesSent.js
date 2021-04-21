import { useFocusEffect } from "@react-navigation/core";
import React, { useRef, useState } from "react";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    ScrollView,
    Alert,
} from "react-native";
import { SearchBar } from "react-native-elements";
import {
    getCurrentUserRequest,
    searchUserRequest,
    sendChallengeRequest,
    getInvitesRequest,
    acceptInviteRequest,
    getSentInviteRequest,
} from "../networking/DatabaseCommunications";
import { getFormatedDate } from "../Utils";

export default function ChallengesSent({ navigation, route }) {
    // const [isLoading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);
    const [isLoading, setLoading] = useState(true);
    if (isLoading) {
        getSentInviteRequest((json) => {
            setChallenges(json);
        });
        setLoading(false);
    }

    const emptyHandler = () => {
        return (
            <View style={{ margin: 20 }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                    No Challenges Sent
                </Text>
            </View>
        );
    };

    const showResult = (item) => {
        let text = "Not accepted yet";
        if (item.accepted) {
            text = `Score: ${item.score}`;
        }
        return <Text style={{ fontSize: 16 }}>{text}</Text>;
    };
    const showUpdatedOnDate = (item) => {
        if (item.accepted) {
            return <Text>Accepted on: {getFormatedDate(item.updatedAt)}</Text>;
        }
    };

    const moveToQuiz = (item) => {
        navigation.navigate("QuizDetail", { quiz: item.quiz });
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={challenges}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                        }}
                        onPress={() => moveToQuiz(item)}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View>
                                <Text
                                    style={{ fontWeight: "bold", fontSize: 18 }}
                                >
                                    {item.quiz.name}
                                </Text>
                                <Text>Sent to: {item.name}</Text>
                            </View>
                            {showResult(item)}
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text>
                                Sent on: {getFormatedDate(item.createdAt)}
                            </Text>
                            {showUpdatedOnDate(item)}
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={emptyHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
