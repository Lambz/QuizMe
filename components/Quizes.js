import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
export default function Quizes({ navigation, route }) {
    const [quizes, setQuizes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    if (isLoading) {
        //TODO: Fetch Quizes
        setLoading(false);
    }

    const showEmptyComponent = () => {
        return (
            <View
                style={{
                    alignItems: "center",
                    marginTop: 20,
                }}
            >
                <Text style={{ fontSize: 20 }}>You have no quizes</Text>
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={quizes}
                renderItem={({ item }) => console.log(item)}
                keyExtractor={(item) => item._id}
                ListEmptyComponent={showEmptyComponent}
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
