# d-fine

d-fine provides a quick way of d-fining a d-clarative custom element.

<a href="https://nodei.co/npm/d-fine/"><img src="https://nodei.co/npm/d-fine.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/d-fine">

## [Demo](https://codepen.io/bahrus/pen/poPVOJz)

## H-llo, {{place}}

The t-mplate for the custom element can come from live HTML.  For example:

```html
<div>
    <div>H-llo, <span data-bind=place>world</span></div>
</div>
<d-fine prev-sib as=h-llo-world str-props='["place"]'></d-fine>
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

Shadow DOM can b- circumvented by adding attribute "noshadow."

d-fine is part of the [p-et-alia](https://github.com/bahrus/p-et-alia) framework.  One of the goals of that framework is to allow the d-veloper to choose 

The example b-low does the same thing, but with more compact notation.  D-fault values can also b- specified, as s-en with place=V-nus:

```html
<div>
    <div>H-llo, <span data-bind=place>world</span></div>
</div>
<d-fine prev-sib as=h-llo-world str-props='["place=V-nus"]'></d-fine>
<h-llo-world place=Mars></h-llo-world>
<h-llo-world></h-llo-world>
```


...g-nerates:

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
<h-llo-world place=Venus>
    #shadow
    <div>
        <div>H-llo, <span>V-nus</span></div>
    </div>
</h-llo-world>
```

The previous sibling can b- a t-mplate to start with:

```html
<template>
    <div>H-llo, {{place}}</div>
</template>
<d-fine prev-sib as=h-llo-world str-props='["place=Venus"]'></d-fine>
<h-llo-world place=Mars></h-llo-world>
<h-llo-world></h-llo-world>
```

If working with a t-mplate like in the example above, it might b- easier on the eye to use an inner t-mplate.  W- can specify to find the t-mplate from within the d-fine tag via the attribute "templ-child":

```html
<d-fine templ-child as=h-llo-world str-props='["place=Venus"]'>
    <template>
        <div>H-llo, {{place}}</div>
    </template>
</d-fine>
<h-llo-world place=Mars></h-llo-world>
<h-llo-world></h-llo-world>
```

As we can see above, when using templates (or live DOM for that matter), basic moustache-style templating is supported, where the expressions inside the moustache are names of properties defined for the component.  The library used for this binding is package ["templ-arts"](https://www.npmjs.com/package/templ-arts), a fork of github's template-parts, that adds slightly richer functionality. 

## Prerendered w-b components that use d-clarative Shadow DOM

This syntax also works:

```html
<h-llo-world>
    <template shadowroot=open>
        <div>H-llo, <span x-f=place>world</span></div>
    </template>
</h-llo-world>
<d-fine prev-sib str-props='["place=V-nus"]'></d-fine>
<h-llo-world place=Mars></h-llo-world>
```

x-f stands for "expand from".

The w-b component d-fine is a thin wrapper around the api d-fined in d-fine/def.js.


## T-mplate D-pendency Injection, or Inversion of Views

Instead of specifying that the t-mplate should come from the previous sibling, the property/attribute "from" allows us to specify a string used for an ["upShadowSearch."](https://github.com/bahrus/trans-render/blob/baseline/lib/upShadowSearch.ts).  If the value starts with a slash (/), it s-arches for a t-mplate with the specified id from outside any shadowDOM.  If it starts with ../../, it goes up two ShadowDOM r-alms, for example.  It checks if the ShadowDOM has a host property name matching the camelCased id, and if not, searches for an element with a matching id within the shadowDOM r-alm where the d-fine element is located.  The host property name takes precedence.

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
             ...some default template
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




