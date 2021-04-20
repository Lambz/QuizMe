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
    searchUserRequest,
    sendChallengeRequest,
} from "../networking/DatabaseCommunications";

export default function SendChallenge({ navigation, route }) {
    // console.log("route.params: ", route.params);
    const [searchText, setSearchText] = useState("");
    const [users, setUsers] = useState([]);
    const updateSeachText = (text) => {
        if (text == "") {
            setUsers([]);
        } else {
            searchUserRequest({ text: text }, (json) => {
                console.log("result: ", json);
                setUsers(json);
            });
        }
        setSearchText(text);
    };
    const emptyHandler = () => {
        let text = "Search for a user";
        if (searchText == "") {
            text = "Search for a user";
        } else {
            text = "No user found";
        }
        return (
            <View style={{ margin: 20 }}>
                <Text style={{ textAlign: "center", fontSize: 20 }}>
                    {text}
                </Text>
            </View>
        );
    };

    const sendRequest = (challengee) => {
        let data = { quiz: route.params.quiz._id, challengee: challengee._id };
        sendChallengeRequest(data, (response) => {
            console.log("sendRequest response: ", response);
        });
    };

    const sendRequestConfirm = (challengee) => {
        Alert.alert(
            "Send Request",
            "Are you sure you want to send the request?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                { text: "Send", onPress: () => sendRequest(challengee) },
            ]
        );
    };
    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Search User"
                onChangeText={updateSeachText}
                value={searchText}
                platform="ios"
            />
            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ddd",
                        }}
                        onPress={() => sendRequestConfirm(item)}
                    >
                        <Text>{item.name}</Text>
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
