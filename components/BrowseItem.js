import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import QuizItem from './subcomponents/QuizItem';

const itemClicked = (item) => {
    console.log(item);
}

export default function BrowseItem({route, data}) {
    const [quizList, setQuizList] = useState(route.params.items);
    return(
        <ScrollView>
            <FlatList data={quizList} renderItem={({item}) => <QuizItem item={item} quizClicked={itemClicked}></QuizItem>}></FlatList>
        </ScrollView>
    );
}