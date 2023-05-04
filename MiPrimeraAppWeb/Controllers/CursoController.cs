using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppWeb.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Curso()
        {
            return View();
        }

        // Mensaje

       // public string Mensaje()
       // {
        //    return "Hola esta es mi primera aplicacion";
        //}

        //Saludo
        //public string saludo(string nombre, string apellido)
       // {
        //    return "Hola como estas" + nombre + apellido;
       // }

        


        public JsonResult listarCurso()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Cursos.Where(P => P.BHABILITADO.Equals(1))
                .Select(P => new { P.IIDCURSO, P.NOMBRE, P.DESCRIPCION }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult buscarCursoPorNombre(string nombre)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Cursos.Where(P => P.BHABILITADO.Equals(1) && P.NOMBRE.Contains(nombre))
                .Select(P => new { P.IIDCURSO, P.NOMBRE, P.DESCRIPCION }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}