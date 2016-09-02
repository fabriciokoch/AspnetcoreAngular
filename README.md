# AspnetcoreAngular
A simple CRUD project using asp.net core and angularjs

STEP-BY-STEP
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