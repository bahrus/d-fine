import {PropAction} from 'xtal-element/types.d.js';

export interface defOptions <TProps = any> {
    as: string,
    /** No shadow DOM */
    noshadow?: boolean,
    sp?: (keyof TProps & string)[],
    strProps?: (keyof TProps & string)[],
    bp?: (keyof TProps & string)[],
    boolProps?: (keyof TProps & string)[],
    np?: (keyof TProps & string)[],
    numProps?: (keyof TProps & string)[],
    op?: (keyof TProps & string)[],
    objProps?: (keyof TProps & string)[],
    propActionsForDef?: PropAction[],
    styleTemplate?: HTMLTemplateElement,
    //bindTo?: string | undefined;
    //bt?: string | undefined;
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

    fromChildTemplate: boolean | undefined;

    fct: boolean | undefined;

    /**
     * @private
     * element to clone
     */
    etc: Element | undefined | null;



}