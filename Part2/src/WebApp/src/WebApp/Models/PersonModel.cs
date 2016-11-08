using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models {
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
}
