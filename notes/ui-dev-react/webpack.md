# Webpack

Okay webpack isn't so scary anymore. I still hate this kind of setup and config work, but I feel like I have a better understanding of what the hell is going on now. I used to just avoid it at all costs.

Webpack is a module bundler! modules -> bundler -> bundle.js
bundle.js then gets imported into your `index.html` instead of all the separate scrip tags.

Webpack can also make transformations while it's doing the bundling - for example, changing SCSS to CSS.
\*Note: something I should look into more is how this transformation is different from Babel's

## Setting up webpack.config.js

### 1. Entry point of your application

usually index.js

### 2. Transformations

out of the box, webpack can only process JS + JSON
loaders = help with everything else, come from npm

css-loader: tells webpack how to read CSS
style-loader: takes the css and injects it into a `<style>` tag in the DOM
tbh never knew what these actually did, always saw them and then just was like okay cool.
\*Note: should look into if there's other ways of importing your CSS that aren't from a `<style>` tag and what the pros and cons are

### 3. Export to `dist` directory

this is the bundled output of all your modules and transformations

### Plugins

allow you to execute tasks _after_ the bundle has been created

### Mode

production vs staging cs local dev

run webpack with npm start/build or another script
**webpack dev server:** local dev server for webpack, keeps track of changes without rebuilding the dist folder and supports live reloading

## Bonus: DOM vs. HTML

this is honestly feels like font vs. typeface in a way?
i always knew generally what each were but like i have to look up a technical definition to be able to describe them like i know what i'm talking about

**DOM:** (type: object) document object model, a series of objects that represent the structure of a document
**HTML**: (type: string) language for constructing the DOM
`
