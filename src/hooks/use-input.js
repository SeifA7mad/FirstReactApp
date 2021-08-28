import { useState } from 'react';

const useInput = (validate) => {
    const [inputValue, setInputValue] = useState('');
    const [isTouched, setIsTouched] = useState(false);

    const inputValueIsValid = validate(inputValue);
    const inputHasAnError = !inputValueIsValid && isTouched;

    const onChangeInputValueHandler = (event) => {
        event.preventDefault();
        setInputValue(event.target.value);
    }

    const onBlurInputHanlder = () => {
        setIsTouched(true);
    };

    const onResetInputHandler = () => {
        setInputValue('');
        setIsTouched(false);
    }

    return {
        inputValue,
        inputValueIsValid,
        inputHasAnError,
        onChangeInputValueHandler,
        onBlurInputHanlder,
        onResetInputHandler
    };
}

export default useInput;
