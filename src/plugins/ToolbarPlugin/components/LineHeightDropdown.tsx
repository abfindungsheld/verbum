import React, { useCallback, useContext } from 'react';
import Select from '../../../ui/Select';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';
import LineHeightOptions from "../../../types/LineHeightOptions";

const defaultLineHeightOptions: FontOptions = [
    ['1em', '1em'],
    ['2em', '2em'],
    ['3em', '3em'],
    ['4em', '4em'],
    ['5em', '5em'],
    ['6em', '6em'],
    ['7em', '7em'],
    ['8em', '8em'],
    ['9em', '9em'],
    ['10em', '10em'],
];

interface ILineHeightDropdown {
    lineHeightOptions?: LineHeightOptions;
}

const LineHeightDropdown = ({
                              lineHeightOptions = defaultLineHeightOptions,
                          }: ILineHeightDropdown) => {
    const { lineHeight, applyStyleText } = useContext(ToolbarContext);

    const onLineHeightSelect = useCallback(
        (e) => {
            applyStyleText({ 'line-height': e.target.value});
        },
        [applyStyleText]
    );

    return (
        <>
            <Select
                className="toolbar-item line-height"
                onChange={onLineHeightSelect}
                options={lineHeightOptions}
                value={lineHeight}
                measureType='em'
                title='Line height'
            />
            <i className="chevron-down inside" />
        </>
    );
};

export default LineHeightDropdown;
