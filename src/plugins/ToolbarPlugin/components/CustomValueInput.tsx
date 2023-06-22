import React, {useState} from "react";

type TCustomValueInput = {
    submitHandler: (value: string) => void;
    defaultValue?: string
}

export const CustomValueInput = ({submitHandler, defaultValue}) => {
    const [value, setValue] = useState<string>(defaultValue)
    const submitWrapper = () => value && submitHandler(value);
    return (
        <span className='item' style={{display: "flex", flexDirection: 'column', gap: '5px', marginBottom: '5px'}}>
            <input
                type='number'
                value={parseFloat(value)}
                onClick={e => e.stopPropagation()}
                onChange={e => setValue(e.target.value)}
            />
            <button
                onClick={submitWrapper}
                disabled={!value}
            >
                Set
            </button>
        </span>
    )
}