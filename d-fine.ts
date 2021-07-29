import {xc, PropAction, PropDef, PropDefMap, ReactiveSurface, IReactor} from 'xtal-element/lib/XtalCore.js';
import {DFineProps} from './types.d.js';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';
/**
 * Define Web Component Declaratively
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
    const ceName = self.as || getCEName(from!.split('/').pop());
    if(ceName === undefined || customElements.get(ceName)) return;
    self.etc = upShadowSearch(self, from!)
}

export const propActions = [onFrom] as PropAction[];

export const baseProp: PropDef = {
    dry: true,
    async: true,
}

export const strProp1: PropDef = {
    ...baseProp,
    type: String,
}
const propDefMap: PropDefMap<D> = {
    from: strProp1,
    fps: strProp1,
    fromPrevSibling: {
        ...strProp1,
        echoTo: 'fps'
    }
}
const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
xc.letThereBeProps(DFine, slicedPropDefs, 'onPropChange');
xc.define(DFine);

function getCEName(templateId: string) {
    if(templateId.indexOf('-') > -1) return templateId;
    return 'd-fine-' + templateId;
}