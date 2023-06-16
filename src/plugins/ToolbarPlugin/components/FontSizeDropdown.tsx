import React, { useCallback, useContext } from 'react';
import DropDown, {DropDownItem} from '../../../ui/DropDown';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';

const defaultFontSizeOptions: FontOptions = [
  ['10px', '10'],
  ['11px', '11'],
  ['12px', '12'],
  ['13px', '13'],
  ['14px', '14'],
  ['15px', '15'],
  ['16px', '16'],
  ['17px', '17'],
  ['18px', '18'],
  ['19px', '19'],
  ['20px', '20'],
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

  return (
    <>
      <DropDown
        buttonClassName={'toolbar-item font-size'}
        buttonLabel={fontSize.slice(0,2)}
        buttonAriaLabel={'Formatting options for font family'}>
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
