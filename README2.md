# d-fine

d-fine provides a quick way of d-fining a d-clarative custom element.

<a href="https://nodei.co/npm/d-fine/"><img src="https://nodei.co/npm/d-fine.png"></a>

<img src="https://badgen.net/bundlephobia/minzip/d-fine">

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
        "span": ["place"] 
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

The previous sibling can b- a t-mplate to start with:

```html
<template>
    <div></div>
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

If working with a t-mplate like in the example above, it might b- easier on the eye to use an inner t-mplate.  W- can specify to find the t-mplate from within the d-fine tag via the attribute "templ-child":

```html

<d-fine 
   prev-sib 
   as=h-llo-world 
   prop-defaults='{"place": "V-nus"}'
    transform='{
        "divElements": ["H-llo", "place"] 
    }'
>
<template>
    <div></div>
</template>
</d-fine>
<h-llo-world place=Mars></h-llo-world>
<h-llo-world></h-llo-world>
```

