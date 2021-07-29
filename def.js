import { xc } from 'xtal-element/lib/XtalCore.js';
import { passAttrToProp } from 'xtal-element/lib/passAttrToProp.js';
import { TemplateInstance } from 'templ-arts/lib/index.js';
export function def(templ, options) {
    let templateToClone = templ;
    if (!(templateToClone instanceof HTMLTemplateElement)) {
        templateToClone = document.createElement('template');
        templateToClone.innerHTML = templ.innerHTML;
    }
    const propDefMap = {};
    const baseProp = {
        async: true,
        dry: true,
        reflect: true
    };
    const defaults = {};
    if (options.strProps !== undefined) {
        for (const stringProp of options.strProps) {
            const split = stringProp.split('=').map(s => s.trim());
            const prop = {
                ...baseProp,
                type: String,
            };
            propDefMap[split[0]] = prop;
            if (split.length > 1) {
                defaults[split[0]] = split[1];
            }
        }
    }
    if (options.boolProps !== undefined) {
        for (const boolProp of options.boolProps) {
            const split = boolProp.split('=').map(s => s.trim());
            const prop = {
                ...baseProp,
                type: Boolean,
            };
            propDefMap[split[0]] = prop;
            if (split.length > 1) {
                defaults[split[0]] = JSON.parse('"' + split[1] + '"');
            }
        }
    }
    if (options.numProps !== undefined) {
        for (const numProp of options.numProps) {
            const split = numProp.split('=').map(s => s.trim());
            const prop = {
                ...baseProp,
                type: Number,
            };
            propDefMap[split[0]] = prop;
            if (split.length > 1) {
                const val = split[1];
                defaults[split[0]] = val.includes('.') ? parseFloat(val) : parseInt(val);
            }
        }
    }
    if (options.objProps !== undefined) {
        for (const objProp of options.objProps) {
            const split = objProp.split('=').map(s => s.trim());
            const prop = {
                ...baseProp,
                type: Object,
                reflect: false,
            };
            propDefMap[split[0]] = prop;
            if (split.length > 1) {
                defaults[split[0]] = JSON.parse(split[1]);
            }
        }
    }
    const slicedPropDefs = xc.getSlicedPropDefs(propDefMap);
    class newClass extends HTMLElement {
        constructor() {
            super(...arguments);
            this.self = this;
            this.propActions = options.propActionsForDef || [];
            this.reactor = new xc.Rx(this);
        }
        attributeChangedCallback(name, oldValue, newValue) {
            passAttrToProp(this, slicedPropDefs, name, oldValue, newValue);
        }
        connectedCallback() {
            if (this.tpl !== undefined)
                return;
            xc.mergeProps(this, slicedPropDefs, defaults);
            this.tpl = new TemplateInstance(templateToClone, this);
            if (options.noshadow) {
                this.appendChild(this.tpl);
            }
            else {
                const shadowRoot = this.attachShadow({ mode: 'open' });
                if (options.styleTemplate !== undefined) {
                    const clone = options.styleTemplate.content.cloneNode(true);
                    shadowRoot.appendChild(clone);
                }
                shadowRoot.appendChild(this.tpl);
            }
        }
        onPropChange(name, propDef, newVal) {
            this.reactor.addToQueue(propDef, newVal);
            if (this.tpl === undefined)
                return;
            this.tpl.update(this);
        }
    }
    newClass.is = options.as;
    newClass.observedAttributes = [...slicedPropDefs.boolNames, ...slicedPropDefs.numNames, ...slicedPropDefs.strNames];
    xc.define(newClass);
}
