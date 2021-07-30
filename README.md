# d-fine

<a href="https://nodei.co/npm/d-fine/"><img src="https://nodei.co/npm/d-fine.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/d-fine">

d-fine provides a quick way of d-fining a mostly d-clarative custom element.

The template for the custom element can come from live HTML.  For example:

```html
<div>
    <div>Hello, <span data-target=place>world</span></div>
</div>
<d-fine from-previous-sibling as=hello-world str-props='["place"]' bind-to=data-target></d-fine>
<hello-world place=Mars></hello-world>
```

...generates:

```html
<div>
    <div>Hello, <span>world</span></div>
</div>
<hello-world place=Mars>
    #shadow
    Hello, Mars
</hello-world>
```

Shadow DOM can be circumvented by adding attribute "noshadow."

d-fine is part of the [p-et-alia](https://github.com/bahrus/p-et-alia) framework.  One of the goals of that framework is to allow the d-veloper to choose verbose, readable syntax, such as we we've seen above, or more compact markup for more advanced teams / repeated use.

The example below does the same thing, but with more compact notation.  D-fault values can also be specified, as see with place=Venus:

```html
<div>
    <div>Hello, <span data-target=place>world</span></div>
</div>
<d-fine fps as=hello-world sp='["place=Venus"]' bt=data-target></d-fine>
<hello-world place=Mars></hello-world>
<hello-world></hello-world>
```


...generates:

```html
<div>
    <div>Hello, <span>world</span></div>
</div>
<hello-world place=Mars>
    #shadow
    Hello, Mars
</hello-world>
<hello-world place=Venus>
    #shadow
    Hello, Venus
</hello-world>
```

The previous sibling can be a template to start with:

```html
<template>
    <div>Hello, {{place}}</div>
</template>
<d-fine fps as=hello-world sp='["place=Venus"]'></d-fine>
<hello-world place=Mars></hello-world>
<hello-world></hello-world>
```

The web component d-fine is a thin wrapper around the api d-fine/def.js.

