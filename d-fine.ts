import {xc, PropAction, PropDef, PropDefMap, ReactiveSurface, IReactor} from 'xtal-element/lib/XtalCore.js';
import {DFineProps} from './types.d.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';
import {def} from './def.js';
/**
 * Define Web Component Declaratively
 * @element d-fine
 * @tag d-fine
 */
export class DFine extends HTMLElement implements ReactiveSurface{
    static is = 'd-fine';

    self=this;
    propActions = propActions;
    reactor: IReactor = new xc.Rx(this);

    connectedCallback(){
        xc.mergeProps(this, slicedPropDefs);
    }

    onPropChange(n: string, prop: PropDef, nv: any){
        this.reactor.addToQueue(prop, nv);
    }
}
export interface DFine extends DFineProps{}
type D = DFine;

export const onFrom = ({from, self} : D) => {
    const ceName = self.as || getCEName(from!.split('/').pop()!);
    if(ceName === undefined || customElements.get(ceName)) return;
    if(self.as === undefined) self.as = ceName;
    self.etc = upShadowSearch(self, from!);
}

export const onFPS = ({fps, as, self}: D) => {
    if(customElements.get(as)) return;
    self.etc = self.previousElementSibling;
}

export const onFPSExt = ({fromPreviousSibling, as, self}: D) => {
    if(customElements.get(as)) return;
    self.etc = self.previousElementSibling;
}

export const doDef = ({etc, self}: D) => {
    def(etc!, self);
}

export const propActions = [onFrom, onFPS, onFPSExt, doDef] as PropAction[];

export const baseProp: PropDef = {
    dry: true,
    async: true,
};

export const boolProp0: PropDef = {
    ...baseProp,
    type: Boolean,
};

export const boolProp1: PropDef = {
    ...boolProp0,
    stopReactionsIfFalsy: true,
};

export const strProp0: PropDef = {
    ...baseProp,
    type: String,
}

export const strProp1: PropDef = {
    ...strProp0,
    stopReactionsIfFalsy: true,
};

export const objProp0: PropDef = {
    ...baseProp,
    type:Object,
};

export const objProp1: PropDef = {
    ...objProp0,
    stopReactionsIfFalsy: true,
};

export const objProp2: PropDef = {
    ...objProp0,
    parse: true
};


const propDefMap: PropDefMap<D> = {
    from: strProp1,
    fps: boolProp1,
    as: strProp1,
    fromPreviousSibling: boolProp1,
    etc: objProp1,
    sp: objProp2,
    strProps: {...objProp2, echoTo:'sp'},
    np: objProp2,
    numProps: {...objProp2, echoTo:'np'},
    op: objProp2,
    objProps: {...objProp2, echoTo: 'op'},
    bp: objProp2,
    boolProps: {...objProp2, echoTo: 'bp'},
    propActionsForDef: objProp0,
    noshadow: boolProp0,
    styleTemplate: objProp0,
    bt: strProp0,
    bindTo: {...strProp0,'echoTo': 'bt'}
}
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(DFine, slicedPropDefs, 'onPropChange');
xc.define(DFine);

function getCEName(templateId: string) {
    if(templateId.indexOf('-') > -1) return templateId;
    return 'd-fine-' + templateId;
}