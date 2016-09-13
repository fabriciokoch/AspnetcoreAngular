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

Continue...