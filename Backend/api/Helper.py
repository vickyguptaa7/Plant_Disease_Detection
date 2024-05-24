import cv2
import tempfile
import face_recognition
import time
import base64
from Constant import OUTPUT_SIZE, RESIZE_FACTOR, NO_OF_FACES_TO_DETECT, ERROR_MESSAGES
import torch
from torch import nn
from torchvision import models, transforms


# Define the model class
class Model(nn.Module):
    def __init__(self, num_classes, latent_dim=2048, lstm_layers=1, hidden_dim=2048, bidirectional=True):
        super(Model, self).__init__()
        model = models.resnext50_32x4d(pretrained=True)
        self.model = nn.Sequential(*list(model.children())[:-2])
        self.swish = nn.SiLU()  # Swish activation function
        self.lstm = nn.LSTM(latent_dim, hidden_dim, lstm_layers,
                            bidirectional=bidirectional)  # Set bidirectional=True
        self.dropout = nn.Dropout(0.4)
        # Adjust linear layer input size
        self.linear = nn.Linear(
            hidden_dim * 2 if bidirectional else hidden_dim, num_classes)
        self.avgpool = nn.AdaptiveAvgPool2d(1)

    def forward(self, x):
        batch_size, seq_length, c, h, w = x.shape
        x = x.view(batch_size * seq_length, c, h, w)
        fmap = self.model(x)
        x = self.swish(fmap)
        x = self.avgpool(x)
        # Adjust view to accommodate bidirectional LSTM output
        x = x.view(batch_size, seq_length, -1)
        x_lstm, _ = self.lstm(x)
        return fmap, self.dropout(self.linear(torch.mean(x_lstm, dim=1)))


# Load the model
MODEL = Model(2)
MODEL.load_state_dict(torch.load(
    'Models/Resnext_BiLstm/checkpoint3celebdf.pt', map_location=torch.device('cpu')))
MODEL.eval()  # Set the model to evaluation mode

im_size = 112
mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]

train_transforms = transforms.Compose([
    transforms.ToPILImage(),
    transforms.Resize((im_size, im_size)),
    transforms.ToTensor(),
    transforms.Normalize(mean, std)])


def read_file_and_pre_processing(data):
    '''
    This function creates a temporary file, writes the data to it, and then reads the file as a video.
    Each frame of the video is read in a loop, converted to RGB format, and appended to the frames list.
    The frames list is returned at the end of the function.
    '''
    # Create a temporary file
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")

    # Write the data to the temporary file
    temp_file.write(data)
    temp_file.close()
    print(temp_file)

    # Start timing the video processing
    start_time = time.time()

    # Read the temporary file as a video
    video = cv2.VideoCapture(temp_file.name)

    # Read the first frame of the video
    success, frame = video.read()
    face_frames = []
    full_frames = []
    face_coordinates = []
    frame_count = 0
    iteration = 0
    while success and frame_count < 150:
        iteration += 1
        if iteration % 3 != 0:
            continue
        # Resize frame of video to 1/RESIZE_FACTOR size for faster face recognition processing
        small_frame = cv2.resize(
            frame, (0, 0), fx=1/RESIZE_FACTOR, fy=1/RESIZE_FACTOR)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Find all the faces in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        print(face_locations)

        # If there is exactly NO_OF_FACES_TO_DETECT face in the frame, extract the face and resize it to the output size
        # else  if multiple faces are detected in the frame, raise an error
        if len(face_locations) == NO_OF_FACES_TO_DETECT:
            top, right, bottom, left = face_locations[0]
            face_frame = frame[top*RESIZE_FACTOR:bottom *
                               RESIZE_FACTOR, left*RESIZE_FACTOR:right*RESIZE_FACTOR]
            resized_face = cv2.resize(face_frame, OUTPUT_SIZE)
            face_frames.append(resized_face)
            full_frames.append(frame)
            face_coordinates.append(face_locations[0])
            frame_count += 1
        elif len(face_locations) > 1:
            raise ValueError(ERROR_MESSAGES['MULTIPLE_FACES_DETECTED'])

        # Read the next frame
        success, frame = video.read()

    # if no face is detected in the video, raise an error
    if (frame_count == 0):
        raise ValueError(ERROR_MESSAGES['NO_FACE_DETECTED'])

    end_time = time.time()
    print("Time taken to process video: ", end_time-start_time)
    print(frame_count)

    # Release the video object
    video.release()

    # Return the frames list containing the extracted faces
    return face_frames, full_frames, face_coordinates


def frames_to_base64(frames):
    '''
    This function takes a frame as input and returns the frame as a base64 string.
    '''

    base64_face_images = [base64.b64encode(cv2.imencode(
        '.jpg', image)[1]).decode("utf-8") for image in frames]

    return base64_face_images


def isDeepFake(frames):
    frames = [train_transforms(frame) for frame in frames]
    frames = torch.stack(frames)
    img = frames.unsqueeze(0)
    with torch.no_grad():
        fmap, logits = MODEL(img.to('cpu'))

        # Calculating prediction
        softmax_output = nn.functional.softmax(logits, dim=1)

        _, prediction = torch.max(softmax_output, 1)
        confidence = softmax_output[:, int(prediction.item())].item() * 100

        return int(prediction.item()), confidence


def labelFullFrames(isNotFake, confidence, full_frames,face_coordinates):
    for i in range(len(full_frames)):
        top, right, bottom, left = face_coordinates[i]
        top= top*RESIZE_FACTOR
        right = right*RESIZE_FACTOR
        bottom = bottom*RESIZE_FACTOR
        left = left*RESIZE_FACTOR
        if isNotFake == 0:
            cv2.rectangle(full_frames[i], (left, top), (right, bottom), (0, 0, 255), 2)
            cv2.putText(full_frames[i], f"DeepFake { round(confidence,2)}%", (left, top-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        else:
            cv2.rectangle(full_frames[i], (left, top), (right, bottom), (0, 255, 0), 2)
            cv2.putText(full_frames[i], f"Real {round(confidence,2)}%", (left, top-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

    return full_frames
