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
} from '../src/plugins/ToolbarPlugin/components';
import { $createParagraphNode, $createTextNode, $getRoot, LexicalEditor, EditorState } from 'lexical';
import {$generateHtmlFromNodes } from '@lexical/html';

export default {
  title: 'Verbum',
};

const initialState = () => {
  const paragraph = $createParagraphNode();
  const text = $createTextNode('Hello World!');
  paragraph.append(text);
  const root = $getRoot();
  root.append(paragraph);
  root.selectEnd();
};

export const FullEditor = () => {

  const onChange = (html) => {
    console.log('onChange html', html)
  }
  return (
    <EditorComposer initialEditorState={initialState}>
      <Editor onChange={onChange}>
        <ToolbarPlugin>
          <FontFamilyDropdown/>
          <FontSizeDropdown/>
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
