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
} from "../networking/DatabaseCommunications";

export default function Challenges({ navigation, route }) {
    // const [isLoading, setLoading] = useState(true);
    const [challenges, setChallenges] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            getInvitesRequest((response) => {
                // console.log("response: ", response);
                if (response != null) {
                    setChallenges(response);
                }
            });

            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );

    const emptyHandler = () => {
        return (
            <View style={{ margin: 20 }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                    No Challenges Recieved
                </Text>
            </View>
        );
    };

    const acceptHandler = (item) => {
        // acceptInviteRequest(item._id);
        console.log({ quiz: item.quiz });
        navigation.navigate("Quiz", { quiz: item.quiz });
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={challenges}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View
                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <View>
                            <Text style={{ fontSize: 18 }}>
                                {item.quiz.name}
                            </Text>
                            <Text style={{ fontSize: 14, color: "#444" }}>
                                From: {item.from.name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                borderColor: "#a6efce",
                                borderWidth: 2,
                                paddingVertical: 5,
                                paddingHorizontal: 20,
                                borderRadius: 10,
                            }}
                            onPress={() => acceptHandler(item)}
                        >
                            <Text style={{ fontSize: 16 }}>Accept</Text>
                        </TouchableOpacity>
                    </View>
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
