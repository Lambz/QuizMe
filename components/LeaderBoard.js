import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from "react-native";
import { getDashBoard } from '../networking/DatabaseCommunications';

export default function LeaderBoard({route, navigation}) {
    const [dashboard, setDashboard] = useState([]);
    useEffect(
        React.useCallback(() => {
            getDashBoard((data) => {
                setDashboard(data);
            })
        }, [])
    );
    return(
        <ScrollView>
            <FlatList data={dashboard} renderItem={({item}) => (
                <View><Text>{item.user}</Text></View>
            )}></FlatList>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

});