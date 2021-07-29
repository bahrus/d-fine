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

export const onFPS = ({fps, self}: D) => {
    self.etc = self.previousElementSibling;
}

export const onFPSExt = ({fromPreviousSibling, self}: D) => {
    self.etc = self.previousElementSibling;
}

export const doDef = ({as, etc, self}: D) => {
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

export const strProp1: PropDef = {
    ...baseProp,
    type: String,
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
    strProps: objProp2,
    numProps: objProp2,
    objProps: objProp2,
    boolProps: objProp2,
    propActionsForDef: objProp0,
    noshadow: boolProp0,
    styleTemplate: objProp0,
}
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(DFine, slicedPropDefs, 'onPropChange');
xc.define(DFine);

function getCEName(templateId: string) {
    if(templateId.indexOf('-') > -1) return templateId;
    return 'd-fine-' + templateId;
}