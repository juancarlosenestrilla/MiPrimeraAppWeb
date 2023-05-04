using MiPrimeraAppWeb.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppWeb.Controllers
{
    public class RepasoController : Controller
    {
        // GET: Repaso
        public ActionResult Ini()
        {
            return View();
        }

        public ActionResult Tablas()
        {
            return View();
        }

        public ActionResult ComboBox()
        {
            return View();
        }

        public ActionResult ComboBoxJS()
        {
            return View();

        }

        public ActionResult TablaJS()
        {
            return View();
        }

        public JsonResult listarPersonas()
        {
            List<Persona> listaPersona = new List<Persona>
            {
                new Persona { idPersona = 1, nombre="Juan", apellido="Enestrilla" },
                new Persona { idPersona = 2, nombre="Jose", apellido="Ramirez" },
                new Persona { idPersona = 3, nombre="Martin", apellido="Ortega" }

            };
            return Json(listaPersona, JsonRequestBehavior.AllowGet);
        }


        public JsonResult llenarComboPersona()
        {
            List<Persona> listaPersona = new List<Persona>
            {
                new Persona { idPersona = 1, nombre="Juan", apellido="Enestrilla" },
                new Persona { idPersona = 2, nombre="Jose", apellido="Ramirez" },
                new Persona { idPersona = 3, nombre="Martin", apellido="Ortega" }

            };
            return Json(listaPersona, JsonRequestBehavior.AllowGet);
        }
    }
}



