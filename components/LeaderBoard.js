import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { getDashBoard } from "../networking/DatabaseCommunications";
import { getBadgeForGames } from "../Utils";

export default function LeaderBoard({ route }) {
    const [dashboard, setDashboard] = useState([]);

    const userDetails = (item) => {
        route.params.moveTo("SearchChallenge", {
            id: item.id,
            name: item.user,
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            route.params.changeHeader("Leaderboard", null, false);
            getDashBoard((data) => {
                let dashboardData = [];
                data.forEach((val) => {
                    dashboardData.push({
                        score: val.score,
                        gamesPlayed: val.gamesPlayed,
                        user: val.user.name,
                        id: val.user._id,
                    });
                });
                dashboardData.sort((a, b) => (a.score > b.score ? -1 : 1));
                setDashboard(dashboardData);
                dashboardData = data;
                // console.log(data);
            });
        }, [])
    );
    return (
        <View style={styles.container}>
            <View style={styles.listContainer}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../assets/leaderboard.jpg")}
                ></Image>
                <Text style={styles.header}>User Rankings</Text>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../assets/leaderboard.jpg")}
                ></Image>
            </View>
            <View style={styles.listContainer}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Badge</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rank</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>User</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Games</Text>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Score</Text>
            </View>
            <FlatList
                style={styles.cardContainer}
                data={dashboard}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={styles.listStyle}
                        onPress={() => userDetails(item)}
                    >
                        <View style={styles.listContainer}>
                            <Image
                                source={getBadgeForGames(item.gamesPlayed)}
                                style={{
                                    resizeMode: "contain",
                                }}
                                width={35}
                                height={35}
                            />
                            <Text>{index + 1}</Text>
                            <Text>{item.user}</Text>
                            <Text>{item.gamesPlayed}</Text>
                            <Text>{item.score}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            ></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FFEE",
        paddingTop: 50,
        paddingHorizontal: 10,
    },
    header: {
        margin: 5,
        fontWeight: "bold",
        fontSize: 33,
        marginBottom: 20,
    },
    listContainer: {
        marginHorizontal: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    listStyle: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 10,
        borderRadius: 10,
        margin: 5,
        minWidth: 160,
        backgroundColor: "#f8f8f8",
    },
});
