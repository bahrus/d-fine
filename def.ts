import {CE, Action, PropInfo, TRElementActions, TRElementProps} from 'trans-render/lib/CE.js';
import {TemplMgmtActions, TemplMgmtProps, tm} from 'trans-render/lib/mixins/TemplMgmtWithPEST.js';
import {DefineArgs} from 'trans-render/lib/types';
import {toTempl} from 'xodus/toTempl.js';
export function def<MCProps = any, MCActions = MCProps>(
    templ: Element,
    styles: CSSStyleSheet[],
    transform: object,
    noshadow: boolean,
    args: DefineArgs<MCProps, MCActions>)
    {
        const newArgs = {...args} as DefineArgs<any, any>;
        newArgs.mixins = [...(args.mixins || []), tm.TemplMgmtMixin];
        const doUpdateTransformProps = Object.keys(args.config.propDefaults || {});
        const templateToClone = toTempl(templ, templ.localName === args.config.tagName && templ.shadowRoot !== null);
        newArgs.complexPropDefaults = {
            ...(args.complexPropDefaults || {}),
            mainTemplate: templateToClone,
            initTransform:{},
            updateTransform: transform,
            noshadow,
        }
        newArgs.config.actions = {
            ...(args.config.actions || {}),
            ...tm.doInitTransform,
            doUpdateTransform:{
                ifKeyIn: doUpdateTransformProps,
            }
        };
        const ce = new CE<MCProps & TemplMgmtProps, MCActions & TemplMgmtActions>(newArgs);
        return ce.classDef!;
    }