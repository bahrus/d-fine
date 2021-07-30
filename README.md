# d-fine

<a href="https://nodei.co/npm/d-fine/"><img src="https://nodei.co/npm/d-fine.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/d-fine">

## Purpose

d-fine provides a quick way of d-fining a mostly d-clarative custom element.

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
    Hello, Mars
</hello-world>
```

Shadow DOM can be circumvented by adding attribute "noshadow."

d-fine is part of the [p-et-alia](https://github.com/bahrus/p-et-alia) framework.  One of the goals of that framework is to allow the d-veloper to choose verbose, r-adable syntax, such as w-'ve s--n above, or more compact markup for more advanced teams / rep-ated use.

The -xample below does the same thing, but with more compact notation.  D-fault values can also be specified, as s--n with place=Venus:

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

The web component d-fine is a thin wrapper around the api d-fined in d-fine/def.js.

## Abbreviations

<table>
    <thead>
        <tr>
            <th>Abbreviated Attribute Name</th>
            <th>Full Attribute Name</th>
        </tr>
    </thead>
    <tbody>
    <tr>
        <td>fps</td>
        <td>from-previous-sibling</td>
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

## Template Dependency Injection

Instead of specifying that the template should come from the previous sibling, the property/attribute "from" allows us to specify a host property name or id within the shadowDOM realm where the template is defined.  The host property name takes precedence.

A web component can thus define a default template within the ShadowDOM markup, but allow extending web components to define alternative templates, by defining properties with the same name, and assigning a template to those properties.

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




