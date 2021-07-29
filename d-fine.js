import { xc } from 'xtal-element/lib/XtalCore.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
import { def } from './def.js';
/**
 * Define Web Component Declaratively
 * @element d-fine
 * @tag d-fine
 */
export class DFine extends HTMLElement {
    constructor() {
        super(...arguments);
        this.self = this;
        this.propActions = propActions;
        this.reactor = new xc.Rx(this);
    }
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
DFine.is = 'd-fine';
export const onFrom = ({ from, self }) => {
    const ceName = self.as || getCEName(from.split('/').pop());
    if (ceName === undefined || customElements.get(ceName))
        return;
    if (self.as === undefined)
        self.as = ceName;
    self.etc = upShadowSearch(self, from);
};
export const onFPS = ({ fps, as, self }) => {
    if (customElements.get(as))
        return;
    self.etc = self.previousElementSibling;
};
export const onFPSExt = ({ fromPreviousSibling, as, self }) => {
    if (customElements.get(as))
        return;
    self.etc = self.previousElementSibling;
};
export const doDef = ({ etc, self }) => {
    def(etc, self);
};
export const propActions = [onFrom, onFPS, onFPSExt, doDef];
export const baseProp = {
    dry: true,
    async: true,
};
export const boolProp0 = {
    ...baseProp,
    type: Boolean,
};
export const boolProp1 = {
    ...boolProp0,
    stopReactionsIfFalsy: true,
};
export const strProp0 = {
    ...baseProp,
    type: String,
};
export const strProp1 = {
    ...strProp0,
    stopReactionsIfFalsy: true,
};
export const objProp0 = {
    ...baseProp,
    type: Object,
};
export const objProp1 = {
    ...objProp0,
    stopReactionsIfFalsy: true,
};
export const objProp2 = {
    ...objProp0,
    parse: true
};
const propDefMap = {
    from: strProp1,
    fps: boolProp1,
    as: strProp1,
    fromPreviousSibling: boolProp1,
    etc: objProp1,
    sp: objProp2,
    strProps: { ...objProp2, echoTo: 'sp' },
    np: objProp2,
    numProps: { ...objProp2, echoTo: 'np' },
    op: objProp2,
    objProps: { ...objProp2, echoTo: 'op' },
    bp: objProp2,
    boolProps: { ...objProp2, echoTo: 'bp' },
    propActionsForDef: objProp0,
    noshadow: boolProp0,
    styleTemplate: objProp0,
    bt: strProp0,
    bindTo: { ...strProp0, 'echoTo': 'bt' }
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(DFine, slicedPropDefs, 'onPropChange');
xc.define(DFine);
function getCEName(templateId) {
    if (templateId.indexOf('-') > -1)
        return templateId;
    return 'd-fine-' + templateId;
}
