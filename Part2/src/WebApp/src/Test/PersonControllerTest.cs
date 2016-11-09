using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models;
using Xunit;

namespace Test {
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
}
