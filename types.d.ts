import {PropAction} from 'xtal-element/types.d.js';

export interface defOptions {
    as: string,
    noshadow?: boolean,
    stringProps?: string[],
    boolProps?: string[],
    numProps?: string[],
    objProps?: string[],
    propActions?: PropAction[],
    styleTemplate?: HTMLTemplateElement,
}