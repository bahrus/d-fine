import {CE} from 'trans-render/lib/CE.js';
import {DFineProps, DFineActions} from 'types';
import {upShadowSearch} from 'trans-render/lib/upShadowSearch.js';
import {def} from './def2.js';

/**
 * Define Web Component Declaratively
 * @element d-fine
 * @tag d-fine
 */
export class DFineCore extends HTMLElement implements DFineActions{
    
    static getCEName(templateId: string){
        if(templateId.indexOf('-') > -1) return templateId;
        return 'd-fine-' + templateId;
    }

    static getInnerTemplate(self: DFineCore, retries: number){
        if(customElements.get(self.as)) return;
        const templ = self.querySelector('template');
        if(templ === null){
            if(retries > 2) throw "Inner template not found";
            setTimeout(() => {
                DFineCore.getInnerTemplate(self, retries + 1);
            }, 50)
            return;
        }
        self.etc = templ;
    }

    doFrom({from, as}: this){
        const ceName = as || DFineCore.getCEName(from!.split('/').pop()!);
        if(ceName === undefined || customElements.get(ceName)) return;
        if(as === '') this.as = ceName;
        return {
            etc: upShadowSearch(this, from!)!,
        }
    }
    
    doPrevSib({as, previousElementSibling}: this){
        const ln = previousElementSibling!.localName;
        const ceName = as || ln;
        if(ceName === undefined) return;
        if(customElements.get(ceName)) return;
        if(as === '') this.as = ceName;
        return{
            etc: previousElementSibling!,
        }
    }

    doTemplChild({}: this){
        DFineCore.getInnerTemplate(this, 0);
    }

    doDef({propDefaults, as, etc, transform}: this){
        def(etc, [], transform, {
            config:{
                tagName: as,
                propDefaults: propDefaults
            }
        });
    }
}

export interface DFineCore extends DFineProps{}

const ce = new CE<DFineProps & HTMLElement, DFineActions>({
    config:{
        tagName: 'd-fine',
        propDefaults:{
            as: '',
            from: '',
            prevSib: false,
            propDefaults:{},
            transform:{},
        },
        actions:{
            doFrom:{
                ifAllOf:['from'],
                ifKeyIn: ['as']
            },
            doPrevSib:{
                ifAllOf:['previousElementSibling', 'prevSib'],
                ifKeyIn: ['as']
            },
            doDef:{
                ifAllOf:['etc', 'as']
            }
        }
    },
    superclass: DFineCore
});