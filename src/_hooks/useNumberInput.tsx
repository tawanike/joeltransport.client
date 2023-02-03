import { useState } from "react";

const useNumberInput = () => {
    const [Value, setValue] = useState(0)
    const ValueDisplay =
        <div className="col-12 custom-number-input">
            <div className="row">
                <div className="col-3 custom-number-input__controls" onClick={() => Value !== 0 && setValue(Value - 1)}>
                    <p>-</p>
                </div>
                <div className="col-6 custom-number-input__number" >
                    <p>{Value}</p>
                </div>
                <div className="col-3 custom-number-input__controls" onClick={() => setValue(Value + 1)}>
                    <p>+</p>
                </div>
            </div>
        </div>

    return { ValueDisplay, Value }
}

export default useNumberInput;
