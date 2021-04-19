import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/core";

const metricsClicked = function(id) {
    console.log(id);
    switch(id) {
        case 0: break;
        case 1: break;
        case 2: break; 
    }
}

const generateRandomColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

export default function Browse({route}) {
    useFocusEffect(
        React.useCallback(() => {
            route.params.changeHeader("Browse", null);
            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Discover your next Quiz
            </Text>
            <View style={styles.metrics}>
                <TouchableOpacity style={[styles.colorOne, styles.metricsView]} onPress={() => metricsClicked(0)}>
                        <View>
                            <Text style={styles.metricsText}>Trending</Text>
                        </View>
                    </TouchableOpacity>
                <TouchableOpacity style={[styles.metricsView, styles.colorTwo]} onPress={() => metricsClicked(1)}>
                    <View>
                        <Text style={styles.metricsText}>Popular</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.metricsView, styles.colorThree]} onPress={() => metricsClicked(2)}>
                    <View>
                        <Text style={styles.metricsText}>Recently Added</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
            <Text style={styles.category}>
                Browse by Category
            </Text>
            <FlatList></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    headerText: {
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 20,
        padding: 5
    },
    metrics: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginBottom: 20
    },
    metricsView: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 20,
        borderRadius: 10,
        margin: 5,
        minWidth: 160
    },
    metricsText: {
        marginHorizontal: 30,
        fontWeight: "bold"
    },
    colorOne: {
        backgroundColor: "#ff6f52"
    },
    colorTwo: {
        backgroundColor: "#fff700"
    },
    colorThree: {
        backgroundColor: "#15f2fd"
    },
    category: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        padding: 5
    }
});
