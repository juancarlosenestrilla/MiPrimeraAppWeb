using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppWeb.Controllers
{
    public class SeccionController : Controller
    {
        // GET: Seccion
        public ActionResult Seccion()
        {
            return View();
        }


        public JsonResult listarSeccion()
        {
            PruebaDataContext bd = new PruebaDataContext();
           
            var lista = bd.Seccions.Where(p => p.BHABILITADO.Equals(1)).Select(
                p => new
                {
                    p.IIDSECCION,
                    p.NOMBRE
                    
                }
                ).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}