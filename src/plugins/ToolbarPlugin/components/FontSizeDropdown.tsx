import React, {useCallback, useContext, useEffect, useState} from 'react';
import DropDown, {DropDownItem} from '../../../ui/DropDown';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';
import {CustomValueInput} from "./CustomValueInput";

const defaultFontSizeOptions: FontOptions = [
  ['10pt', '10'],
  ['11pt', '11'],
  ['12pt', '12'],
  ['13pt', '13'],
  ['14pt', '14'],
  ['15pt', '15'],
  ['16pt', '16'],
  ['17pt', '17'],
  ['18pt', '18'],
  ['19pt', '19'],
  ['20pt', '20'],
];

interface IFontSizeDropdown {
  fontSizeOptions?: FontOptions;
}

function dropDownActiveClass(active: boolean) {
  if (active) return 'active dropdown-item-active';
  else return '';
}

const FontSizeDropdown = ({
  fontSizeOptions = defaultFontSizeOptions,
}: IFontSizeDropdown) => {
  const { fontSize, applyStyleText } = useContext(ToolbarContext);

  const onFontSizeSelect = useCallback(
    (value) => {
      applyStyleText({ 'font-size': value });
    },
    [applyStyleText]
  );
  const submitCustomLineHeight = (value) => applyStyleText({'font-size': `${value}pt`});


  return (
    <>
      <DropDown
        buttonClassName={'toolbar-item font-size'}
        buttonLabel={fontSize.replace(/(pt|px)/g, '')}
        buttonAriaLabel={'Formatting options for font family'}>
        <CustomValueInput submitHandler={submitCustomLineHeight} defaultValue={fontSize.replace(/\b(pt|px)\b/g, '')}/>
        {fontSizeOptions.map(
          ([option, text]) => (
            <DropDownItem
              className={`item ${dropDownActiveClass(fontSize === option)} fontsize-item`}
              onClick={() => onFontSizeSelect(option)}
              key={option}>
              <span style={{ fontSize: option }} className="text">{text}</span>
            </DropDownItem>
          ),
        )}
      </DropDown>
    </>
  );
};

export default FontSizeDropdown;
