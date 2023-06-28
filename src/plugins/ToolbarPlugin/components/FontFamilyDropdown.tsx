import React, { useCallback, useContext } from 'react';
import DropDown, {DropDownItem} from '../../../ui/DropDown';
import ToolbarContext from '../../../context/ToolbarContext';
import { FontOptions } from '../../../types';

const defaultFontFamilyOptions: FontOptions = [
  ['Arial', 'Arial'],
  ['Courier New', 'Courier New'],
  ['Courier', 'Courier'],
  ['Roboto', 'Roboto'],
  ['Times New Roman', 'Times New Roman'],
  ['Calibri', 'Calibri'],
];

interface IFontFamilyDropdown {
  fontOptions?: FontOptions;
}
function dropDownActiveClass(active: boolean) {
  if (active) return 'active dropdown-item-active';
  else return '';
}

const FontFamilyDropdown = ({
  fontOptions = defaultFontFamilyOptions,
}: IFontFamilyDropdown) => {
  const { fontFamily, applyStyleText } = useContext(ToolbarContext);

  const onFontFamilySelect = useCallback(
    (value) => {
      applyStyleText({ 'font-family': value });
    },
    [applyStyleText]
  );

  return (
    <>
      <DropDown
        buttonClassName={'toolbar-item font-family'}
        buttonLabel={fontFamily.replace(/^(.*?),.*/, '$1') || 'Arial'}
        buttonAriaLabel={'Formatting options for font family'}
        buttonIconClassName={'icon block-type font-family'}
      >
        {fontOptions.map(
          ([option, text]) => (
            <DropDownItem
              className={`item ${dropDownActiveClass(fontFamily === option)}`}
              onClick={() => onFontFamilySelect(option)}
              key={option}>
              <span style={{ fontFamily: option }} className="text">{text}</span>
            </DropDownItem>
          ),
        )}
      </DropDown>
    </>
  );
};

export default FontFamilyDropdown;
