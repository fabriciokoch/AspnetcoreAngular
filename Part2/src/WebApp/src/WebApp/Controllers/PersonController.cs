using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApp.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers {
  [Route("api/[controller]")]
  public class PersonController : Controller {
    // GET: api/values
    [HttpGet]
    public IEnumerable<PersonModel> Get() {
      IList<PersonModel> personList = new List<PersonModel>();
      personList.Add(new PersonModel() { FirstName = "Walter", LastName = "White", DateOfBirth = new DateTime(1960, 1, 1) });
      personList.Add(new PersonModel() { FirstName = "Jim", LastName = "Gordon", DateOfBirth = new DateTime(1970, 10, 10) });
      personList.Add(new PersonModel() { FirstName = "Bruce", LastName = "Wayne", DateOfBirth = new DateTime(1990, 2, 2) });
      return personList;
    }

  }
}
