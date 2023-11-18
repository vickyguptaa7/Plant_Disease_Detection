import Input from "../components/Inputs/Input.component";
import React, { useEffect, useState } from "react";

import {
  BsFacebook,
  BsFillTelephoneFill,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
} from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  setContactUsInitialState,
  setEmail,
  setIsFormValid,
  setMessage,
  setUsername,
} from "../store/reducers/contactUs.Reducer";
import TextArea from "../components/Inputs/TextArea.component";
import Button from "../components/Button/Button.component";
import { contactUsFormSubmit } from "../store/actions/contactUs.actions";
import LoadingSpinner from "../components/UI/LoadingSpinner.component";
import { twMerge } from "tailwind-merge";

const ContactUs = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const username = useSelector((state) => state.contactUs.username);
  const email = useSelector((state) => state.contactUs.email);
  const message = useSelector((state) => state.contactUs.message);
  const isFormValid = useSelector((state) => state.contactUs.isFormValid);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  const [isInputValid, setIsInputValid] = useState({
    username: false,
    email: false,
    message: false,
  });

  useEffect(() => {
    return () => {
      dispatch(setContactUsInitialState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isInputValid.username && isInputValid.email && isInputValid.message) {
      dispatch(setIsFormValid(true));
    } else {
      dispatch(setIsFormValid(false));
    }
  }, [isInputValid, dispatch]);

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const userInfo = {
      name: username,
      email,
      message,
    };
    console.log(userInfo);
    dispatch(contactUsFormSubmit(userInfo));
  };

  return (
    <div className="mt-28 mx-auto">
      <div className="header flex flex-col items-center justify-center">
        <h1 className="text-[color:var(--color-primary)] text-4xl font-semibold mb-2 text-center">
          Contact Us
        </h1>
        <div className="h-[0.30rem] w-12 bg-[color:var(--color-primary)] rounded-full"></div>
        <p
          className={twMerge(
            "mt-4 text-sm",
            isDarkMode ? "text-gray-300" : "text-gray-400"
          )}
        >
          Any question and remarks? Just write us a message!
        </p>
      </div>
      <div className="mt-6 bg-[color:var(--main-color)] shadow-[2px_4px_12px_rgba(0,0,0,0.2)] max-w-[780px] md:mx-auto shadow-[color:var(--shadow-color)] rounded-xl p-4  flex flex-col-reverse sm:flex-row ">
        <div
          className={twMerge(
            "bg-gradient-to-r from-[color:var(--color-primary)] to-teal-300 right-half p-8 basis-1/2 flex flex-col  rounded-xl justify-between",
            isDarkMode ? "text-black" : "text-white"
          )}
        >
          <div>
            <h3 className="text-2xl">Contact Information</h3>
            <p className="mt-2 text-sm">
              Fill up the form and our Team will get back to you within 24
              hours.
            </p>
          </div>
          <div className="mt-12 ">
            <ul className="flex items-start justify-center flex-col gap-6 text-sm">
              <li className="flex items-center justify-center gap-2">
                <BsFillTelephoneFill /> 011 1124567
              </li>
              <li className="flex items-center justify-center gap-1">
                <MdEmail className="text-lg" /> sih.enkrypt@gmail.com
              </li>
              <li className="flex items-center justify-center gap-1">
                <ImLocation className="text-lg" /> Jamia Nagar New Delhi
              </li>
            </ul>
          </div>
          <div className="flex items-ceter justify-between text-2xl mt-12">
            <button
              className={twMerge(
                "hover:scale-110  duration-500 ease-in-out",
                isDarkMode ? "hover:text-white" : "hover:text-black"
              )}
            >
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BsFacebook />
              </a>
            </button>
            <button
              className={twMerge(
                "hover:scale-110  duration-500 ease-in-out",
                isDarkMode ? "hover:text-white" : "hover:text-black"
              )}
            >
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>
            </button>
            <button
              className={twMerge(
                "hover:scale-110  duration-500 ease-in-out",
                isDarkMode ? "hover:text-white" : "hover:text-black"
              )}
            >
              <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                <BsTwitter />
              </a>
            </button>
            <button
              className={twMerge(
                "hover:scale-110  duration-500 ease-in-out",
                isDarkMode ? "hover:text-white" : "hover:text-black"
              )}
            >
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BsLinkedin />
              </a>
            </button>
          </div>
        </div>
        <div className="basis-1/2 p-8">
          <form action="" className="mx-auto" onSubmit={onSubmitHandler}>
            <div className="body flex flex-col gap-8">
              <Input
                data={username}
                setData={setUsername}
                inputFieldName="Username"
                type="text"
                setIsInputValid={setIsInputValid}
                isInputValid={isInputValid}
              />
              <Input
                data={email}
                setData={setEmail}
                inputFieldName="Email"
                type="text"
                setIsInputValid={setIsInputValid}
                isInputValid={isInputValid}
              />
              <TextArea
                data={message}
                setData={setMessage}
                inputFieldName="Message"
                type="text"
                setIsInputValid={setIsInputValid}
                isInputValid={isInputValid}
              />
            </div>

            <div className="footer mt-8 flex justify-around">
              {isLoading && <LoadingSpinner />}
              {!isLoading && (
                <Button
                  type="submit"
                  className="btn-base px-4 py-2"
                  disabled={!isFormValid || isLoading}
                >
                  Submit
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
