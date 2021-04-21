import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Button,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { getDate, getDay, getMonth, getYear } from "../../Utils";

export default function ResultItem({ item, moveToQuiz }) {
    const showInLeaderboard = () => {
        if (item.rank != -1) {
            return (
                <Text style={{ marginTop: 5, fontWeight: "bold" }}>
                    Rank in LeaderBoard: {item.rank}
                </Text>
            );
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    backgroundColor: "#fff",
                    padding: 10,
                    borderRadius: 10,
                    width: "85%",
                }}
                onPress={() => moveToQuiz(item.quiz)}
            >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                    {item.quiz.name.toUpperCase()}
                </Text>
                <Text>Score: {item.score}</Text>
                {showInLeaderboard()}
                <Text>Leaderboard:</Text>
                <FlatList
                    data={item.quiz.max_scores}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text>{item.playedBy.name}</Text>
                            <Text>{item.score}</Text>
                        </View>
                    )}
                    style={{
                        backgroundColor: "#e5ad58",
                        marginLeft: 20,
                        padding: 10,
                        borderRadius: 10,
                    }}
                    ListEmptyComponent={() => (
                        <Text style={{ margin: 20 }}>LeaderBoard Empty</Text>
                    )}
                    ListHeaderComponent={() => (
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>User</Text>
                            <Text style={{ fontWeight: "bold" }}>Score</Text>
                        </View>
                    )}
                />
            </TouchableOpacity>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 5,
                }}
            >
                <Text style={[styles.whitetext]}>{getDay(item.createdAt)}</Text>
                <Text style={[styles.whitetext]}>
                    {getMonth(item.createdAt)}
                </Text>
                <Text
                    style={[
                        styles.whitetext,
                        { fontWeight: "bold", fontSize: 34 },
                    ]}
                >
                    {getDate(item.createdAt)}
                </Text>
                <Text style={[styles.whitetext]}>
                    {getYear(item.createdAt)}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        flexDirection: "row",
    },
    whitetext: {
        color: "#fff",
    },
});
