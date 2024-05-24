from fastapi import FastAPI, File, UploadFile
import uvicorn
from Class_Names import CLASS_NAMES
from Helper import read_file_and_pre_processing, frames_to_base64, isDeepFake, labelFullFrames

app = FastAPI()


@app.get("/ping")
async def ping():
    return {'message': 'Hello, I am alive'}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    print("File received")
    try:
        face_frames, full_frames, face_coordinates = read_file_and_pre_processing(await file.read())
        isNotFake, confindence = isDeepFake(face_frames)

        full_frames = labelFullFrames(
            isNotFake, confindence, full_frames, face_coordinates)

        # Encode the face images as base64 strings
        face_images = frames_to_base64(face_frames)
        full_images = frames_to_base64(full_frames)

        return {
            'face_images': face_images,
            'full_images': full_images,
            'class': isNotFake,
            'confidence': confindence,
        }

    except ValueError as e:
        print("Caught an error:", e)
        return {
            'error': str(e)
        }


if __name__ == "__main__":
    uvicorn.run(app, port="8000", host="localhost")
