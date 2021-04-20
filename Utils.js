import SetCookieParser from "set-cookie-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Image } from "react-native";

// let imageUriArray = [];
// import genericImage from "./assets/generic/1.jpg";
// imageUriArray.push(Image.resolveAssetSource(genericImage).uri);
// import movieImage from "./assets/movies/4.jpg";
// imageUriArray.push(Image.resolveAssetSource(movieImage).uri);
// import musicImage from "./assets/music/3.jpg";
// imageUriArray.push(Image.resolveAssetSource(musicImage).uri);
// import tvImage from "./assets/TV/3.webp";
// imageUriArray.push(Image.resolveAssetSource(tvImage).uri);
// import newsImage from "./assets/news/5.jpg";
// imageUriArray.push(Image.resolveAssetSource(newsImage).uri);
// import gamesImage from "./assets/games/1.jpg";
// imageUriArray.push(Image.resolveAssetSource(gamesImage).uri);
// import gkImage from "./assets/gk/2.jpg";
// imageUriArray.push(Image.resolveAssetSource(gkImage).uri);
// import businessImage from "./assets/business/3.png";
// imageUriArray.push(Image.resolveAssetSource(businessImage).uri);
// import sportsImage from "./assets/sports/4.jpg";
// imageUriArray.push(Image.resolveAssetSource(sportsImage).uri);
// import geographyImage from "./assets/geography/1.jpg";
// imageUriArray.push(Image.resolveAssetSource(geographyImage).uri);
// import historyImage from "./assets/history/4.jpg";
// imageUriArray.push(Image.resolveAssetSource(historyImage).uri);
// import literatureImage from "./assets/literature/4.webp";
// imageUriArray.push(Image.resolveAssetSource(literatureImage).uri);
// import religionImage from "./assets/religion/4.jpg";
// imageUriArray.push(Image.resolveAssetSource(religionImage).uri);
// import scienceImage from "./assets/science/4.jpg";
// imageUriArray.push(Image.resolveAssetSource(scienceImage).uri);

// export const imageArray = imageUriArray;

export function makeid(length) {
    var result = [];
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result.push(
            characters.charAt(Math.floor(Math.random() * charactersLength))
        );
    }
    return result.join("");
}

export const images = [
    [
        require("./assets/generic/1.jpg"),
        require("./assets/generic/2.jpg"),
        require("./assets/generic/3.jpg"),
        require("./assets/generic/4.jpeg"),
        require("./assets/generic/5.jpg"),
        require("./assets/generic/6.jpg"),
    ],
    [
        require("./assets/movies/1.jpg"),
        require("./assets/movies/2.jpg"),
        require("./assets/movies/3.jpg"),
        require("./assets/movies/4.jpg"),
    ],
    [
        require("./assets/music/1.jpg"),
        require("./assets/music/2.jpeg"),
        require("./assets/music/3.jpg"),
        require("./assets/music/4.jpg"),
        require("./assets/music/5.jpg"),
    ],
    [
        require("./assets/TV/1.jpg"),
        require("./assets/TV/2.webp"),
        require("./assets/TV/3.webp"),
    ],
    [
        require("./assets/news/1.jpg"),
        require("./assets/news/2.jpg"),
        require("./assets/news/3.jpg"),
        require("./assets/news/4.jpg"),
        require("./assets/news/5.jpg"),
    ],
    [
        require("./assets/games/1.jpg"),
        require("./assets/games/2.jpg"),
        require("./assets/games/3.jpg"),
        require("./assets/games/4.jpg"),
        require("./assets/games/5.jpg"),
    ],
    [
        require("./assets/gk/1.jpg"),
        require("./assets/gk/2.jpg"),
        require("./assets/gk/3.jpeg"),
    ],
    [
        require("./assets/business/1.jpg"),
        require("./assets/business/2.jpeg"),
        require("./assets/business/3.png"),
    ],
    [
        require("./assets/sports/1.gif"),
        require("./assets/sports/2.jpg"),
        require("./assets/sports/3.jpg"),
        require("./assets/sports/4.jpg"),
    ],
    [
        require("./assets/geography/1.jpg"),
        require("./assets/geography/2.jpg"),
        require("./assets/geography/3.jpg"),
        require("./assets/geography/4.jpeg"),
        require("./assets/geography/5.jpeg"),
    ],
    [
        require("./assets/history/1.jpg"),
        require("./assets/history/2.jpg"),
        require("./assets/history/3.jpg"),
        require("./assets/history/4.jpg"),
        require("./assets/history/5.jpg"),
    ],
    [
        require("./assets/literature/1.jpg"),
        require("./assets/literature/2.jpg"),
        require("./assets/literature/3.jpg"),
        require("./assets/literature/4.webp"),
        require("./assets/literature/5.webp"),
    ],
    [
        require("./assets/religion/1.jpg"),
        require("./assets/religion/2.jpg"),
        require("./assets/religion/3.jpeg"),
        require("./assets/religion/4.jpg"),
    ],
    [
        require("./assets/science/1.jpg"),
        require("./assets/science/2.jpg"),
        require("./assets/science/3.jpg"),
        require("./assets/science/4.jpg"),
        require("./assets/science/5.jpg"),
    ],
];

export const categories = [
    { label: "Generic", value: 0 },
    { label: "Movies", value: 1 },
    { label: "Music", value: 2 },
    { label: "TV", value: 3 },
    { label: "News & Celebrity", value: 4 },
    { label: "Toys & Games", value: 5 },
    { label: "General Knowledge", value: 6 },
    { label: "Slogan & Business", value: 7 },
    { label: "Sports", value: 8 },
    { label: "Geography", value: 9 },
    { label: "History", value: 10 },
    { label: "Literature", value: 11 },
    { label: "Religion", value: 12 },
    { label: "Science & Math", value: 13 },
];

export const getRandomImage = (index) => {
    // console.log(index);
    if (index > images.length) {
        index = getRandomInt(0, images.length - 1);
    }
    return images[index][getRandomInt(0, images[index].length - 1)];
};

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export const sounds = {
    correctAnswer: require("./assets/correct_answer.mp3"),
    wrongAnswer: require("./assets/wrong_answer.mp3"),
    winner: require("./assets/winner.mp3"),
};

export const storeSetCookies = async (headers) => {
    console.log("storeSetCookies: ", headers);
    const set_cookies = [];
    for (const [name, value] of headers) {
        if (name === "set-cookie") {
            set_cookies.push(value);
        }
    }
    console.log(set_cookies);
    await AsyncStorage.setItem("cookie", JSON.stringify(set_cookies));
};

export const getCookies = async () => {
    try {
        let set_cookies = await AsyncStorage.getItem("cookie");
        if (set_cookies) {
            set_cookies = JSON.parse(set_cookies);
            let parsed_cookie = SetCookieParser.parse(set_cookies[0]);
            let cookies_to_send = `${parsed_cookie[0].name}=${parsed_cookie[0].value}; express:sess.sig=${parsed_cookie[0]["httponly, express:sess.sig"]}`;
            return cookies_to_send;
        } else {
            return null;
        }
    } catch (error) {
        console.log("getCookies Error: ", error);
        return null;
    }
};

export const clearCookies = async () => {
    await AsyncStorage.clear();
};

export const showGeneralError = (title, message) => {
    Alert.alert(title, message, [
        {
            text: "Okay",
        },
    ]);
};
