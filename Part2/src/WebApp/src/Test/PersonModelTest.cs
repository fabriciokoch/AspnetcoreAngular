using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using Xunit;

namespace Test {
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
}
