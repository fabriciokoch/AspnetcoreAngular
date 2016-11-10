# Part 2
Itens in this tutorial:
* Including tests for the Part 1;
* C# unit tests;
* C# integration tests;
* AngularJS unit tests (with jasmine);

# STEP-BY-STEP
In Part 2 we're gonna add testing to our project [created in Part 1.](https://github.com/fabriciokoch/AspnetcoreAngular/tree/master/Part1)

We're gonna use [xUnit](https://xunit.github.io/) to test our C# code.

So, add a new Class Library (.net core) project named "Test" to our solution:

![test Project](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image29.png "test Project")

Now, let's add a reference to our WebApp and xUnit packages in our project.json:

```javascript
{
  "version": "1.0.0-*",

  "dependencies": {
    "NETStandard.Library": "1.6.0",
    "WebApp": "1.0.0-*",
    "xunit": "2.2.0-beta2-build3300",
    "dotnet-test-xunit": "2.2.0-preview2-build1029"
  },

  "frameworks": {
    "netcoreapp1.0": {
      "dependencies": {
        "Microsoft.NETCore.App": {
          "type": "platform",
          "version": "1.0.0"
        }
      }
    }
  }
}
```

Now, modify the PersonModel class to add a new rule to test:

```cs
public class PersonModel {
public string FirstName { get; set; }
public string LastName { get; set; }

private DateTime dateOfBirth;
public DateTime DateOfBirth    {
  get{
	return dateOfBirth;
  }
  set{
	if (value > DateTime.Today)
	  throw new ArgumentOutOfRangeException("Date of birth can not be greater than today.");
	dateOfBirth = value;
  }
}
}
```

In the Test project, add a new class named "PersonModelTest" to test our "PersonModel" class.

![personmodeltest](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image30.png "personmodeltest")

Now, let's create a method to test the rule created before:

```cs
public class PersonModelTest {
  [Fact]
  public void DateOfBirthShouldBeADateInThePast() {
    PersonModel person = new PersonModel();

    DateTime validDate = DateTime.Today.AddDays(-1);
    person.DateOfBirth = validDate;
    Assert.True(person.DateOfBirth == validDate);
    DateTime invalidDate = DateTime.Today.AddDays(1);
    Assert.Throws<ArgumentOutOfRangeException>(() => person.DateOfBirth = invalidDate);
  }
}
```

Build your project and run all tests like in the image bellow:

![runalltests](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image31.png "runalltests")

After this, you will be able to see the test result in the Test Explorer window:

![testexplorer](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image32.png "testexplorer")

Now, let's create our integration test for our PersonController API. We're gonna use AspNetCore.TestHost to create a in-memory server. So, update the project.json to add a reference to this package:

```javascript
{
  "version": "1.0.0-*",

  "dependencies": {
    "NETStandard.Library": "1.6.0",
    "WebApp": "1.0.0-*",
    "xunit": "2.2.0-beta2-build3300",
    "dotnet-test-xunit": "2.2.0-preview2-build1029",
	"Microsoft.AspNetCore.TestHost": "1.0.0"
  },

  "frameworks": {
    "netcoreapp1.0": {
      "dependencies": {
        "Microsoft.NETCore.App": {
          "type": "platform",
          "version": "1.0.0"
        }
      }
    }
  }
}
```

Add a new class named "TestServerFixture" in our Test project. We're gonna use this class to inject a server into the class that will test our API Controller. So, edit the class to create a server like this:

```cs
public class TestServerFixture : IDisposable {
  private TestServer testServer;
  protected TestServer TestServer {
    get {
      if (testServer == null) {
        testServer = new TestServer(new WebHostBuilder().UseStartup<Startup>());
      }
      return testServer;
    }
  }

  public HttpClient Client {
    get {
      return TestServer.CreateClient();
    }
  }
  public void Dispose() {
    if (testServer != null) {
      testServer.Dispose();
      testServer = null;
    }
  }
}
```

Note that we're starting our server using the Startup class from WebApp project.

Now, create another class named PersonControllerTest and inject the TestServerFixture:

```cs
public class PersonControllerTest : IClassFixture<TestServerFixture> {
  public PersonControllerTest(TestServerFixture fixture) {
    Fixture = fixture;
  }

  protected TestServerFixture Fixture { get; private set; }
}
```

At this point we have everything ready, so, let's create a method to test the Controller. We're gonna create a method to test if the GET method is returning a list with 3 objects.

The updated class is like this:

