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

```
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

```
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