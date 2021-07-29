# d-fine

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
<hello-world place=Mars>
    #shadow
    Hello, Mars
</hello-world>
```

Shadow DOM can be circumvented by adding attribute "noshadow."

d-fine is part of the [p-et-alia](https://github.com/bahrus/p-et-alia) framework.  One of the goals of that framework is to allow the developer to choose verbose, readable syntax, such as we we've seen above, or more compact markup for more advanced teams / repeated use:

```html
<div>
    <div>Hello, <span data-target=place>world</span></div>
</div>
<d-fine fps as=hello-world sp='["place"]' bt=data-target></d-fine>
<hello-world place=Mars></hello-world>
```