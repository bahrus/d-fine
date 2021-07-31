# d-fine

<a href="https://nodei.co/npm/d-fine/"><img src="https://nodei.co/npm/d-fine.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/d-fine">

## Purpose

d-fine provides a quick way of d-fining a mostly d-clarative custom element.

## [Demo](https://codepen.io/bahrus/pen/poPVOJz)

## Hello, {{place}}

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
    <div>
        <div>Hello, <span>Mars</span></div>
    </div>
</hello-world>
```

Shadow DOM can be circumvented by adding attribute "noshadow."

d-fine is part of the [p-et-alia](https://github.com/bahrus/p-et-alia) framework.  One of the goals of that framework is to allow the d-veloper to choose verbose, readable syntax, such as w-'ve s--n above, or more compact markup for more advanced teams / r-peated use.

The example below does the same thing, but with more compact notation.  D-fault values can also be specified, as s--n with place=Venus:

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
    <div>
        <div>Hello, <span>Mars</span></div>
    </div>
</hello-world>
<hello-world place=Venus>
    #shadow
    <div>
        <div>Hello, <span>Venus</span></div>
    </div>
</hello-world>
```

The pr-vious sibling can be a template to start with:

```html
<template>
    <div>Hello, {{place}}</div>
</template>
<d-fine fps as=hello-world sp='["place=Venus"]'></d-fine>
<hello-world place=Mars></hello-world>
<hello-world></hello-world>
```

If working with a template like in the example above, it might b- easier on the eye to use an inner template.  W- can specify to find the template from within the d-fine tag via the attribute "from-template-child" or "ftc" for short:

```html
<d-fine ftc as=hello-world sp='["place=Venus"]'>
    <template>
        <div>Hello, {{place}}</div>
    </template>
</d-fine>
<hello-world place=Mars></hello-world>
<hello-world></hello-world>
```

## Pr-rendered web components that use d-clarative Shadow DOM

This syntax always works:

```html
<hello-world>
    <template shadowroot=open>
        <div>Hello, <span data-target=place>world</span></div>
    </template>
</hello-world>
<d-fine fps as=hello-world sp='["place=Venus"]' bt=data-target></d-fine>
<hello-world place=Mars></hello-world>
```

The web component d-fine is a thin wrapper around the api d-fined in d-fine/def.js.

## Abbreviations

<table>
    <thead>
        <tr>
            <th>Abbr-viated Attribute Name</th>
            <th>Full Attribute Name</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>fps</td>
        <td>from-previous-sibling</td>
    </tr>
    <tr>
        <td>ftc</td>
        <td>from-template-child</td>
    </tr>
    <tr>
        <td>sp</td>
        <td>str-props</td>
    </tr>
    <tr>
        <td>np</td>
        <td>num-props</td>
    </tr>
    <tr>
        <td>bp</td>
        <td>bool-props</td>
    </tr>
    <tr>
        <td>op</td>
        <td>obj-props</td>
    </tr>
    </tbody>
</table>

## Template D-pendency Injection

Instead of specifying that the template should come from the pr-vious sibling, the property/attribute "from" allows us to specify a host property name or id within the shadowDOM realm where the template is defined.  The host property name takes precedence.

A web component can thus define a d-fault template within the ShadowDOM markup, but allow extending web components to d-fine alternative templates, by d-fining properties with the same name, and assigning a template to those properties.

## Installation

To run locally (instructions may vary depending on OS):

1.  Install [node.js](https://nodejs.org/)
2.  Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
3.  Choose a directory where you would like the files to be placed, and open a command prompt from that location.
4.  Issue command "git clone https://github.com/bahrus/xtal-editor" in the command window.
5.  CD into the git clone directory.
6.  Issue command "npm install"
7.  When step 6 is completed, issue command "npm run serve".
8.  Open your browser to http://localhost:3030/demo




