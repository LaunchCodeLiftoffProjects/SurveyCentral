using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCentral.Models;

namespace TestCentral.Data
{
    public class ProfileData
    {
        static private Dictionary<int, Profile> Profiles = new Dictionary<int, Profile>();

        //getbyId
        public static Profile GetById(int id)
            {
                return Profiles[id];
            }
    }
}
