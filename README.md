# APIE - Kit de l'innovation métier

## Architecture

```
innovmetieretat.github.io/
├── README.md         <---- This file
├── Gemfile           <---- Local dev dependencies (Jekyll mainly)
├── Gemfile.lock      <---- Don't touch
├── package.json      <---- Javascript dependencies (npm, react, babel)
├── webpack.config.js <---- Webpack configuration
├── _config.yml       <---- Jekyll configuration
├── _layouts          <---- Layout
├── _includes         <---- Partials (header, footer, scripts, widgets loaders, etc...)
├── index.html        <---- Main page
├── pages             <---- All other pages (methodes.html, modeles.html, etc...)
├── webpack           <---- Where all widgets/react code goes
├── assets 
│   ├── images        <---- Where all images used in widgets goes
│   └── javascripts
│       └── bundle.js <---- Where all the webpack generated code goes
├── js                <---- All non-react javascript files 
├── css               <---- Styles
├── files             <---- All documents hosted on the platform
├── fonts             <---- Fonts
├── images            <---- Images
├── old               <---- Legacy website (needs to be removed)
├── graphiste         <---- Mockups & Design
└── xpage.html
```

## Handled document types

- Open source: `"PDF", "ODT", "ODS", "ODP", "ODG"," ODC", "ODF", "ODB", "ODI", "ODM", "OTT", "OTS", "OTP", "OTG"`
- Closed source: `"DOC", "DOCX", "PPT", "PPTX", "XLS", "XLSX"` 
- Images: `"PNG", "JPG", "JPEG", "GIF"`

## Libraries used:

### Github
- https://github.com/github-tools/github

### React 
- https://medium.com/@allizadrozny/using-webpack-and-react-with-jekyll-cfe137f8a2cc

### Viewer
- ViewerJS
- Microsoft official viewer

### Misc
- Lodash: https://lodash.com
- Dates: https://momentjs.com/
- Pinterest-like layout: https://github.com/tsuyoshiwada/react-stack-grid

## Local setup for review

Inspired by: https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/

1. Clone the repository:
```bash
$ git clone https://github.com/InnovMetierEtat/innovmetieretat.github.io.git
```

2. Install Ruby if you don't have it (http://rbenv.org/).

3. Install bundler 
```bash
$ gem install bundler
```

3. Go in the cloned directory and run bundle install:
```bash
$ cd innovmetieretat.github.io/
$ bundle install
```

4. Run jekyll (you might not need the `bundle exec`): 
```bash
$ bundle exec jekyll serve
```

5. In your browser go to: http://localhost:4000

## Local setup for development

First of all, **follow previous instructions** for local review.

### Install NPM & Node

If you don't have node install it, run:
```bash
$ [sudo] install npm -g
```

### Install dependencies

Then install webpack, which we will use to convert our JSX/ES6 files to JS:
```bash
$ npm install webpack -g
```

And if you haven't already, also install jekyll (for local development). Make sure you are in the right folder (where the `Gemfile` is)
```bash
$ cd innovmetieretat.github.io/ 
$ bundle install
```

Make sure you install all javascript dependencies too. Make sure once again that you are in the right folder (where the `package.json` file is):
```bash
$ cd innovmetieretat.github.io/ 
$ npm install
```

### Write your code

- Make sure you are on the `development` branch and up to date:

```bash
$ git checkout development
$ git pull origin development
```

- The main starting point of the react code is `webpack/entry.js`.
- All the react code/files are also in the `webpack/` folder.

### Run your code

1. In a terminal tab, run `$ webpack --watch` to compile react/ES6 to javascript;
2. In another terminal tab, run `$ bundle exec jekyll serve` to build the website;
3. In your browser go to http://localhost:4000

### Have fun!

# Guides

## Adding a new subcategory of documents

Current categories are:
```
créativité
autres
communication
documentation
inventions
juridique
lieux et évènements
marchés publics
parangonnage
technologie
```

If you ever wish to add a new one, a few things need to be done:
- First, you need to add a folder for the category in: 
  - `files/1.méthodes/`
  - `files/2.modèles/`
  - `files/3.cas-d-usages/`

- Once done, go to the file https://github.com/InnovMetierEtat/innovmetieretat.github.io/blob/development/webpack/config/categories.js#L16, and add your own shortname for the category.
- Don't forget to also go to https://github.com/InnovMetierEtat/innovmetieretat.github.io/blob/development/webpack/config/categories.js#L34 and add a color for your category. A full display of colors can be found in https://github.com/InnovMetierEtat/innovmetieretat.github.io/tree/development/assets/images/pictos, where the name of files are `picto-[primarycategory]-[color].png` 
- Then you'll need to make sure you've added your category to the menu: https://github.com/InnovMetierEtat/innovmetieretat.github.io/blob/development/webpack/components/RessourcesWidget.jsx#L190, don't forget to use the shortname you have defined during step [2] !
- If you ever want to add more color or modify the associated styles for categories/colors, the css is there: https://github.com/InnovMetierEtat/innovmetieretat.github.io/blob/master/css/templatemo_style.css#L518


## Adding new places ("lieux")

For "lieux", everything takes places in this file: https://github.com/InnovMetierEtat/innovmetieretat.github.io/blob/master/_includes/widgets/map.html#L7

Each place has a set of information attached:
```javascript
   markers: [
     {
       lat: -0.1279688,         // Latitude
       lng: 51.5077286,         // Longitude
       color: 'applegreen',     // Color used for the picto (see assets/images/pictos)
       icon: 'idea',            // Category used for the picto (see assets/images/pictos)
       url: 'http://google.com' // Page on which to go to when clicking on the icon
     },
     {
       lat: -0.119623, 
       lng: 51.503308,
       color: 'purple',
       icon: 'usecase',
       url: 'http://google.com'
     },
     // [...]
   ]
```
Adding a new one is as simple as adding a new entry to this array.

## Adding a new testimony

All testimony reside inside the folder: https://github.com/InnovMetierEtat/innovmetieretat.github.io/tree/master/pages/temoignages

If you want to add a new one, just create a new file with this basic layout:

```html
---
title: Georges B.
permalink: parole-georges.html
layout: default
---

<div>
  <div class="apie-header viewer-header blue-border">
    <img class="img-responsive center-block" src="assets/images/pictos/picto-usecase-blue.png" />
    <div class="viewer-primary page-category">
      Parole d'innovateur
      <div class="header-separator"></div>
    </div>
    <div class="page-title blue-font">
      Georges B.
    </div>
  </div>
  <div class="testimony-container">
    Lorem ipsum.
  </div>
</div>
```
Be clever and modify the relevant parts ;)

Then once you are done with your page, link it in the homepage like we did here: https://github.com/InnovMetierEtat/innovmetieretat.github.io/blob/master/index.html#L175

Et voilà!
