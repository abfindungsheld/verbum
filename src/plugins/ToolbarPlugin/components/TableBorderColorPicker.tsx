import React, { useCallback, useContext } from 'react';
import ToolbarContext from '../../../context/ToolbarContext';
import ColorPicker from '../../../ui/ColorPicker';
import { useTranslation } from 'react-i18next';

const TableBorderColorPicker = () => {
    const { borderColor, applyStyleText } = useContext(ToolbarContext);
    const { t } = useTranslation('toolbar');

    const onBorderColorSelect = useCallback(
        (value: string) => {
            applyStyleText({ 'border': `1px solid ${value}` });
        },
        [applyStyleText]
    );

    return (
        <ColorPicker
            buttonClassName="toolbar-item color-picker"
            buttonAriaLabel={t('toolbar:tableBorderColorPicker.Description')}
            buttonIconClassName="icon bg-color"
            color={borderColor}
            onChange={onBorderColorSelect}
            title="border color"
        />
    );
};

export default TableBorderColorPicker;
