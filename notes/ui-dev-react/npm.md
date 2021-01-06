# NPM

NPM is a package manager.
A **package** is like a jQuery plugin or a ruby gem. It's useable, shareable code for frameworks, libraries, components etc.

## Why should you use a package manager?

TBH I never thought about this, I just was like - yes okay this is what you do.

- helps with any potential CDN crashes (CDN = content distribution network)
- managing `<script>` order (dependencies)
- versioning

## NPM things to know

Need to install node and npm - i've already done this since i use it for work.

`npm init` sets up a new project directory for you

- node_modules: where package code lives (you don't need to track this with git, can just put in the .gitignore)
- package.json: list of packages, their versions and dependencies and some config

**dependency:** what's needed for the application to _run_
**devDependency:** what's needed to _develop_ the app
\*Note: whenever you add a new package, you need to run `npm install` (downloads everything in package.json)

**scripts:** automate tasks (npm start, npm build etc)
bonus - npm start is an alias for npm run start

**versioning:** v.1.2.3 - 1: major, 2: minor, 3: patch
`^` prefix will match the newest version with the same major
`~` prefix will match the newest version with same major _and_ minor
no prefix will be an exact match to all three
