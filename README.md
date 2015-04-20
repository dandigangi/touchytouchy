![alt tag](touchytouchy-preview.jpg)

TouchyTouchy was a play around project that involved working with ReactJS, SASS, and Gulp.

Demo: http://dandigangi.github.io/touchytouchy/

## Gem Dependencies
- [SASS: >3](https://rubygems.org/gems/sass/versions/3.4.13)
- [Compass Core: >1](https://rubygems.org/gems/compass-core/versions/1.0.3)

## Installation

```sh
$ npm install
```

This project is not meant for production usage and uses ONLY developement depdencies including del, Gulp, numerous Gulp plugins and http-server.

## Start the Application

You can manually start a local server with http-server with the following:
```sh
$ http-server -p 8080 -a 127.0.0.1
```

## Gulp Tasks

Run all build tasks
```sh
$ gulp
```

Build javascript
```sh
$ gulp js
```

Build styles
```sh
$ gulp css
```

Compress images
```sh
$ gulp images
```

## Known Issues & TODOs
- There are hardcoded depdencies to my local installation via Homebrew of the SASS gem that is part of the Gulp build scripts. (gulp-ruby-sass plugin)

[Dan DiGangi]:http://dandigangi.me/
