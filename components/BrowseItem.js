import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import QuizItem from './subcomponents/QuizItem';

export default function BrowseItem({route, navigation}) {
    const [quizList, setQuizList] = useState(route.params.items);

    const itemClicked = (item) => {
        navigation.navigate('QuizDetail', {quiz: item});
    }

    const emptyQuiz = () => {
        return(
            <View style={styles.emptyList}>
                <Text style={styles.emptyListText}>No quiz for this category</Text>
            </View>
        )
    }
    return(
        <ScrollView style={styles.container}>
            <FlatList data={quizList} renderItem={({item}) => <QuizItem item={item} quizClicked={itemClicked}></QuizItem>}
            ListEmptyComponent={emptyQuiz}></FlatList>
        </ScrollView>
    );
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