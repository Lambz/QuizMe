import { useFocusEffect } from "@react-navigation/core";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useState } from "react/cjs/react.development";
import { getCookies } from "../Utils";
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
        console.log("loginUser: ", email, password);
    };

    const signUpUser = () => {};

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
                    >
                        <Text style={{ textAlign: "center" }}>Logout</Text>
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
