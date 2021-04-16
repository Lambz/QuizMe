import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Home";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Feather, Ionicons } from "@expo/vector-icons";
import UserTab from "./UserTab";
import Browse from "./Browse";
import Create from "./Create";

const Tab = createBottomTabNavigator();
export default function Dashboard({ navigation }) {
    const changeHeader = (name, items) => {
        // console.log(items);
        navigation.setOptions({ title: name, headerRight: () => items });
    };
    const moveTo = (name, params) => {
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
                    // initialParams={{
                    //     stackMoveCallback: stackMoveCallback,
                    //     setFocusFunction: setFocusFunction,
                    //     deRegisterFocus: deRegisterFocus,
                    // }}
                    options={{
                        tabBarLabel: "Browse",
                        tabBarIcon: ({ color, size }) => (
                            <Feather name="box" size={size} color={color} />
                        ),
                    }}
                />

                <Tab.Screen
                    name="Create"
                    component={Create}
                    initialParams={{ changeHeader: changeHeader }}
                    options={{
                        tabBarLabel: "Create",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="create-outline"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="UserTab"
                    component={UserTab}
                    // initialParams={{ stackMoveCallback: stackMoveCallback }}
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
