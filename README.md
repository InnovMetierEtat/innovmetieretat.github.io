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
├── _includes         <---- Partials (header, footer, scripts, etc...)
├── index.html        <---- Main page
├── pages             <---- All other pages (methodes.html, modeles.html, etc...)
├── webpack           <---- Where all react code goes
├── assets      
│   └── javascripts
│       └── bundle.js <---- Where all the webpack generated code goes
├── js                <---- All non-react javascript files 
├── css               <---- Styles
├── files             <---- Documents
├── fonts             <---- Fonts
├── images            <---- Images
├── old               <---- Legacy website (needs to be removed)
├── graphiste         <---- Mockups & Design
├── _site             <---- Final generated website
└── xpage.html
```

## Libraries used:

### Github
- https://github.com/github-tools/github

### React 
- https://medium.com/@allizadrozny/using-webpack-and-react-with-jekyll-cfe137f8a2cc

## Local setup for review

- https://help.github.com/articles/setting-up-your-github-pages-site-locally-with-jekyll/

1. Install Ruby if you don't have it
2. Install bundler `$ gem install bundler`
3. `$ bundle install`
4. Run jekyll: `$ bundle exec jekyll serve`
5. In your browser go to: http://localhost:4000

## Local setup for development

### Install NPM & Node

If you don't have node install it, run:
```
$ [sudo] install npm -g
```

### Install dependencies

Then install webpack, which we will use to convert our JSX/ES6 files to JS:
```
$ npm install webpack -g
```

And if you haven't already, also install jekyll (for local development):
```
$ bundle install
```

### Write your code

All react code goes in `assets/javascripts/`

### Run your code

1. In a terminal tab, run `$ webpack --watch` to compile react to javascript
2. In another terminal tab, run `$ bundle exec jekyll serve`
3. In your browser go to http://localhost:4000

### Have fun!

