import { NativeModules } from "react-native";
import { clearCookies, getCookies, storeSetCookies } from "../Utils";
const Networking = NativeModules.Networking;

const API_LINK = "http://localhost:3000";

export const addQuiz = async (quiz, callback) => {
    let json = await postRequest(`${API_LINK}/quiz/add`, quiz);
    console.log("addQuiz json: ", json);
    callback(json);
};

export const fetchAllQuizes = async (callback) => {
    let json = await fetchRequest(`${API_LINK}/quiz`);
    callback(json);
};

export const logoutUser = async (callback) => {
    await fetchRequest(`${API_LINK}/auth/logout`);
    await clearCookies();
    callback();
};

export const sendResultRequest = async (data) => {
    let json = await postRequest(`${API_LINK}/quiz/played`, data);
    console.log("sendResultRequest: ", json);
};

export const getQuizesByUser = async (callback) => {
    let json = await fetchRequest(`${API_LINK}/quiz/get`);
    callback(json);
};

export const loginUserRequest = async (email, password, callback) => {
    let data = { email: email, password: password };
    const response = await fetch(`${API_LINK}/auth/login`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    let json = await response.json();
    if (json._id != undefined) {
        storeSetCookies(response.headers);
        callback(true);
        return;
    }
    callback(false);
};

export const signUpUserRequest = async (name, email, password, callback) => {
    let data = { name: name, email: email, password: password };
    const response = await fetch(`${API_LINK}/auth/signup`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    let json = await response.json();
    // console.log()
    // if (json._id != undefined) {
    //     storeSetCookies(response.headers);
    //     callback(true);
    //     return;
    // }
    // callback(false);
    if (json.Message != undefined) {
        loginUserRequest(email, password, callback);
        return;
    }
    callback(false);
};

async function fetchRequest(url = "") {
    console.log("Fetch Request: ", url);
    let cookie = await getCookies();
    // Default options are marked with *
    const response = await fetch(url, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

async function postRequest(url = "", data = {}) {
    console.log("Post Request: ", url, data);
    await Networking.clearCookies((cleared) => {
        console.debug("cleared hadCookies: " + cleared.toString());
        // ApiUtils.login(your_login_params); // call your login function
    });
    // await Networking.clearCookies();
    let cookie = await getCookies();
    console.log("cookie: ", cookie);
    const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
            "Content-Type": "application/json",
            Cookie: cookie,
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
