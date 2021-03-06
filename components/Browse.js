import React, { useRef, useState } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    FlatList,
    ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import {
    fetchQuizForMetrics,
    fetchQuizForCategory,
} from "../networking/DatabaseCommunications";
import { getCategoriesWithImages } from "../Utils";

const { width: screenWidth } = Dimensions.get("window");
const categories = getCategoriesWithImages();
export default function Browse({ route }) {
    useFocusEffect(
        React.useCallback(() => {
            route.params.changeHeader("Browse", null, false);
            return () => {
                // route.params.deRegisterFocus();
            };
        }, [])
    );

    const carouselRef = useRef(null);
    const goForward = () => {
        carouselRef.current.snapToNext();
    };

    const imageClicked = (subcategoryIndex) => {
        fetchQuizForCategory(subcategoryIndex.index, (data) => {
            route.params.moveTo("BrowseItem", { items: data });
        });
    };

    const metricsClicked = function (id) {
        fetchQuizForMetrics(id, (data) => {
            route.params.moveTo("BrowseItem", { items: data });
        });
    };

    const renderItem = ({ item, index }, parallaxProps) => {
        console.log("renderItem: ", item);
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => imageClicked({ index })}
            >
                <ParallaxImage
                    source={item.image}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <Text style={styles.title} numberOfLines={2}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingTop: 50, paddingLeft: 10 }}
        >
            <Text style={styles.headerText}>Discover your next</Text>
            <View style={styles.metrics}>
                <TouchableOpacity
                    style={[styles.colorOne, styles.metricsView]}
                    onPress={() => metricsClicked(0)}
                >
                    <View>
                        <Text style={styles.metricsText}>Trending</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.metricsView, styles.colorTwo]}
                    onPress={() => metricsClicked(1)}
                >
                    <View>
                        <Text style={styles.metricsText}>Popular</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.metricsView, styles.colorThree]}
                    onPress={() => metricsClicked(2)}
                >
                    <View>
                        <Text style={styles.metricsText}>Recently Added</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Text style={styles.category} onPress={goForward}>
                Browse by Category
            </Text>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={categories}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 34,
        fontWeight: "bold",
        marginBottom: 20,
        padding: 5,
    },
    metrics: {
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        marginBottom: 20,
    },
    metricsView: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        padding: 20,
        borderRadius: 10,
        margin: 5,
        minWidth: 160,
    },
    metricsText: {
        marginHorizontal: 30,
        fontWeight: "bold",
    },
    colorOne: {
        backgroundColor: "#ff6f52",
    },
    colorTwo: {
        backgroundColor: "#fff700",
    },
    colorThree: {
        backgroundColor: "#15f2fd",
    },
    category: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        padding: 5,
    },
    item: {
        width: screenWidth - 100,
        height: screenWidth - 150,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: "contain",
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "darkslategray",
    },
});
