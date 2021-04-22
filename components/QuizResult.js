import React, { useState } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from "react-native";

export default function QuizResult({route, navigation}) {
    return(
        <View>
            <Text>Quiz finished</Text>
            <Text>No of questions: {route.params.quiz.totalQuestions}</Text>
            <Text>Your Score: {route.params.quiz.score}</Text>
            <TouchableOpacity>
                <Text>Play Again</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
    )
}