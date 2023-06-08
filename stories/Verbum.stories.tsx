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

const template = `<p><span style="font-size:12pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">{{insurance.name}}</span></p><p><span style="font-size:12pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">{{insurance.address}}</span></p><p><span style="font-size:12pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">{{insurance.zip}} {{insurance.city}}</span></p><p><span style="font-size:12pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><br></span></p><p><span style="font-size:12pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><br></span></p><div><table><tbody><tr><td><p><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Deckungsanfrage für Versicherungsnehmer/-in</span></p></td></tr><tr><td><p style="line-height: 2;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Versicherungsnummer: <strong id="docs-internal-guid-ed469d78-7fff-1cb0-2c0b-fefbc28a9cad"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">{{#if case.insuranceNumber}}{{case.insuranceNumber}}{{/if}}</span></strong></span></p><p style="line-height: 2;"><span style="background-color: transparent; color: rgb(83, 98, 115); font-family: Roboto, sans-serif; font-size: 11pt; white-space: pre-wrap;">Schadennummer: <strong id="docs-internal-guid-ed469d78-7fff-1cb0-2c0b-fefbc28a9cad"><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; color: rgb(83, 98, 115); font-family: Roboto, sans-serif; font-size: 11pt; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; font-weight: 700; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">{{#if case.insuranceCaseNumber}}{{case.insuranceCaseNumber}}{{/if}}</span></strong><br></span></p><p style="line-height: 2;"><span style="background-color: transparent; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(83, 98, 115); font-variant-numeric: normal; font-variant-east-asian: normal; white-space: pre-wrap;">Versicherungsnehmer(in): </span><span style="background-color: transparent; font-size: 11pt; font-family: Roboto, sans-serif; color: rgb(83, 98, 115); font-weight: 700; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: pre-wrap;">{{case.insuranceHolder}}</span><span style="background-color: transparent; font-weight: var(--bs-body-font-weight);">&nbsp;</span><br>          </p><p style="line-height: 2;"><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Unser Zeichen: </span><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">{{case.caseNumber}}</span></p></td></tr></tbody></table></div><p><br></p><p><span style="font-size:11pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Sehr geehrte Damen und Herren,</span></p><p style="line-height: 2;"><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Ihr Versicherungsnehmer hat mit Beendigung des Arbeitsverhältnisses am </span><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:#ffff00;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">("Zeitpunkt der Kündigung")</span><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"> möglicherweise einen offenen Anspruch auf Urlaubsabgeltung in Höhe von umgerechnet circa </span><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:#ffff00;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">(Urlaubstage in Geld umgerechnet)</span><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">.</span></p><p style="line-height: 2;"><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Unsere Mandantschaft hat uns daher mit der Wahrnehmung ihrer rechtlichen Interessen beauftragt.</span></p><p style="line-height: 2;"><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Namens und in Vollmacht bitten wir Sie, Deckungszusage für unsere außergerichtliche Tätigkeit zu erteilen.</span></p><p style="line-height: 2;"><span style="font-size:12pt;font-family:Calibri,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;"><br></span></p><p><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; color: rgb(83, 98, 115); font-family: Roboto, sans-serif; font-size: 12pt; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;"><br></span></p><p><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; color: rgb(83, 98, 115); font-family: Roboto, sans-serif; font-size: 12pt; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">Mit freundlichen Grüßen</span></p><p><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; color: rgb(83, 98, 115); font-family: Roboto, sans-serif; font-size: 12pt; display: inline; margin: 0px; padding: 0px; vertical-align: baseline; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; white-space: pre-wrap;">{{{OUR_LAWYER_SIGN}}}br&gt;</span></p><p><strong id="docs-internal-guid-f332ab43-7fff-9dbb-d7a9-e4df14e97180"><span style="font-size: 12pt; font-family: Roboto, sans-serif; color: rgb(83, 98, 115); background-color: transparent; font-weight: 400; font-variant-numeric: normal; font-variant-east-asian: normal; white-space: pre-wrap;">Jannis-Niccolo Pohlenz</span></strong><br></p><p><strong id="docs-internal-guid-f332ab43-7fff-9dbb-d7a9-e4df14e97180"><span style="font-size:12pt;font-family:Roboto,sans-serif;color:#536273;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Rechtsanwalt<br></span></strong></p>`;
export const FullEditor = () => {

  const onChange = (html) => {
    console.log('onChange html', html)
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
