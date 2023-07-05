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

const initialState = () => {
  const paragraph = $createParagraphNode();
  const text = $createTextNode('Hello World!');
  paragraph.append(text);
  const root = $getRoot();
  root.append(paragraph);
  root.selectEnd();
};

const template = `<p class="PlaygroundEditorTheme__paragraph" dir="ltr"><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="font-size: 15pt; line-height: 3.25em;">another testâ</span></p><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0);">test text</span></p><p class="PlaygroundEditorTheme__paragraph"><br></p><p class="PlaygroundEditorTheme__paragraph"><br></p><p class="PlaygroundEditorTheme__paragraph"><br></p><p class="PlaygroundEditorTheme__paragraph"><br></p></p>`
export const FullEditor = () => {

  const onChange = (html) => {
    // console.log('onChange html', html)
  }
  return (
    <EditorComposer initialEditorState={initialState}>
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
