import { xc } from 'xtal-element/lib/XtalCore.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
import { def } from './def.js';
/**
 * Define Web Component Declaratively
 * @element d-fine
 * @tag d-fine
 */
export class DFine extends HTMLElement {
    static is = 'd-fine';
    self = this;
    propActions = propActions;
    reactor = new xc.Rx(this);
    connectedCallback() {
        xc.mergeProps(this, slicedPropDefs);
    }
    onPropChange(n, prop, nv) {
        this.reactor.addToQueue(prop, nv);
    }
}
export const onFrom = ({ from, self }) => {
    const ceName = self.as || getCEName(from.split('/').pop());
    if (ceName === undefined || customElements.get(ceName))
        return;
    if (self.as === undefined)
        self.as = ceName;
    self.etc = upShadowSearch(self, from);
};
export const onPrevSib = ({ prevSib, as, self }) => {
    if (customElements.get(as))
        return;
    self.etc = self.previousElementSibling;
};
export const onTemplChild = ({ templChild, as, self }) => {
    getInnerTemplate(self, 0);
};
function getInnerTemplate(self, retries) {
    if (customElements.get(self.as))
        return;
    const templ = self.querySelector('template');
    if (templ === null) {
        if (retries > 2)
            throw "Inner template not found";
        setTimeout(() => {
            getInnerTemplate(self, retries + 1);
        }, 50);
        return;
    }
    self.etc = templ;
}
export const doDef = ({ etc, self }) => {
    def(etc, self);
};
export const propActions = [onFrom, onPrevSib, onTemplChild, doDef];
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
    as: strProp1,
    prevSib: boolProp1,
    templChild: boolProp1,
    etc: { ...objProp1, transience: 1000 },
    strProps: { ...objProp2, echoTo: 'sp' },
    numProps: { ...objProp2, echoTo: 'np' },
    objProps: { ...objProp2, echoTo: 'op' },
    boolProps: { ...objProp2, echoTo: 'bp' },
    propActionsForDef: objProp0,
    noshadow: boolProp0,
    styleTemplate: objProp0,
    //bt: strProp0,
    //bindTo: {...strProp0,'echoTo': 'bt'}
};
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(DFine, slicedPropDefs, 'onPropChange');
xc.define(DFine);
function getCEName(templateId) {
    if (templateId.indexOf('-') > -1)
        return templateId;
    return 'd-fine-' + templateId;
}
