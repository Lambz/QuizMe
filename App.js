import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Quizes from "./components/Quizes";
import Create from "./components/Create";
import { View, Button } from "react-native";
import BrowseItem from "./components/BrowseItem";
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
                    name="BrowseItem"
                    component={BrowseItem}
                    // options={{ headerShown: false }}
                    options={{
                        title: "Explore",
                        headerBackTitle: "Back",
                        
                    }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}
