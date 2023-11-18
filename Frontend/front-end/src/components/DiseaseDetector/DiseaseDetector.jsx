import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { setIsLoading } from "../../store/reducers/ui.Reducer";
import Button from "../Button/Button.component";
import Input from "../Inputs/Input.component";
import LoadingSpinner from "../UI/LoadingSpinner.component";

const DiseaseDetector = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [imageType, setImageType] = useState("coloured");
  const [isFormValid, setIsFormValid] = useState(false);
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

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      file,
      imageType,
    };
    dispatch(setIsLoading(true));
    console.log(data);
  };

  return (
    <div className="mt-6 bg-[color:var(--main-color)] shadow-[2px_4px_12px_rgba(0,0,0,0.2)] max-w-[780px] md:mx-auto shadow-[color:var(--shadow-color)] rounded-xl p-4  flex flex-col-reverse sm:flex-row ">
      <div
        className={twMerge(
          "bg-gradient-to-r from-[color:var(--color-primary)] to-teal-300 right-half p-8 basis-1/2 flex flex-col  rounded-xl justify-between",
          isDarkMode ? "text-black" : "text-white"
        )}
      >
        {file && (
          <img
            src={window.URL.createObjectURL(file)}
            className="w-100 rounded-xl"
          />
        )}
      </div>
      <div className="flex justify-start p-8 basis-1/2 flex-column">
        <form
          action=""
          className="m-auto"
          onSubmit={onSubmitHandler}
          //   enctype="multipart/form-data"
        >
          <div className="flex flex-col gap-8 body"></div>
          <Input
            data={file}
            accept="image/*"
            setData={setFile}
            inputFieldName="file"
            setIsInputValid={setIsInputValid}
            isInputValid={isInputValid}
            type="file"
          />
          <select
            label="Select Version"
            defaultValue={imageType}
            className={twMerge(
              `h-12 rounded-md mt-4 px-3 pr-5 outline-none text-[color:var(--secondary-text-color)] text-sm w-full `,
              isDarkMode ? "bg-transparent text-white" : "bg-gray-100"
            )}
            onChange={(e) => setImageType(e.target.value)}
          >
            <option value="colored">Coloured</option>
            <option value="grayscale">Grayscale</option>
            <option value="segmented">Segmented</option>
          </select>

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
      </div>
    </div>
  );
};

export default DiseaseDetector;
