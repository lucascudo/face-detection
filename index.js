// Imports the Google Cloud client libraries
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs face detection on the gcs file
async function detectFaces(imgPath) {
    const [result] = await client.faceDetection(imgPath);
    return result.faceAnnotations;
}

function main() {
    if (!process.argv[2]) {
        console.log('Missing image path. Usage: node indexjs <IMAGE_URL>');
        return;
    }
    console.log('Faces:');
    detectFaces(process.argv[2]).then((faces, i) => faces.forEach((face, i) => {
        console.log(`  Face #${i + 1}:`);
        console.log(`    Joy: ${face.joyLikelihood}`);
        console.log(`    Anger: ${face.angerLikelihood}`);
        console.log(`    Sorrow: ${face.sorrowLikelihood}`);
        console.log(`    Surprise: ${face.surpriseLikelihood}`);
    }));
}

main();