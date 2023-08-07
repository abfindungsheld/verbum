import React, { useCallback, useContext, useState } from 'react';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';
import LineHeightOptions from '../../../types/LineHeightOptions';
import DropDown, { DropDownItem } from '../../../ui/DropDown';
import { CustomValueInput } from './CustomValueInput';

const defaultLineHeightOptions: FontOptions = [
  ['1', '1'],
  ['1.25', '1.25'],
  ['1.5', '1.5'],
  ['1.75', '1.75'],
  ['2', '2'],
  ['2.25', '2.25'],
  ['2.5', '2.5'],
  ['2.75', '2.75'],
  ['3', '3'],
  ['3.25', '3.25'],
  ['3.5', '3.5'],
  ['3.75', '3.75'],
  ['4', '4'],
];

interface ILineHeightDropdown {
  lineHeights?: LineHeightOptions;
}

function dropDownActiveClass(active: boolean) {
  if (active) return 'active dropdown-item-active';
  else return '';
}

const LineHeightDropdown = ({
  lineHeights = defaultLineHeightOptions,
}: ILineHeightDropdown) => {
  const { lineHeight, applyStyleText } = useContext(ToolbarContext);

  const onLineHeightSelect = useCallback(
    (value) => {
      applyStyleText({ 'line-height': value });
    },
    [applyStyleText]
  );

  const submitCustomLineHeight = (value) =>
    applyStyleText({ 'line-height': `${value}em` });

  return (
    <>
      <DropDown
        buttonClassName={'toolbar-item'}
        buttonLabel={lineHeight.replace('em', '')}
        buttonAriaLabel={'Formatting options for line height'}
        buttonIconClassName={'icon block-type line-height'}
      >
        <div>
          <CustomValueInput
            submitHandler={submitCustomLineHeight}
            defaultValue={lineHeight.replace('em', '')}
          />
          {lineHeights.map(([option, text]) => (
            <DropDownItem
              className={`item ${dropDownActiveClass(lineHeight === option)}`}
              onClick={() => onLineHeightSelect(option)}
              key={option}
            >
              <span className="text">{text}</span>
            </DropDownItem>
          ))}
        </div>
      </DropDown>
    </>
  );
};

export default LineHeightDropdown;
