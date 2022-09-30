import { observable, RepeatOptions } from "@microsoft/fast-element";
import { inject } from "@microsoft/fast-element/di";
import { FASTDataList } from "../index.js";
import { Virtualizer } from "./virtualizer.js";

/**
 *  The Virtual List class
 *
 * @public
 */
export class FASTVirtualList extends FASTDataList {
    @inject(Virtualizer) virtualizer!: Virtualizer;

    /**
     * The HTML ID of the viewport element.
     * If no viewport is set the default viewport is the element itself.
     * Note that viewportElement can be set directly as well.
     *
     * @public
     * @remarks
     * HTML Attribute: anchor
     */
    public viewport: string = "";
    // protected viewportChanged(): void {
    //     if (this.$fastController.isConnected) {
    //         this.viewportElement = this.getViewport();
    //         this.updateDimensions();
    //     }
    //}

    /**
     *
     *
     * @internal
     */
    public containerElement: HTMLElement;

    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        this.virtualizer.containerElement = this.containerElement;
    }

    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.virtualizer.containerElement = null;
    }

    protected getRepeatOptions(): RepeatOptions {
        //positioning is always true for virtual lists
        const options = super.getRepeatOptions();
        options.positioning = true;
        return options;
    }

    /**
     * Gets the viewport element by id, or defaults to element
     */
    private getViewport(): HTMLElement {
        let viewport: HTMLElement | null = null;
        const rootNode = this.getRootNode();

        if (rootNode instanceof ShadowRoot) {
            viewport = rootNode.getElementById(this.viewport);
        } else {
            viewport = document.getElementById(this.viewport);
        }

        return viewport ?? this;
    }
}
