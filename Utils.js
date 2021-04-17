import SetCookieParser from "set-cookie-parser";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    require("./assets/1.jpg"),
    require("./assets/2.jpg"),
    require("./assets/3.jpg"),
    require("./assets/4.jpeg"),
    require("./assets/5.jpg"),
    require("./assets/6.jpg"),
];

export const getRandomImage = () => {
    return images[getRandomInt(0, images.length - 1)];
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
    let set_cookies = await AsyncStorage.getItem("cookie");
    // console.log(
    //     "set_cookies: ",
    //     set_cookies,
    //     Array.isArray(JSON.parse(set_cookies)),
    //     typeof JSON.parse(set_cookies)
    // );
    if (set_cookies) {
        set_cookies = JSON.parse(set_cookies);
        // let cookies_to_send = set_cookies
        //     .map((cookie) => {
        //         // console.log("cookie: ", cookie);
        //         const parsed_cookie = SetCookieParser.parse(cookie);
        //         console.log("parsed_cookie: ", parsed_cookie);
        //         return `${parsed_cookie[0].name}=${parsed_cookie[0].value}`;
        //     })
        //     .join("; ");
        let parsed_cookie = SetCookieParser.parse(set_cookies[0]);
        let cookies_to_send = `${parsed_cookie[0].name}=${parsed_cookie[0].value}; express:sess.sig=${parsed_cookie[0]["httponly, express:sess.sig"]}`;
        return cookies_to_send;
    } else {
        null;
    }
};
