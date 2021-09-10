import { CE } from 'trans-render/lib/CE.js';
import { tm } from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import { toTempl } from 'xodus/toTempl.js';
export function def(templ, styles, transform, args) {
    const newArgs = { ...args };
    newArgs.mixins = [...args.mixins || [], tm.TemplMgmtMixin];
    const doUpdateTransformProps = Object.keys(args.config.propDefaults || {});
    const templateToClone = toTempl(templ, templ.localName === args.config.tagName && templ.shadowRoot !== null);
    newArgs.complexPropDefaults = {
        ...(args.complexPropDefaults || {}),
        mainTemplate: templateToClone,
        initTransform: {},
        updateTransform: transform,
    };
    newArgs.config.actions = {
        ...(args.config.actions || {}),
        ...tm.doInitTransform,
        doUpdateTransform: {
            ifKeyIn: doUpdateTransformProps,
        }
    };
    const ce = new CE(newArgs);
}
