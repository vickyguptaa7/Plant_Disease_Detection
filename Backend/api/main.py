from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
import tensorflow as tf
from Class_Names import CLASS_NAMES
from Helper import read_file_as_image

app = FastAPI()

orgins = [
    "http://localhost:3000",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=orgins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = {
    'COLOURED': tf.keras.models.load_model(
        'Models/Resnet_Colored_80_20/resnet50-ResNet Plant Disease Detection colour -99.85.h5'),
    'GRAYSCALE': tf.keras.models.load_model(
        'Models/Resnet_Grayscale_80_20/i-ResNet Plant Disease Detection grayscale-99.01.h5'),
    'SEGMENTED': tf.keras.models.load_model(
        'Models/Resnet_Segmented_80_20/resnet50-ResNet Plant Disease Detection segmented -99.48.h5'
    )
}


@app.get("/ping")
async def ping():
    return {'message': 'Hello, I am alive'}


@app.post("/predict")
async def predict(file: UploadFile = File(...), image_type: str = None):
    image = read_file_as_image(await file.read(),image_type=='GRAYSCALE')
    image_batch = np.expand_dims(image, axis=0)
    
    # prediction using the model loaded
    prediction = None
    if image_type == 'GRAYSCALE':
        prediction = MODEL['GRAYSCALE'].predict(image_batch)
    elif image_type == 'SEGMENTED':
        prediction = MODEL['SEGMENTED'].predict(image_batch)
    else:
        prediction = MODEL['COLOURED'].predict(image_batch)

    class_index = np.argmax(prediction[0])
    predicted_class = CLASS_NAMES[class_index]
    confidence = prediction[0][class_index]

    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

if __name__ == "__main__":
    uvicorn.run(app, port="8000", host="localhost")
