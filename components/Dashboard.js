import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import UserTab from "./UserTab";
import Browse from "./Browse";
import Create from "./Create";
import LeaderBoard from "./LeaderBoard";

const Tab = createBottomTabNavigator();
export default function Dashboard({ navigation }) {
    const changeHeader = (name, items, headerShown = true) => {
        // console.log(items);
        navigation.setOptions({
            title: name,
            headerRight: () => items,
            headerShown: headerShown,
        });
        // navigation.setOptions({ headerShown: false });
    };
    const moveTo = (name, params = null) => {
        navigation.navigate(name, params);
    };
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    initialParams={{
                        changeHeader: changeHeader,
                        moveTo: moveTo,
                    }}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="home"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Browse"
                    component={Browse}
                    initialParams={{
                        changeHeader: changeHeader,
                        moveTo: moveTo,
                    }}
                    options={{
                        tabBarLabel: "Browse",
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="box" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="LeaderBoard"
                    component={LeaderBoard}
                    initialParams={{ 
                        changeHeader: changeHeader,
                        moveTo: moveTo,
                    }}
                    options={{
                        tabBarLabel: "LeaderBoard",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name="leaderboard"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="UserTab"
                    component={UserTab}
                    initialParams={{
                        changeHeader: changeHeader,
                        moveTo: moveTo,
                    }}
                    options={{
                        tabBarLabel: "User",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-circle-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
