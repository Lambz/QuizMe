import { useFocusEffect } from "@react-navigation/core";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from "react-native";
import {
    logoutUser,
    loginUserRequest,
    signUpUserRequest,
    getCurrentUserRequest,
} from "../networking/DatabaseCommunications";
import { getCookies, showGeneralError } from "../Utils";
import Login from "./subcomponents/Login";
import SignUp from "./subcomponents/SignUp";
export default function UserTab({ route }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [login, setLogin] = useState(true);
    const [username, setUsername] = useState("");

    const checkForLoggedIn = async () => {
        let cookies = await getCookies();
        if (cookies != null) {
            setLoggedIn(true);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            route.params.changeHeader("User Tab", null, false);
            checkForLoggedIn();
            getCurrentUserRequest((json) => {
                if (json != null) {
                    setUsername(json.name);
                    return;
                }
                setUsername("");
            });
            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );

    const toggleLogin = () => {
        setLogin(!login);
    };

    const loginUser = (email, password) => {
        // console.log("loginUser: ", email, password);
        loginUserRequest(email, password, (response) => {
            if (response) {
                setLoggedIn(true);
                return;
            }
            showGeneralError("Error!", "There was problem while logging in!");
        });
    };

    const logoutHandler = () => {
        logoutUser(() => {
            setLoggedIn(false);
            setLogin(true);
            setUsername("");
        });
    };

    const signUpUser = (name, email, password) => {
        signUpUserRequest(name, email, password, (response) => {
            if (response) {
                setLoggedIn(true);
                return;
            }
            showGeneralError("Error!", "There was problem while Signing up!");
        });
    };

    const moveToMyQuizes = () => {
        route.params.moveTo("Quizes");
    };

    const moveToChallengesSent = () => {
        route.params.moveTo("ChallengesSent");
    };

    const displayProperInfo = () => {
        if (isLoggedIn) {
            return (
                <View
                    style={{
                        marginTop: 40,
                        width: "85%",
                        overflow: "hidden",
                    }}
                >
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 20,
                            marginBottom: 20,
                        }}
                    >
                        Hello {username}!
                    </Text>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                backgroundColor: "#a6efce",
                                borderRadius: 10,
                                width: "46%",
                            }}
                            onPress={moveToMyQuizes}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                            >
                                My Quizes
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                paddingVertical: 10,
                                borderColor: "#a6efce",
                                borderWidth: 2,
                                borderRadius: 10,
                                width: "46%",
                            }}
                            onPress={moveToChallengesSent}
                        >
                            <Text style={{ textAlign: "center", fontSize: 16 }}>
                                Challenges Sent
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            backgroundColor: "#a6efce",
                            borderRadius: 25,
                            paddingHorizontal: 50,
                            marginTop: 10,
                        }}
                        onPress={logoutHandler}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                fontSize: 20,
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            if (login) {
                return (
                    <Login toggleLogin={toggleLogin} loginUser={loginUser} />
                );
            } else {
                return (
                    <SignUp toggleLogin={toggleLogin} signUpUser={signUpUser} />
                );
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
        >
            <View
                style={{
                    shadowColor: "#aaaaaa",
                    shadowOpacity: 0.4,
                    shadowOffset: {
                        width: 1,
                        height: 1,
                    },
                }}
            >
                <Image
                    source={require("../assets/logo.png")}
                    style={{
                        height: 200,
                        width: 200,
                        borderRadius: 10,
                    }}
                />
                <Text style={{ textAlign: "center", marginTop: 10 }}>
                    Sharpen Your brain by Quizes
                </Text>
            </View>
            {displayProperInfo()}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
});
