import { useFocusEffect } from "@react-navigation/core";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {
    logoutUser,
    loginUserRequest,
    signUpUserRequest,
} from "../networking/DatabaseCommunications";
import { getCookies, showGeneralError } from "../Utils";
import Login from "./subcomponents/Login";
import SignUp from "./subcomponents/SignUp";
export default function UserTab({ route }) {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [login, setLogin] = useState(true);

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

    const displayProperInfo = () => {
        if (isLoggedIn) {
            return (
                <View
                    style={{
                        marginTop: 40,
                    }}
                >
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            borderColor: "#a6efce",
                            borderWidth: 2,
                            borderRadius: 10,
                            paddingHorizontal: 50,
                        }}
                        onPress={logoutHandler}
                    >
                        <Text style={{ textAlign: "center", fontSize: 18 }}>
                            Logout
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 10,
                            backgroundColor: "#a6efce",
                            borderRadius: 10,
                            paddingHorizontal: 50,
                            marginTop: 20,
                        }}
                        onPress={moveToMyQuizes}
                    >
                        <Text
                            style={{
                                textAlign: "center",
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 18,
                            }}
                        >
                            My Quizes
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
        <View style={styles.container}>
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
        </View>
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
