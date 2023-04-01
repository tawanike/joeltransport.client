import { FC, useState } from "react";

const useNumberInput = (initialValue: number = 0, initialState: boolean = false) => {
    const [Value, setValue] = useState<number>(initialValue);
    const [disabled, setDisabled] = useState<boolean>(initialState);

    const Disable = (status: boolean) => {
        setDisabled(status);
        status && setValue(0);
    }

    const setAValue = (value: number) => {
        setValue(value);
    }
    const ValueDisplay =
        <div className={`col-12 custom-number-input ${disabled && 'custom-number-input--disabled'}`}>
            <div className="row">
                <div className="col-3 custom-number-input__controls"
                    onClick={() => {

                        Value !== 0 && setValue(Value - 1)
                    }}
                >
                    <p>-</p>
                </div>
                <div className="col-6 custom-number-input__number" >
                    <p>{Value}</p>
                </div>
                <div className="col-3 custom-number-input__controls"
                    onClick={() => setValue(Value + 1)}
                >
                    <p>+</p>
                </div>
            </div>
        </div>
    return { ValueDisplay, Value, Disable, setAValue }
}

export default useNumberInput;
