//using google vision api to get image labels
async function imageLabels(imageLink) {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    // Performs label detection on the image file
    const [result] = await client.labelDetection(imageLink);
    const labels = result.labelAnnotations;
    const labelDescription = [];
    labels.forEach(label => labelDescription.push(label.description.toLowerCase()));
    return labelDescription;
}

module.exports = { imageLabels };