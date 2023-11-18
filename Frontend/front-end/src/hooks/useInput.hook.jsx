import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const useInput = (validateValue, name, data, setData) => {
  const dispatch = useDispatch();

  const [enteredValue, setEnteredValue] = useState(data);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  useEffect(() => {
    dispatch(setData(enteredValue));
  }, [enteredValue, dispatch,setData]);

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
    setEnteredValue,
  };
};

export default useInput;
