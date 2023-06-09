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

const template = `<p><span style="color: rgb(0, 0, 0); font-size: 10pt;">{{PARTNER_DISPLAY_NAME}}​</span></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;">{{PARTNER_ADDRESS}}</span></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;">{{PARTNER_ZIP}} {{PARTNER_CITY}}</span></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;"><br></span></p><p><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;"><br></span></p><p><br></p><p><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">Gutschrift</span></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;"><span style="font-family: Roboto, sans-serif; background-color: transparent; font-size: 10pt; font-variant-numeric: normal; font-variant-east-asian: normal; text-decoration-line: underline; text-decoration-skip-ink: none; white-space: pre-wrap;">Unser Zeichen</span><span style="font-family: Roboto, sans-serif; background-color: transparent; font-size: 10pt; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: pre-wrap;">: {{case.caseNumber}}</span><br></span></p><p><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">Kostennote</span><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">: {{INVOICE_NUMBER}}</span></p><p><strong id="docs-internal-guid-e650b36c-7fff-5b30-e32a-bebaf9eb5e89"><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">Ihre USt-ID:</span><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;"> {{PARTNER_TAX_ID}}</span></strong></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;"><br></span></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;"><br></span></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;"><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 10pt; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; white-space: pre-wrap;">{{AGENCY_OWNER_SALUTATION}},</span><br></span></p><p><span style="color: rgb(0, 0, 0); font-size: 10pt;"><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: Roboto, sans-serif; font-size: 10pt; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; white-space: pre-wrap;"><br></span></span></p><p><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">vereinbarungsgemäß erteilen wir nachfolgende Gutschrift:</span></p><p><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">Leistungszeitraum: {{SERVICE_PERIOD}}</span></p><p><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">&nbsp;</span></p><div><span style="color: rgb(0, 0, 0); font-size: 10pt;">{{> views/billingTable}}</span></div><div><span style="color: rgb(0, 0, 0); font-size: 10pt;"><br></span></div><div><span style="color: rgb(0, 0, 0); font-size: 10pt;"><br></span></div><p><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">Mit freundlichen Grüßen</span></p><div class="ke-component ke-image-container __ke__float- __ke__float-none" contenteditable="false"><figure style="margin: 0px;"><img src="https://lh3.googleusercontent.com/emeA4Wr9j-rGwZfatZxJK0NFES50Po5m4n4rAxPD6XZR69bGO1oCvnyWYnsAf6QTLjcvD49CAw0N65pGzN1tyueWbV3h09-xIcGMn_2D_8PKsHK6in3mfQZEqbYV1ksil5Mwne4SZli3gwvtOrEtdAtwzubrcAWF75nh5dau08mBRTDhLFT3mJO7lzbq" alt="" data-proportion="true" data-align="none" data-file-name="emeA4Wr9j-rGwZfatZxJK0NFES50Po5m4n4rAxPD6XZR69bGO1oCvnyWYnsAf6QTLjcvD49CAw0N65pGzN1tyueWbV3h09-xIcGMn_2D_8PKsHK6in3mfQZEqbYV1ksil5Mwne4SZli3gwvtOrEtdAtwzubrcAWF75nh5dau08mBRTDhLFT3mJO7lzbq" data-file-size="0" data-origin="," data-size="171px,65px" data-rotate="" origin-size="452,170" style="width: 171px; height: 65px;" data-index="0"></figure></div><p><span style="color: rgb(0, 0, 0); font-size: 10pt;"><br></span></p><p><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">Jannis-Niccolo Pohlenz</span></p><p><span style="font-family: Roboto, sans-serif; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap; color: rgb(0, 0, 0); font-size: 10pt;">Rechtsanwalt</span></p>`
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
