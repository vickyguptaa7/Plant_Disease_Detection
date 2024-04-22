from fastapi import FastAPI, File, UploadFile
import uvicorn
from Class_Names import CLASS_NAMES
from Helper import read_file_and_pre_processing, frames_to_base64, isDeepFake

app = FastAPI()


@app.get("/ping")
async def ping():
    return {'message': 'Hello, I am alive'}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print("File received")
    face_frames, full_frames = read_file_and_pre_processing(await file.read())

    # Encode the face images as base64 strings
    face_images = frames_to_base64(face_frames)
    full_images = frames_to_base64(full_frames)
    print(isDeepFake(face_frames))
    # print(video)
    # prediction using the model loaded
    # prediction = None
    # if image_type == 'GRAYSCALE':
    #     prediction = MODEL['GRAYSCALE'].predict(image_batch)
    # elif image_type == 'SEGMENTED':
    #     prediction = MODEL['SEGMENTED'].predict(image_batch)
    # else:
    #     prediction = MODEL['COLOURED'].predict(image_batch)

    # class_index = np.argmax(prediction[0])
    # predicted_class = CLASS_NAMES[class_index]
    # confidence = prediction[0][class_index]

    # return {
    #     'class': predicted_class,
    #     'confidence': float(confidence)
    # }
    return {
        # 'face_images': face_images,
        # 'full_images': full_images,
        'class': 0,
        'confidence': 99.85,
    }

if __name__ == "__main__":
    uvicorn.run(app, port="8000", host="localhost")
