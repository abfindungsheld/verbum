import type {
    EditorConfig,
    NodeKey,
    SerializedElementNode,
    Spread,
} from 'lexical';


import {getFontValueFromChildStyle} from "../utils/node.util";
import {ListItemNode} from "@lexical/list";

interface ListItemNodeWithStyle extends ListItemNode {
    __style?: string;
    getStyle?: () => string;
}


export type SerializedListItemNode = Spread<
    {
        checked: boolean | undefined;
        value: number;
        style?: string
    },
    SerializedElementNode
>;

/** @noInheritDoc */
export class ListItemNodeCustom extends ListItemNode {
    /** @internal */
    __value: number;
    /** @internal */
    __checked?: boolean;
    __style?: string;

    static clone(node: ListItemNodeWithStyle): ListItemNodeWithStyle {
        console.log('node', node)
        return new ListItemNodeCustom(node.__value, node.__checked, node.__key, node.__style);
    }

    constructor(value?: number, checked?: boolean, key?: NodeKey, style?: string) {
        super(key);
        this.__value = value === undefined ? 1 : value;
        this.__checked = checked;
        this.__style = style;
    }

    createDOM(config: EditorConfig): HTMLElement {
        const element = super.createDOM(config)


        const regex = /.*font-size:\s*([^;]+).*/;
        const match = this.getChildren()[0]?.getStyle().match(regex);
        const fontSize = match ? match[1].trim() : null;

        element.style.fontSize = fontSize;

        return element;
    }

    updateDOM(
        prevNode: ListItemNode,
        dom: HTMLElement,
        config: EditorConfig,
    ): boolean {
        super.updateDOM(prevNode, dom, config)
        const fontSize = getFontValueFromChildStyle(this.getChildren()[0]?.getStyle())

        // @ts-expect-error - this is always HTMLListItemElement
        dom.style.fontSize = fontSize;

        return false;
    }


    static importJSON(serializedNode: SerializedListItemNode): ListItemNode {
        const node = new ListItemNode(serializedNode.value, serializedNode.checked, serializedNode.style);
        node.setFormat(serializedNode.format);
        node.setDirection(serializedNode.direction);
        return node;
    }

    exportJSON(): SerializedListItemNode {
        return {
            ...super.exportJSON(),
            checked: this.getChecked(),
            type: 'listitem',
            value: this.getValue(),
            version: 1,
            style: this.getStyle()
        };
    }

}
