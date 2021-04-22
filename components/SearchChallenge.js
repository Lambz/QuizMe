import React, { useState } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { SearchBar } from "react-native-elements";
import { fetchAllQuizes } from '../networking/DatabaseCommunications';
import { QuizItem } from './subcomponents/QuizItem';

export default function({route, navigation}) {
    const [quizzes, setQuizzes] = useState([]);

    useFocusEffect(
        React.useCallback(() => {
            fetchAllQuizes((data) => {
                setQuizzes(data);
            })
        }, [])
    )

    const itemClicked = (item) => {
        
    }

    const emptyQuiz = () => {
        return(
            <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>No quizzes available</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <SearchBar
                placeholder="Search Quizzes"
                value={searchText}

            />
            <FlatList data={quizzes} renderItem={({item}) => (
                <QuizItem item={item} quizClicked={itemClicked}></QuizItem>
            )} ListEmptyComponent={emptyQuiz}></FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    emptyList: {
        textAlign: "center"
    },
    emptyListText: {
        fontSize: 22,
        textAlign: "center"
    }
})