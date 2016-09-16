# AspnetcoreAngular
A Single Page Application project using asp.net core and angularjs

# STEP-BY-STEP
Open your Visual Studio 2015 (make sure you have asp.net core installed) and create a new project called "WebApp" and choose an empty template:
![New Project](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image1.png "New Project")

Run the project and you should see a "Hello World!" on your browser.

Now let's add a MVC Controller to serve our initial page. We're gonna use this page for our Single Page Application (SPA).
After adding MVC dependencies our project.json should be like this:
![MVC Dependencies](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image2.png "MVC Dependencies")

Modify your startup.cs to add the MVC funcionality:
![add mvc](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image3.png "add mvc")
![use mvc](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image4.png "use mvc")

After that, create a MVC Controller called "HomeController" inside a new folder called "Controllers": 
![new mvc controller](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image5.png "new mvc controller")
![homecontroller](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image6.png "homecontroller")

Now, we need to create a MVC View Page for the Index action of the HomeController. This way, create a new folder "Views/Home" and add a new MVC View Page into the created folder:
![new mvc view](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image7.png "new mvc view")
![index](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image8.png "index")

Run the project and you should see our Index page on your browser.

Now, let's create a Web API Controller called "PersonController":
![personapi](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image9.png "personapi")

After that, create a new folder named "Models", and inside it, create a new class named "PersonModel" that will be our model class for our person api. The class will look like this:

![personmodel](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image10.png "personmodel") 

After creating our PersonModel class, let's modify the PersonController to use our model class. For this example, we will use only the "GET" method. This way, our PersonController will look like this:

![personapimodified](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image11.png "personapimodified") 

Run the project, access http://localhost:PORTNUMBER/api/person and you should see a list of "PersonModel" formatted as JSON:

![personlist](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image12.png "personlist") 

So far our project's structure looks like this:

![projectstructure](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image13.png "projectstructure") 

Now, let's create the client-side of our application.

We're gonna use npm to manage our client-side packages and grunt to run tasks that makes our lifes easier. Visual Studio comes already with a version of Node, NPM and GruntJS. But we can't control their version. So, I recommend you to download and install those tools in your computer.
Let's do this!

Download and install Nodejs with default options (https://nodejs.org/en/ - I choosed v4.5.0 LTS version).
If everything's ok you should be able to open a cmd prompt and check node and npm version:

![nodeversion](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image14.png "nodeversion")

Install GruntJS using npm (more info at http://gruntjs.com/getting-started):

![gruntinstall](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image15.png "gruntinstall")

After this, let's tell Visual Studio to use our recently installed tools.
On Visual Studio, open "Tools -> Options -> Projects and Solution -> External Web Tools" and set "$(PATH)" to be the first option:

![setpath](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image16.png "setpath")

Now, add a npm configuration file to configure our client-side packages. "Right-click -> Add New Item":

![packagejson](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image17.png "packagejson")

Then, add the a grunt configuration file to configure our tasks. "Right-click -> Add New Item": 

![gruntfile](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image18.png "gruntfile")

Now, let's configure "package.json" to set the packages we'll need:

```javascript
{
  "version": "1.0.0",
  "name": "asp.net",
  "private": true,
  "devDependencies": {

    "angular": "1.5.8",
    "angular-route": "1.5.8",
	"bootstrap": "3.3.7",

    "grunt": "1.0.1",
    "grunt-contrib-clean": "1.0.0",
    "grunt-contrib-concat": "1.0.1",
    "grunt-contrib-copy": "1.0.0",
    "grunt-run": "0.6.0"
  }
}
```

First we have our angular dependencies, then, the dependencies on grunt-tasks the we're gonna use. When you save the "package.json" file Visual Studio run the npm command to restore our client-side packages.


After that, let's configure our "Gruntfile.js" to create a default task:
```javascript
module.exports = function (grunt) {
  //load the tasks that we're gonna use
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-run');

  grunt.initConfig({
    //task to clean wwwroot and wwwroot/temp folder
    clean: {
      root: {
        src: ['wwwroot/**/*']
      },
      temp: {
        src: ['wwwroot/temp']
      }
    },
    //task to copy bootstrap fonts, htmls and css to wwwroot folder
    copy: {
      fonts: {
        files: [
          { expand: true, cwd: 'node_modules/bootstrap/dist/fonts/', src: ['**'], dest: 'wwwroot/fonts/' }
        ],
      },
      htmls: {
        files: [
          { expand: true, cwd: 'Scripts/', src: ['**/*.html'], dest: 'wwwroot/' },
        ],
      },
      csss: {
        files: [
          { expand: true, cwd: 'node_modules/bootstrap/dist/css', src: ['bootstrap.min.css'], dest: 'wwwroot/Style/' }
        ]
      },
    },
    //task to concat:
    //angular related files into a angular.js file
    //our app related files into a app.js file
    //
    //I create a temporary module.js and scripts.js and concatenate then into app.js 
    //to ensure our modules appear first in the app.js
    concat: {
      angular: {
        src: [
          'node_modules/angular/angular.min.js',
          'node_modules/angular-route/angular-route.min.js',
          'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
        ],
        dest: 'wwwroot/angular.js'
      },
      modules: {
        src: [
          'Scripts/app/**/*.module.js'
        ],
        dest: 'wwwroot/temp/modules.js'
      },
      scripts: {
        src: [
          'Scripts/app/**/*.js', '!Scripts/app/**/*.module.js', '!Scripts/app/**/*Spec.js'
        ],
        dest: 'wwwroot/temp/scripts.js'
      },
      app: {
        src: [
          'wwwroot/temp/modules.js', 'wwwroot/temp/scripts.js'
        ],
        dest: 'wwwroot/temp/app.js'
      }
    },
  });

  //register a default task to execute clean, copy, concat and clean:temp tasks
  grunt.registerTask('default', ['clean', 'copy', 'concat', 'clean:temp']);
};
``` 

With this "Gruntfile.js" we configured a few tasks and a "default" task that will:

- Clean our wwwroot folder;
- Copy our files (html, fonts and css) to wwwroot;
- Concatenate angular modules and our app's js files
- Clean our wwwroot/temp folder;

Now, let's run our "default" task. First, open the Task Runner Explorer: "View -> Other Windows -> Task Runner Explorer" and you'll see our task:

![taskrunnerexplorer](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image19.png "taskrunnerexplorer")

Right-click on "default" and hit "run". This will run our task and create the files in wwwroot folder:

![wwwrootfolder](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image20.png "wwwrootfolder") 

You can see that our "app.js" file isn't there. That's because we don't have yet any source files in the "Script" folder. 

continue...