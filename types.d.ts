import {PropAction} from 'xtal-element/types.d.js';

export interface defOptions {
    as: string,
    /** No shadow DOM */
    noshadow?: boolean,
    strProps?: string[],
    boolProps?: string[],
    numProps?: string[],
    objProps?: string[],
    propActionsForDef?: PropAction[],
    styleTemplate?: HTMLTemplateElement,
}

export interface DFineProps extends HTMLElement, defOptions{
    /**
     * Id of template (with an optional context path in front of the id).  
     * If "from" starts with "./", the search for the matching template is done within the shadow DOM of the c-c element 
     * (or outside any ShadowDOM if the (b-)c-c element is outside any ShadowDOM).  If from starts with "../" then the search is done one level up, etc.
     */
    from: string | undefined;

    /**
    * Get template from previous sibling.
    */
    fromPreviousSibling: boolean | undefined;

    /**
     * Shortcut for fromPrevSibling
     */
    fps: boolean | undefined;

    /**
     * @private
     * element to clone
     */
    etc: Element | undefined | null;

}