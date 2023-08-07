import React, { useState} from 'react';
import { EditorComposer, Editor, Divider } from '../src';
import ToolbarPlugin from '../src/plugins/ToolbarPlugin/ToolbarPlugin';

import {
  AlignDropdown,
  BackgroundColorPicker,
  BlockFormatDropdown,
  BoldButton,
  CodeFormatButton,
  CodeLanguageDropdown,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  RedoButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  UndoButton,
  LineHeightDropdown,
} from '../src/plugins/ToolbarPlugin/components';
import { $createParagraphNode, $createTextNode, $getRoot, LexicalEditor, EditorState } from 'lexical';
import {$generateHtmlFromNodes } from '@lexical/html';

export default {
  title: 'Verbum',
};

const template = `<p style="line-height: 5;">lorem</p>`

export const FullEditor = () => {

  const onChange = (html) => {
    // console.log('onChange html', html)
  }
  return (
    <EditorComposer>
      <Editor onChange={onChange} template={template}>
        <ToolbarPlugin>
          <FontFamilyDropdown/>
          <FontSizeDropdown/>
          <LineHeightDropdown/>
          <Divider/>
          <BoldButton/>
          <ItalicButton/>
          <UnderlineButton/>
          <CodeFormatButton/>
          <InsertLinkButton/>
          <TextColorPicker/>
          <BackgroundColorPicker/>
          <TextFormatDropdown/>
          <Divider/>
          <InsertDropdown/>
          <Divider/>
          <AlignDropdown/>
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  )
}
