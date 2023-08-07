/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRef } from 'react';

import { useSettings } from './context/SettingsContext';
import { useSharedHistoryContext } from './context/SharedHistoryContext';
import ActionsPlugin from './plugins/ActionsPlugin';
import AutoLinkPlugin from './plugins/AutoLinkPlugin';
import CharacterStylesPopupPlugin from './plugins/CharacterStylesPopupPlugin';
import ClickableLinkPlugin from './plugins/ClickableLinkPlugin';
import CodeHighlightPlugin from './plugins/CodeHighlightPlugin';
import EmojisPlugin from './plugins/EmojisPlugin';
import KeywordsPlugin from './plugins/KeywordsPlugin';
import ListMaxIndentLevelPlugin from './plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './plugins/MarkdownShortcutPlugin';
import SpeechToTextPlugin from './plugins/SpeechToTextPlugin';
import TabFocusPlugin from './plugins/TabFocusPlugin';
import ContentEditable from './ui/ContentEditable';
import Placeholder from './ui/Placeholder';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import EditorContext from './context/EditorContext';
import {$createParagraphNode, $getRoot, $insertNodes, LexicalEditor, $isElementNode, $isDecoratorNode} from 'lexical';
import { useTranslation } from 'react-i18next';
import DragDropPaste from './plugins/DragDropPastePlugin';
import {$generateHtmlFromNodes, $generateNodesFromDOM} from "@lexical/html";

interface IEditorProps {
  children?: ReactNode;
  hashtagsEnabled?: boolean;
  autoLinkEnabled?: boolean;
  emojisEnabled?: boolean;
  actionsEnabled?: boolean;
  placeholder?: string;
  listMaxIndent?: number;
  isEditable?: boolean;
  locale?: 'en' | 'fr' | 'ptBr' | 'ru' | null;
  onChange?: (editorState: string, editorInstance?: LexicalEditor) => void;
  template?: string;
}


const Editor = ({
  children,
  hashtagsEnabled = false,
  autoLinkEnabled = false,
  emojisEnabled = false,
  actionsEnabled = false,
  listMaxIndent = 7,
  placeholder = '',
  isEditable = true,
  locale = null,
  template,
  onChange,
}: IEditorProps) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const editorStateRef = useRef(null);
  const { historyState } = useSharedHistoryContext();
  const {
    settings: { isRichText },
  } = useSettings();
  const placeholderComponent = <Placeholder>{placeholder}</Placeholder>;

  const { i18n } = useTranslation();

  const replaceContentTransformer = (content) => {
    let updatedContent = content;

    // replacing all <b></b> tags
    updatedContent = updatedContent.replace(/<\/?b>/g, '')

    return updatedContent
  }

  useEffect(() => {
    editor.setEditable(isEditable);

    if (locale) i18n.changeLanguage(locale);
  }, []);

  useEffect(() => {
    editor.update(() => {
      // In the browser you can use the native DOMParser API to parse the HTML string.
      const parser = new DOMParser();
      const dom = parser.parseFromString(template, 'text/html');
      const root = $getRoot()
      const nodes = $generateNodesFromDOM(editor, dom);
      const paragraphNode = $createParagraphNode();

      nodes.forEach((n)=> paragraphNode.append(n))
      root.append(paragraphNode);
    })
  }, [template])

  return (
    <EditorContext.Provider
      value={{ initialEditor: editor, activeEditor, setActiveEditor }}
    >
      {children}
      <div className={`editor-container`}>
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        {hashtagsEnabled && <HashtagPlugin />}
        {emojisEnabled && <EmojisPlugin />}
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <DragDropPaste />
        {autoLinkEnabled && <AutoLinkPlugin />}

        <>
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={placeholderComponent}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            onChange={(editorState, editor ) => {
              if (editor) {
                editor.update(() => {
                  const raw = replaceContentTransformer($generateHtmlFromNodes(editor, null))
                  return onChange?.(raw)
                })
              }
            }}
          />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={listMaxIndent} />
          <LinkPlugin />
          <ClickableLinkPlugin />
          <CharacterStylesPopupPlugin />
          <TabFocusPlugin />
        </>

        <HistoryPlugin externalHistoryState={historyState} />
        {actionsEnabled && <ActionsPlugin isRichText={isRichText} />}
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
