import { CE } from 'trans-render/lib/CE.js';
import { upShadowSearch } from 'trans-render/lib/upShadowSearch.js';
import { def } from './def2.js';
/**
 * Define Web Component Declaratively
 * @element d-fine
 * @tag d-fine
 */
export class DFineCore extends HTMLElement {
    static getCEName(templateId) {
        if (templateId.indexOf('-') > -1)
            return templateId;
        return 'd-fine-' + templateId;
    }
    static getInnerTemplate(self, retries) {
        if (customElements.get(self.as))
            return;
        const templ = self.querySelector('template');
        if (templ === null) {
            if (retries > 2)
                throw "Inner template not found";
            setTimeout(() => {
                DFineCore.getInnerTemplate(self, retries + 1);
            }, 50);
            return;
        }
        self.etc = templ;
    }
    doFrom({ from, as }) {
        const ceName = as || DFineCore.getCEName(from.split('/').pop());
        if (ceName === undefined || customElements.get(ceName))
            return;
        if (as === '')
            this.as = ceName;
        return {
            etc: upShadowSearch(this, from),
        };
    }
    doPrevSib({ as, previousElementSibling }) {
        const ln = previousElementSibling.localName;
        const ceName = as || ln;
        if (ceName === undefined)
            return;
        if (customElements.get(ceName))
            return;
        if (as === '')
            this.as = ceName;
        return {
            etc: previousElementSibling,
        };
    }
    doTemplChild({}) {
        DFineCore.getInnerTemplate(this, 0);
    }
    doDef({ propDefaults, as, etc, transform }) {
        def(etc, [], transform, {
            config: {
                tagName: as,
                propDefaults: propDefaults
            }
        });
    }
}
const ce = new CE({
    config: {
        tagName: 'd-fine',
        propDefaults: {
            as: '',
            from: '',
            prevSib: false,
            propDefaults: {},
            transform: {},
        },
        actions: {
            doFrom: {
                ifAllOf: ['from'],
                ifKeyIn: ['as']
            },
            doPrevSib: {
                ifAllOf: ['previousElementSibling', 'prevSib'],
                ifKeyIn: ['as']
            },
            doDef: {
                ifAllOf: ['etc', 'as']
            }
        }
    },
    superclass: DFineCore
});
