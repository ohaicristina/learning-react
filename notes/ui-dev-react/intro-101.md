# Intro and Basics

Working through the UI.dev React course. It's using class components, and no hooks and plain JS. I'm already used to working with hooks and functional components and using TypeScript instead of plain JS. So really I learned React the harder way. It will be interesting to see if this helps me better connect to dots to concepts I feel like I'm missing.
(transcribed and lightly edited from pen & paper notes)

React is a **library** for building UIs by composing functions together to build the interface

Uses a unidirectional data flow (unlike jQuery which goes all over the place)

**Declarative:** describes what the UI looks like instead of how it works (imperative)
^ Helps us determine what the UI should look like in different states

Components are written in **JSX** (allows you to describe UI aka write HTML, in JavaScript).
HTML in JS makes browser angy.
React setup can be complicated because we need to do some grunt work to make the browser be able to render everything correctly.

## Things you need to make React work nicey nice

### Babel

JS compiler, transforms our code into regular old JS that the browser can understand (JSX -> JS

### Webpack

Bundles imports and exports them neatly
Replaces the numerous `<script>` tags you would need to include in your `index.html`, makes just one file that you need to import

### React Router

handles routing (rendering specific components on the page depending on the URL)
React doesn't come with routing baked in because it focuses solely on the UI

### Styling

This is always super controversial, people have strong opinions here, myself included
**Traditional:** using CSS (or a pre-processor) as a separate file with all the benefits of the cascade and global styles
**Untraditional:** using CSS in JS (blegh)
Can you guess which method I prefer?

### Redux

A package that makes state changes more predictable - not attached to React, can be used with other frameworks and libraries
We used to use this a lot at BevSpot, I did not like it. Using hooks is way easier IMO

## Imperative vs. Declarative Programming

### Imperative

- concerned with **how**
- ex: C, C++, Java
- seen as the "better" way to program but not always
- describes a control flow

### Declarative

- concerned with **what**
- ex: SQL, HTML
- lays over a layer of abstracted imperative programming
- independent of context so it can be used in different programs
- bonus: functional programming is a subset of declarative programming

\*Note: JS, Python, and C# can be both

> Object-Oriented languages require context. You want one thing but then you get all of it

## Composition vs. Inheritance

### Composition (what React is)

- what it does, not what it is
- functions are abstracted away from the class hierarchy

### Inheritance

- structure classes in terms of what they are
- doesn't take into account that the structures will inevitably change and things get wild and tangled up
