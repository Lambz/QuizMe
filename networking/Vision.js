import * as ImageManipulator from "expo-image-manipulator";

const API_KEY = "AIzaSyBSKKQczG_gV9htzddh2eU-K6pgJPD5SLA";
const API_URL = `https://us-vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

export async function detect(image, callback) {
    const manipResult = await ImageManipulator.manipulateAsync(image, [], {
        compress: 0.75,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
    });
    // console.log("going to pring base64");
    // console.log("base64: ", manipResult["base64"]);
    const body = {
        requests: [
            {
                image: {
                    content: manipResult.base64,
                },
                features: [
                    {
                        type: "TEXT_DETECTION",
                        maxResults: 1,
                    },
                ],
            },
        ],
    };

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log(
        "callGoogleVisionAsync -> result",
        JSON.stringify(result.responses[0].fullTextAnnotation.text)
    );
    callback(result.responses[0].fullTextAnnotation.text);
}
