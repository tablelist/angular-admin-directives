angular-admin-directives
========================

A collection of Angular Directives built for use in Tablelist's Internal Admin Tools.


## To-Do:

Extract each directive + dependencies into it's own module
Show/Preview resulting Mongo query from Query Builder

## Directives

### Form Builder

Form Builder takes in a configuration array, and generates the HTML for a bootstrap horizontal form. When editing data, we encountered a ton of repetition between our different types of data. In classic 'DRY' style, we abstracted the form construction logic out of the view templates, and into it's own directive.

* requires: bootstrap css, textAngular, ngSanitize

### Panel Builder

Panel builder used ng-transclude to render the provided HTML into bootstrap panels. For sites with a variety of panels, we found panel this directive to be a simple way of reducing redundant HTML in templates

* requires: bootstrap css

### Query Builder

Query Builder is a GUI tool for building complex MongoDB queries. By selecting parameters and comparators from dropdowns, query builder empowers our sales and marketing team to query our database for specific data.

* requires: bootstrap css, font awesome CSS icons, underscore.js

### Details Panel

Details Panel takes in a set of data, and renders the data in a format for the user to read. Reduces repetition in templating, and allows us to display various forms of data with very little HTML.

* requires: bootstrap css

## Installing Directives in your Angular Project

Just interested in the directives? Grab them from the /src/directives folder.

1.) Include files in your project
2.) Add


## Running the demo project

The following steps will instruct how to setup the demo site.

```
npm install
```

```
sudp npm install -g bower
bower install
```

## Special Thanks
Special thanks to:

#### [AngularJS](https://angularjs.org)

#### [Bootstrap](https://github.com/twbs/bootstrap)

#### [Generatedata.com](http://generatedata.com)*
*Note: Users.json is a randomly generated set of fake user data for demonstration purposes. I advice not to handle data this way in a production environment.

## Contributors:

* __Alex Johnson__ [@alexjohnson505](https://github.com/alexjohnson505)
* __Matt Etre__ [@mattetre](https://github.com/mattetre)
* __Andrew Barba__ [@AndrewBarba](https://github.com/AndrewBarba)
* __Nathan VanBenschoten__ [@nvanbenschoten](https://github.com/nvanbenschoten)
