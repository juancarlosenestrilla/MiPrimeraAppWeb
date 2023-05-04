using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MiPrimeraAppWeb.Models
{
    public class Alumno
    {
        public int IIDALUMNO { get; set; }
        public string NOMBRE { get; set; }
        public string APPATERNO { get; set; }
        public string APMATERNO { get; set; }
        public string TELEFONOPADRE { get; set; }
        public int BHABILITADO { get; set; }
    }
}