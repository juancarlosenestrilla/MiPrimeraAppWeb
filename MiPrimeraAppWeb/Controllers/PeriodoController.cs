using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppWeb.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Periodo()
        {
            return View();
        }
        public JsonResult listarPeriodo()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Periodos.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDPERIODO, p.NOMBRE, FECHAINICIO = ((DateTime) p.FECHAINICIO).ToShortDateString(),
                    FECHAFIN = ((DateTime) p.FECHAFIN).ToShortDateString()}).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult buscarPeriodoPorNombre(string nombrePeriodo)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Periodos.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombrePeriodo))
                .Select(p => new {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                    FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString()
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }


    }
}