import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Quizes from "./components/Quizes";
import Create from "./components/Create";
import { View, Button } from "react-native";
import BrowseItem from "./components/BrowseItem";
import ImportQuestions from "./components/ImportQuestions";
import SendChallenge from "./components/SendChallenge";
import Challenges from "./components/Challenges";
import QuizDetail from "./components/QuizDetail";
import ChallengesSent from "./components/ChallengesSent";
import Results from "./components/Results";
import QuizResult from "./components/QuizResult";
import SearchChallenge from "./components/SearchChallenge";
const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="dashboard"
                    component={Dashboard}
                    // options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Quiz"
                    component={Quiz}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Quizes"
                    component={Quizes}
                    // options={{ headerShown: false }}
                    options={{ title: "My Quizes", headerBackTitle: "Back" }}
                />

                <Stack.Screen
                    name="Create"
                    component={Create}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Create a new Quiz",
                        headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="ImportQuestions"
                    component={ImportQuestions}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Import Questions",
                        // headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="SendChallenge"
                    component={SendChallenge}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Challenge",
                        // headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="Challenges"
                    component={Challenges}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Challenges",
                        // headerBackTitle: "Back",
                    }}
                />

                <Stack.Screen
                    name="BrowseItem"
                    component={BrowseItem}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Explore",
                        headerBackTitle: "Back",
                    }}
                />

                <Stack.Screen
                    name="QuizDetail"
                    component={QuizDetail}
                    // options={{ headerShown: false }}
                    options={{
                        title: "About Challenge",
                        headerBackTitle: "Back",
                    }}
                />
                <Stack.Screen
                    name="ChallengesSent"
                    component={ChallengesSent}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Challenges Sent",
                        headerBackTitle: "Back",
                    }}
                />

                <Stack.Screen
                    name="Results"
                    component={Results}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Your Results",
                        headerBackTitle: "Back",
                    }}
                />

                <Stack.Screen
                    name="QuizResult"
                    component={QuizResult}
                    // options={{ headerShown: false }}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="SearchChallenge"
                    component={SearchChallenge}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Search Quiz",
                        headerBackTitle: "Back",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
