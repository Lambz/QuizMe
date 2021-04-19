import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { showGeneralError } from "../../Utils";
import * as Crypto from "expo-crypto";
export default function Login({ toggleLogin, loginUser }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async () => {
        if (email == "" || password == "") {
            showGeneralError("Error!", "Email and Password cannot be empty!");
            return;
        }
        const digest = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA512,
            password
        );
        loginUser(email, digest);
        // console.log("Digest: ", digest);
    };
    return (
        <View
            style={{
                marginTop: 20,
                width: "70%",
            }}
        >
            <View style={styles.searchSection}>
                <MaterialIcons
                    style={styles.searchIcon}
                    name="email"
                    size={20}
                    color="#a6efce"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                    underlineColorAndroid="transparent"
                    value={email}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.searchSection}>
                <MaterialIcons
                    style={styles.searchIcon}
                    name="lock-outline"
                    size={20}
                    color="#a6efce"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    underlineColorAndroid="transparent"
                    value={password}
                />
            </View>
            <TouchableOpacity
                style={{
                    marginTop: 20,
                    backgroundColor: "#a6efce",
                    paddingVertical: 10,
                    borderRadius: 10,
                    marginHorizontal: 20,
                }}
                onPress={loginHandler}
            >
                <Text
                    style={{
                        textAlign: "center",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: 20,
                    }}
                >
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ marginTop: 10 }} onPress={toggleLogin}>
                <Text style={{ textAlign: "center" }}>
                    Not a user? Click here
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    searchSection: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderColor: "#a6efce",
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 20,
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        width: "100%",
        color: "#424242",
    },
});
