from fastapi import FastAPI, File, UploadFile
import uvicorn
import numpy as np
import tensorflow as tf
from Class_Names import CLASS_NAMES
from Helper import read_file_as_image

app = FastAPI()

MODEL = tf.keras.models.load_model(
    'Models/Resenet_Colored_80_20/resnet50-ResNet Plant Disease Detection colour -99.85.h5')


@app.get("/ping")
async def ping():
    return {'message': 'Hello, I am alive'}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    image_batch = np.expand_dims(image, axis=0)
    prediction = MODEL.predict(image_batch)
    class_index = np.argmax(prediction[0])
    predicted_class = CLASS_NAMES[class_index]
    confidence = prediction[0][class_index]
    return {
        'class': predicted_class,
        'confidence': str(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, port="8000", host="localhost")
