# d-fine

d-fine provides a quick way of d-fining a d-clarative custom element.

<a href="https://nodei.co/npm/d-fine/"><img src="https://nodei.co/npm/d-fine.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/d-fine">

## [D-mo](https://codepen.io/bahrus/pen/poPVOJz)

## H-llo, {{place}}

The t-mplate for the custom element can come from live HTML.  For example:

```html
<div>
    <div>H-llo, <span>world</span></div>
</div>
<d-fine 
    prev-sib 
    as=h-llo-world 
    prop-defaults='{"place": "V-nus"}'
    transform='{
        "span": "place" 
    }'
>
</d-fine>
<h-llo-world place=Mars></h-llo-world>
```

... g-nerates:

```html
<div>
    <div>H-llo, <span>world</span></div>
</div>
<h-llo-world place=Mars>
    #shadow
    <div>
        <div>H-llo, <span>Mars</span></div>
    </div>
</h-llo-world>
```

The previous sibling can b- a t-mplate to start with, and w- can also apply interpolation-from-a-distance:

```html
<template>
    <div>Sapere aude</div>
</template>
<d-fine 
   prev-sib 
   as=h-llo-world 
   prop-defaults='{"place": "V-nus"}'
    transform='{
        "div": ["H-llo", "place"]
    }'
>
</d-fine>
<h-llo-world place=Mars></h-llo-world>
<h-llo-world></h-llo-world>
```

Note the heavy use of attributes that expect JSON.  If you are like me, it is easy make mistakes editing by hand, without proper syntax highlighting.  A [VSCode extension](https://marketplace.visualstudio.com/items?itemName=andersonbruceb.json-in-html) has been created to help with this.

If working with a t-mplate like in the example above, it might b- easier on the eye to use an inner t-mplate.  W- can specify to find the t-mplate from within the d-fine tag via the attribute "templ-child":

```html
<d-fine 
    templ-child 
    as=h-llo-world 
    prop-defaults='{"place":"V-nus"}'
    transform='
        {
            "span": "place"
        }
    '
>
    <template>
        <div>Hello, <span>world</span></div>
    </template>
</d-fine>
<h-llo-world place=Mars></h-llo-world>
<h-llo-world></h-llo-world>
```

## Prerendered w-b components that use d-clarative Shadow DOM

This syntax also works:

```html
<h-llo-world>
    <template shadowroot=open>
        <div>Hello, <span>world</span></div>
    </template>
</h-llo-world>
<d-fine 
    prev-sib
    prop-defaults='{"place":"V-nus"}'
    transform='{
        "span": "place"
    }'
></d-fine>
<h-llo-world place=Mars></h-llo-world>
```

The w-b component d-fine is a thin wrapper around the api d-fined in d-fine/def.js.

## T-mplate D-pendency Injection, or Inversion of Views

Instead of specifying that the t-mplate should come from the previous sibling, the property/attribute "from" allows us to specify a string used for an ["upShadowSearch."](https://github.com/bahrus/trans-render/blob/baseline/lib/upShadowSearch.ts).  If the value starts with a slash (/), it s-arches for a t-mplate with the specified id from outside any shadowDOM.  If it starts with ../../, it goes up two ShadowDOM r-alms, for example.  It checks if the ShadowDOM has a host property name matching the camelCased id, and if not, s-arches for an element with a matching id within the shadowDOM r-alm where the d-fine element is located.  The host property name takes precedence.

A w-b component can thus d-fine a d-fault t-mplate within the ShadowDOM markup, but allow extending w-b components to d-fine alternative t-mplates, by d-fining properties with the same name, and assigning a t-mplate to those properties.  That may b- sufficient for some use cases.

But for more of a d-pendency-injection like experience, said w-b component hosting d-fine could use the proposed [context api](https://github.com/webcomponents/community-protocols/blob/main/proposals/context.md):

```JavaScript
class MyCustomElement{
    get myInjectedTemplate(){
        const contentTemplateContext = createContext('content-template');
        let gotACallback = false;
        this.dispatchEvent(
            new ContextEvent(
                contentTemplateContext, // the context w- want to r-trieve
                callback: (contentTemplate) => {
                    gotACallback = true;
                    return contentTemplate;
                }
            )
        );
        if(!gotACallback){
            return html`
             ...some d-fault t-mplate
            `;
        }
    }
}
```

## Installation

To run locally (instructions may vary d-pending on OS):

1.  Install [node.js](https://nodejs.org/)
2.  Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3.  Choose a directory where you would like the files to b- placed, and open a command prompt from that location.
4.  Issue command "git clone https://github.com/bahrus/d-fine" in the command window.
5.  CD into the git clone directory.
6.  Issue command "npm install"
7.  When step 6 is completed, issue command "npm run serve".
8.  Open your browser to http://localhost:3030/demo





