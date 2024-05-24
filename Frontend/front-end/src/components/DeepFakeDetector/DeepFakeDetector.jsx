import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { setIsLoading } from "../../store/reducers/ui.Reducer";
import Button from "../Button/Button.component";
import ImagePlayer from "../ImagePlayer/ImagePlayer";
import Input from "../Inputs/Input.component";
import LoadingSpinner from "../UI/LoadingSpinner.component";

const DiseaseDetector = ({}) => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [isFormValid, setIsFormValid] = useState(false);
  const [file, setFile] = useState("");
  const [detectData, setDetectData] = useState(null);
  const dispatch = useDispatch();

  const [isInputValid, setIsInputValid] = useState({
    file: false,
  });

  useEffect(() => {
    if (isInputValid.file) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isInputValid]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.warning("Please select an video!");
      return;
    }
    if (file.size > 100000000) {
      toast.warning("File size should be less than 100MB!");
      setDetectData({
        error: "File size should be less than 100MB!",
        face_images: [],
        full_images: [],
        confidence: 0,
        class: 1,
      });
      return;
    }
    dispatch(setIsLoading(true));
    const formData = new FormData();
    formData.append("file", file);
    const res = await axios({
      method: "post",
      data: formData,
      url: `/predict`,
    });
    if (res.status === 200) {
      console.log(res.data);
      toast.success("Successfully Detected!");
      dispatch(setIsLoading(false));
      setDetectData({
        error: res.data.error,
        face_images: res.data.face_images,
        full_images: res.data.full_images,
        confidence: res.data.confidence,
        class: res.data.class,
      });
    } else {
      toast.error("Something went wrong!");
      console.log(res);
    }
  };

  const resetForm = () => {
    setFile("");
    setIsFormValid(false);
    setIsInputValid({
      file: false,
    });
    setDetectData(null);
  };

  return (
    <>
      <div className="mt-6 bg-[color:var(--main-color)] shadow-[2px_4px_12px_rgba(0,0,0,0.2)] max-w-[780px] md:mx-auto shadow-[color:var(--shadow-color)] rounded-xl p-4  flex flex-col-reverse sm:flex-row ">
        <div
          className={twMerge(
            "bg-gradient-to-r from-[color:var(--color-primary)] to-teal-300 right-half p-8 basis-1/2 flex flex-col  rounded-xl justify-between",
            isDarkMode ? "text-black" : "text-white"
          )}
        >
          {file && (
            <video controls className="w-100 rounded-xl">
              <source src={URL.createObjectURL(file)} type="video/mp4" />
              <source src={URL.createObjectURL(file)} type="video/ogg" />
            </video>
          )}
        </div>
        <div className="flex justify-start p-8 basis-1/2 flex-column">
          {!detectData ? (
            <form
              action=""
              className="m-auto"
              onSubmit={onSubmitHandler}
              //   enctype="multipart/form-data"
            >
              <div className="flex flex-col gap-8 body"></div>
              <Input
                data={file}
                accept="video/*"
                setData={setFile}
                inputFieldName="file"
                setIsInputValid={setIsInputValid}
                isInputValid={isInputValid}
                type="file"
              />
              {/* 
            <div
              className={twMerge(
                `flex items-center ${
                  isDarkMode ? "" : "bg-gray-100"
                } px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
              )}
            >
              <select
                label="Select Version"
                defaultValue={imageType}
                className={twMerge(
                  ` rounded-md outline-none text-[color:var(--secondary-text-color)] text-sm w-full `,
                  isDarkMode ? "bg-transparent text-white" : "bg-gray-100"
                )}
                onChange={(e) => setImageType(e.target.value)}
              >
                <option value="COLOURED">Coloured</option>
                <option value="GRAYSCALE">Grayscale</option>
                <option value="SEGMENTED">Segmented</option>
              </select>
            </div> */}
              <div className="flex justify-around mt-8 footer">
                {isLoading && <LoadingSpinner />}
                {!isLoading && (
                  <Button
                    type="submit"
                    className="px-4 py-2 btn-base"
                    disabled={!isFormValid || isLoading}
                  >
                    DETECT
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1">
              {/* <div
                className={twMerge(
                  `flex items-center w-full ${
                    isDarkMode ? "" : "bg-gray-100"
                  } px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
                )}
              >
                <h3 className="text-[color:var(--tertiary-text-color)] text-lg font-semibold  text-center ">
                  VIDEO
                </h3>
              </div> */}
              {detectData?.error ? (
                <div
                  className={twMerge(
                    `flex items-center w-full ${
                      isDarkMode ? "" : "bg-gray-100"
                    } px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
                  )}
                >
                  <h3 className="text-[color:var(--tertiary-text-color)] text-lg font-semibold  text-center ">
                    {detectData?.error}
                  </h3>
                </div>
              ) : (
                <>
                  {" "}
                  <div
                    className={twMerge(
                      `flex items-center w-full ${
                        isDarkMode ? "" : "bg-gray-100"
                      } px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
                    )}
                  >
                    <h3 className="text-[color:var(--tertiary-text-color)] text-lg font-semibold  text-center ">
                      Label - &nbsp;
                    </h3>{" "}
                    <h3 className="text-[color:var(--color-primary)] text-xl font-semibold  text-center ">
                      {detectData?.class ? "Real" : "DeepFake"}
                    </h3>
                  </div>
                  <div
                    className={twMerge(
                      `flex items-center w-full ${
                        isDarkMode ? "" : "bg-gray-100"
                      } px-2 py-2 mt-4 border-[0.12rem] border-gray-100 rounded-md focus-within:border-[color:var(--color-primary)]`
                    )}
                  >
                    <h3 className="text-[color:var(--tertiary-text-color)] text-lg font-semibold  text-center ">
                      Accuracy - &nbsp;
                    </h3>{" "}
                    <h3 className="text-[color:var(--color-primary)] text-xl font-semibold  text-center ">
                      {Math.round(
                        (detectData?.confidence + Number.EPSILON) * 100
                      ) / 100}
                      %
                    </h3>
                  </div>
                </>
              )}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="px-4 py-2 mt-5 btn-inverted"
                  onClick={() => setDetectData(null)}
                >
                  BACK
                </Button>
                <Button
                  type="submit"
                  className="px-4 py-2 mt-5 btn-base"
                  onClick={resetForm}
                >
                  CLEAR
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-5 mt-16 overflow-auto h-100 w-100" >
        {detectData?.full_images?.length && (
          <ImagePlayer detectData={detectData} />
        )}
      </div>
      <div className="flex gap-5 mt-16 overflow-auto w-100">
        {detectData &&
          detectData?.full_images?.map((full_image, index) => (
            <div
              className="relative overflow-hidden rounded-lg"
              style={{ minWidth: "400px" }}
              key={index}
            >
              <img
                className="w-100 h-100"
                style={{}}
                src={`data:image/png;base64,${full_image}`}
                alt="face"
              />
              <div className="absolute top-0 left-0 overflow-hidden bg-white rounded-lg w-28 h-28">
                <img
                  src={`data:image/png;base64,${detectData?.face_images?.[index]}`}
                  alt="face"
                  className=" w-100 h-100"
                />
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default DiseaseDetector;
