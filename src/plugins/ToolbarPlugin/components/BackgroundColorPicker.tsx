import React, { useCallback, useContext } from 'react';
import ToolbarContext from '../../../context/ToolbarContext';
import ColorPicker from '../../../ui/ColorPicker';
import { useTranslation } from 'react-i18next';

const BackgroundColorPicker = () => {
  const { bgColor, applyStyleText } = useContext(ToolbarContext);
  const { t } = useTranslation('toolbar');

  const onBgColorSelect = useCallback(
    (value: string) => {
      if (value === 'rgba(0, 0, 0, 0)' || value === '#000000') {  // protection from black bg in table or another place in editor
        return null
      }
      applyStyleText({ 'background-color': value });
    },
    [applyStyleText]
  );

  return (
    <ColorPicker
      buttonClassName="toolbar-item color-picker"
      buttonAriaLabel={t('toolbar:backgroundColorPicker.Description')}
      buttonIconClassName="icon bg-color"
      color={bgColor}
      onChange={onBgColorSelect}
      title="bg color"
    />
  );
};

export default BackgroundColorPicker;
