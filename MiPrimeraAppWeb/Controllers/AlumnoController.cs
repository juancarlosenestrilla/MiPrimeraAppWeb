using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppWeb.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Alumnos()
        {
            return View();
        }

        public JsonResult listarSexo()
        {
            var lista = (bd.Sexos.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new {p.NOMBRE, IID = p.IIDSEXO }));  //se renombra IID y lo usamos en js

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        PruebaDataContext bd = new PruebaDataContext();

        public JsonResult listarAlumnos()
        {
            var lista = (bd.Alumnos.Where(p => p.BHABILITADO.Equals(1))
            .Select(p => new { p.IIDALUMNO, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.TELEFONOPADRE })).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult filtrarAlumnoPorSexo(int iidsexo)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Alumnos.Where(p => p.BHABILITADO.Equals(1) && p.IIDSEXO.Equals(iidsexo)).Select(p => new
            {
                    p.IIDALUMNO,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.TELEFONOPADRE
            }).ToList();

            return Json(lista,JsonRequestBehavior.AllowGet);
        }
        


    }
}