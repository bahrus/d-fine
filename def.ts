import { defOptions } from "./types";
import {xc, PropAction, PropDef, PropDefMap, ReactiveSurface, IReactor} from 'xtal-element/lib/XtalCore.js';
import {passAttrToProp} from 'xtal-element/lib/passAttrToProp.js';
import {toTempl} from 'xodus/toTempl.js';
//import { TemplateInstance } from "templ-arts/lib/index.js";

export function def<TProps = any>(templ: HTMLTemplateElement | Element, options: defOptions<TProps>){
    const templateToClone = toTempl(templ, templ.localName === options.as && templ.shadowRoot !== null);
    const propDefMap: PropDefMap<any> = {};
    const baseProp: PropDef = {
        async: true,
        dry: true,
        reflect: true
    };
    const defaults: any = {};
    const strProps = options.strProps;
    if(strProps !== undefined){
        for(const stringProp of strProps){
            const split = stringProp.split('=').map(s => s.trim());
            const prop: PropDef = {
                ...baseProp,
                type: String,
            };
            propDefMap[split[0]] = prop;
            if(split.length > 1){
                defaults[split[0]] = split[1];
            }
        }
    }
    const boolProps = options.boolProps;
    if(boolProps !== undefined){
        for(const boolProp of boolProps){
            const split = boolProp.split('=').map(s => s.trim());
            const prop: PropDef = {
                ...baseProp,
                type: Boolean,
            };
            propDefMap[split[0]] = prop;
            if(split.length > 1){
                defaults[split[0]] = JSON.parse('"' + split[1] + '"');
            }
        }        
    }
    const numProps = options.numProps;
    if(numProps !== undefined){
        for(const numProp of numProps){
            const split = numProp.split('=').map(s => s.trim());
            const prop: PropDef = {
                ...baseProp,
                type: Number,
            };
            propDefMap[split[0]] = prop;
            if(split.length > 1){
                const val = split[1];
                defaults[split[0]] = val.includes('.') ? parseFloat(val) : parseInt(val);
            }
        }        
    }
    const objProps = options.objProps;
    if(objProps !== undefined){
        for(const objProp of objProps){
            const split = objProp.split('=').map(s => s.trim());
            const prop: PropDef = {
                ...baseProp,
                type: Object,
                reflect: false,
            };
            propDefMap[split[0]] = prop;
            if(split.length > 1){
                defaults[split[0]] = JSON.parse(split[1]);
            }
        }
    } 
    const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
    class newClass extends HTMLElement implements ReactiveSurface{
        static is = options.as;
        static observedAttributes = [...slicedPropDefs.boolNames, ...slicedPropDefs.numNames, ...slicedPropDefs.strNames];
        self = this;
        propActions = options.propActionsForDef || []  as PropAction[];
        reactor: IReactor = new xc.Rx(this);
        attributeChangedCallback(name: string, oldValue: string, newValue: string){
            passAttrToProp(this, slicedPropDefs, name, oldValue, newValue);
        }



        async connectedCallback(){
            if(this.tpl !== undefined) return;
            xc.mergeProps(this, slicedPropDefs, defaults);
            if(!options.noInlineBind){
                const {TemplateInstance} = await import('templ-arts/lib/index.js');
                this.tpl = new TemplateInstance(templateToClone!, this) as any as HTMLTemplateElementExt;
            }else{
                this.tpl = templateToClone as HTMLTemplateElementExt;
            }
            this.commitTemplate();

        }

        commitTemplate(){
            if(options.noshadow){
                this.appendChild(this.tpl!);
            }else{
                const shadowRoot = this.attachShadow({mode: 'open'});
                if(options.styleTemplate !== undefined){
                    const clone = options.styleTemplate.content.cloneNode(true);
                    shadowRoot.appendChild(clone);
                }
                shadowRoot.appendChild(this.tpl!);
            }
        }

        onPropChange(name: string, propDef: PropDef, newVal: any){
            this.reactor.addToQueue(propDef, newVal);
            if(this.tpl === undefined || this.tpl.update === undefined) return;
            this.tpl.update(this);
        }

        /**
        * @private
        */
        tpl: HTMLTemplateElementExt | undefined;
    }
    xc.letThereBeProps(newClass, slicedPropDefs, 'onPropChange');
    xc.define(newClass);
    return newClass;
}

export interface HTMLTemplateElementExt extends HTMLTemplateElement{
    update(model: any): void;
}