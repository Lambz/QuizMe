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
