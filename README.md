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

## Libraries used:

### Github
- https://github.com/github-tools/github

### React 
- https://medium.com/@allizadrozny/using-webpack-and-react-with-jekyll-cfe137f8a2cc

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

## TODO

Tutorial on how to add new categories ?
