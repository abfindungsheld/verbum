/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { $isCodeNode } from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isListNode } from '@lexical/list';
import { $isHeadingNode } from '@lexical/rich-text';
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
} from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import * as React from 'react';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import useChild from 'use-child';
import { getSelectedNode } from '../../utils/node.util';
import EditorContext from '../../context/EditorContext';
import ToolbarContext from '../../context/ToolbarContext';
import AlignDropdown from './components/AlignDropdown';
import InsertDropdown from './components/InsertDropdown';
import './ToolbarPlugin.css';
import UndoButton from './components/UndoButton';
import RedoButton from './components/RedoButton';
import CodeLanguageDropdown from './components/CodeLanguageDropdown';
import BlockFormatDropdown from './components/BlockFormatDropdown';
import Divider from '../../ui/Divider';
import { ListNode } from '../../nodes/lexical-list/src';

const supportedBlockTypes = new Set([
  'paragraph',
  'quote',
  'code',
  'h1',
  'h2',
  'h3',
  'bullet',
  'number',
  'check',
]);

const CODE_LANGUAGE_MAP = {
  javascript: 'js',
  md: 'markdown',
  plaintext: 'plain',
  python: 'py',
  text: 'plain',
};

interface IToolbarProps {
  children?: React.ReactElement | React.ReactElement[];
  defaultFontSize?: string /** The default selected font size in the toolbar */;
  defaultFontColor?: string /** The default selected font color in the toolbar */;
  defaultBgColor?: string /** The default selected background color in the toolbar */;
  defaultFontFamily?: string /** The default selected font family in the toolbar */;
  defaultLineHeight?: string /** The default selected line height in the toolbar */;
}

const ToolbarPlugin = ({
  children,
  defaultFontSize = '15px',
  defaultFontColor = '#000',
  defaultBgColor = '#fff',
  defaultFontFamily = 'Arial',
  defaultLineHeight = '1em',
}: IToolbarProps) => {
  const [insertExists, InsertComponent] = useChild(children, InsertDropdown);
  const [alignExists, AlignComponent] = useChild(children, AlignDropdown);

  const { initialEditor, activeEditor, setActiveEditor } =
    useContext(EditorContext);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState(null);
  const [fontSize, setFontSize] = useState<string>(defaultFontSize);
  const [fontColor, setFontColor] = useState<string>(defaultFontColor);
  const [bgColor, setBgColor] = useState<string>(defaultBgColor);
  const [fontFamily, setFontFamily] = useState<string>(defaultFontFamily);
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isRTL, setIsRTL] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<string>('');
  const [lineHeight, setLineHeight] = useState<string>(defaultLineHeight);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root'
          ? anchorNode
          : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsSubscript(selection.hasFormat('subscript'));
      setIsSuperscript(selection.hasFormat('superscript'));
      setIsCode(selection.hasFormat('code'));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            const language = element.getLanguage();
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ''
            );
            return;
          }
        }
      }
      // Hande buttons
      setFontSize(
        $getSelectionStyleValueForProperty(
          selection,
          'font-size',
          defaultFontSize
        )
      );
      setFontColor(
        $getSelectionStyleValueForProperty(selection, 'color', defaultFontColor)
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          'background-color',
          defaultBgColor
        )
      );

      setFontFamily(
        $getSelectionStyleValueForProperty(
          selection,
          'font-family',
          defaultFontFamily
        )
      );
      setLineHeight(
        $getSelectionStyleValueForProperty(
          selection,
          'line-height',
          defaultLineHeight
        )
      );
    }
  }, [activeEditor]);

  const patchParagraphNodes = (
    selection: RangeSelection,
    styles: Record<string, string>
  ) => {
    const selectedNodes = selection.getNodes();
    const selectedNodesLength = selectedNodes.length;
    const lineHeight = styles['line-height'];
    const fontSize = styles['font-size'];
    const fontFamily = styles['font-family'];

    if (selectedNodesLength < 1) {
      return;
    }
    selectedNodes.forEach((node) => {
      if (node.getType() === 'listitem') {
        lineHeight && node.setLineHeight(lineHeight);
        fontFamily && node.setFontFamily(fontFamily);
        fontSize && node.setFontSize(fontSize);
        return
      }
      const parentNode = node.getParent();
      if (parentNode.getType() === 'listitem') {
        lineHeight && parentNode.setLineHeight(lineHeight);
        fontFamily && parentNode.setFontFamily(fontFamily);
        fontSize && parentNode.setFontSize(fontSize);
      }
      if (node.getType() === 'custom-paragraph') {
        node.setLineHeight(lineHeight);
        return
      }
      if (parentNode.getType() === 'custom-paragraph') {
        parentNode.setLineHeight(lineHeight)
      }
    });
  };

  useEffect(() => {
    return initialEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [initialEditor, updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [activeEditor, updateToolbar]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          patchParagraphNodes(selection, styles)
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      initialEditor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      initialEditor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [initialEditor, isLink]);

  return (
    <ToolbarContext.Provider
      value={{
        isRTL,
        canUndo,
        canRedo,
        fontFamily,
        fontSize,
        fontColor,
        bgColor,
        isBold,
        isItalic,
        isUnderline,
        isCode,
        isLink,
        applyStyleText,
        insertLink,
        isStrikethrough,
        isSubscript,
        isSuperscript,
        selectedElementKey,
        codeLanguage,
        blockType,
        lineHeight,
      }}
    >
      <div className="toolbar">
        <UndoButton />
        <RedoButton />
        <Divider />
        {supportedBlockTypes.has(blockType) &&
          activeEditor === initialEditor && (
            <>
              <BlockFormatDropdown />
              <Divider />
            </>
          )}
        {blockType === 'code' ? (
          <>
            <CodeLanguageDropdown />
            <Divider />
            {alignExists && AlignComponent}
          </>
        ) : (
          <>{children}</>
        )}
      </div>
    </ToolbarContext.Provider>
  );
};

export default ToolbarPlugin;
