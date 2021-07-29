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