import {
  ParagraphNode,
  EditorConfig,
  DOMExportOutput,
  LexicalEditor,
  SerializedElementNode,
  DOMConversionMap,
  DOMConversionOutput,
  $createParagraphNode,
  ElementFormatType,
  SerializedParagraphNode,
  NodeKey,
} from 'lexical';

export class CustomParagraphNode extends ParagraphNode {
  constructor(key?: NodeKey) {
    super(key);
    this.__first = null;
    this.__last = null;
    this.__size = 0;
    this.__format = 0;
    this.__indent = 0;
    this.__dir = null;
    this.__lineHeight = null;
  }

  getLineHeight(): string | null {
    const self = this.getLatest();
    return self.__lineHeight;
  }

  setLineHeight(lineHeight: string | null): this {
    const self = this.getWritable();
    self.__lineHeight = lineHeight;
    return self;
  }

  static getType(): string {
    return 'custom-paragraph';
  }

  static clone(node: CustomParagraphNode): CustomParagraphNode {
    return new CustomParagraphNode(node.__key);
  }

  createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config);
    dom.style.lineHeight = this.getLineHeight()
    return dom;
  }

  updateDOM(
    prevNode: CustomParagraphNode,
    dom: HTMLElement,
    config: EditorConfig,
  ): boolean {
    const prevLineHeight = prevNode.__lineHeight;
    const nextLineHeight = this.__lineHeight
    if (prevLineHeight !== nextLineHeight) {
      dom.style.lineHeight = nextLineHeight;
    }
    return false;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const { element } = super.exportDOM(editor);
    const hasLineBreak = element.innerHTML.includes('<br>');
    if (element && this.isEmpty() && !hasLineBreak) {
      element.append(document.createElement('br'));
    }
    if (element) {
      const formatType = this.getFormatType();
      const lineHeight = this.getLineHeight();
      element.style.textAlign = formatType;

      const direction = this.getDirection();
      if (direction) {
        element.dir = direction;
      }
      if (lineHeight) {
        element.style.lineHeight = lineHeight;
      }

      const indent = this.getIndent();
      if (indent > 0) {
        // padding-inline-start is not widely supported in email HTML, but
        // Lexical Reconciler uses padding-inline-start. Using text-indent instead.
        element.style.textIndent = `${indent * 20}px`;
      }
    }
    return {
      element,
    };
  }

  static importDOM(): DOMConversionMap | null {
    return {
      p: (node: Node) => ({
        conversion: convertCustomParagraphElement,
        priority: 2,
      }),
    };
  }

  static importJSON(serializedNode: SerializedParagraphNode): ParagraphNode {
    const node = $createParagraphNode();
    node.setFormat(serializedNode.format);
    node.setIndent(serializedNode.indent);
    node.setDirection(serializedNode.direction);
    return node;
  }

  exportJSON(): SerializedElementNode {
    return {
      ...super.exportJSON(),
      type: 'custom-paragraph',
      version: 1,
    };
  }
}

function convertCustomParagraphElement(
  element: HTMLElement
): DOMConversionOutput {
  const node = $createParagraphNode();
  if (element.style) {
    node.setFormat(element.style.textAlign as ElementFormatType);
    const indent = parseInt(element.style.textIndent, 10) / 20;
    if (indent > 0) {
      node.setIndent(indent);
    }
    if (element.style.lineHeight) {
      node.setLineHeight(element.style.lineHeight)
    }
  }
  return { node };
}

