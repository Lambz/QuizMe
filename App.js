import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import AuthScreen from "./containers/AuthScreen";
const Stack = createStackNavigator();
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Auth"
                    component={AuthScreen}
                    options={{ headerShown: false }}
                />
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