```cs
public class PersonControllerTest : IClassFixture<TestServerFixture> {
  public PersonControllerTest(TestServerFixture fixture) {
    Fixture = fixture;
  }

  protected TestServerFixture Fixture { get; private set; }

  [Fact]
  public async void ItShouldReturnSomething() {
    using (var client = Fixture.Client) {
      var response = await client.GetAsync("/api/person");
      string json = response.Content.ReadAsStringAsync().Result;
      IList<PersonModel> list = JsonConvert.DeserializeObject<IList<PersonModel>>(json);
      Assert.True(list.Count == 3);
    }
  }
}
```

Compile and run all tests and you'll see the test result in the TestExplorer window:

![testexplorer2](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image33.png "testexplorer2")

Right now, we are ready to test our C# classes and controllers.

Let's move on and create the tests for our AngularJS controllers.
We're gonna use Jasmine to test our AngularJS controllers. But we'll use a task from GruntJS for that (grunt-contrib-jasmine). So, add the package for grunt-contrib-jasmine in the package.json:

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
    "grunt-run": "0.6.0",
    "grunt-contrib-jasmine": "1.0.3"
  }
}
```

Update the Gruntfile.js to load the new task:

```javascript
module.exports = function (grunt) {
  //load the tasks that we're gonna use
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  //...
  //...
```

Now, configure the jasmine and register a new task named "test" that will run the jasmine :

```javascript
	//...
    jasmine: {
      src: 'wwwroot/app.js',
      options: {
        specs: ['Scripts/**/*Spec.js'],
        vendor: 'wwwroot/angular.js'
      }
    }
  });

  //register a default task to execute clean, copy, concat and clean:temp tasks
  grunt.registerTask('default', ['clean', 'copy', 'concat', 'clean:temp']);
  //register a test task to execute jasmine task
  grunt.registerTask('test', ['jasmine']);
};
```

With this config we're telling jasmine to test our "app.js", using the specs from Scripts folder and also including our angular.js script that has all angular related scripts.

Now, you can run the "test" task. You'll see a warning because we have no tests yet:

![test](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image34.png "test")

Let's create our first angular test. Create a new javascript file named "person.controllerSpec.js" inside the Scripts/app folder.

Edit the spec to prepare it for our test:

```javascript
describe('testing personController', function () {
  beforeEach(module('app'));

  var $controller;
  var $http;
  var $httpBackend;

  beforeEach(inject(function (_$controller_, _$http_, _$httpBackend_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;

    var persons = [{
      firstName: 'FirstName1',
      lastName: 'LastName1',
      dateOfBirth: new Date()
    }, {
      firstName: 'FirstName2',
      lastName: 'LastName2',
      dateOfBirth: new Date()
    }];
    $httpBackend.when('GET', 'api/person').respond(persons);
  }));
  
    describe('use this to group tests', function () {
    it('should populate personList', function () {
      var controller = $controller('personController', { $http: $http });
      $httpBackend.flush();
      expect(controller.personList.length).toEqual(2);
    });
  });

});

```

Note that we're injecting $controller (to create the controller we'll test), $http (the personController needs it) and $httpBackend (to fake the http request).

Our controller is very simple and the only thing it does is to populate the personList with the response from the GET request.
This way, we're gonna fake this request (our API is not running. We're unit testing) and return the person list we've just created inside the spec.

So, we created a test to check if the personList has 2 elements after creating the controller. 

Run the test task and you'll see an error:

![mock error](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image35.png "mock error")

This error happens because we need the angular-mocks package. Add the package in the package.json:

```javascript
{
  "version": "1.0.0",
  "name": "asp.net",
  "private": true,
  "devDependencies": {

    "angular": "1.5.8",
    "angular-route": "1.5.8",
	"angular-mocks": "1.5.8",
    "bootstrap": "3.3.7",

    "grunt": "1.0.1",
    "grunt-contrib-clean": "1.0.0",
    "grunt-contrib-concat": "1.0.1",
    "grunt-contrib-copy": "1.0.0",
    "grunt-run": "0.6.0",
    "grunt-contrib-jasmine": "1.0.3"
  }
}
```

Update the Gruntfile to import the angular-mocks.js:

```javascript
//...
concat: {
  angular: {
	src: [
	  'node_modules/angular/angular.min.js',
	  'node_modules/angular-route/angular-route.min.js',
	  'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
	  'node_modules/angular-mocks/angular-mocks.js'
	],
	dest: 'wwwroot/angular.js'
  },
//...
```

Now, run the default task to update the angular.js. After this, run the test task again and you'll see our test result:

![jasmine result](https://github.com/fabriciokoch/AspnetcoreAngular/blob/master/docs/images/Image36.png "jasmine result")

That's it! Now you can create C# unit-test, C# integration-test and Angular unit-test. You can find more information about AngularJS tests [here](https://docs.angularjs.org/guide/unit-testing).