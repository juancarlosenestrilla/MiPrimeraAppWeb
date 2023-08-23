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
            var lista = bd.Periodos.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombrePeriodo))  //contains Para la busqueda sensitiva
                .Select(p => new {
                    p.IIDPERIODO,
                    p.NOMBRE,
                    FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(),
                    FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString()
                }).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int eliminar(Periodo oPeriodo) //vamos arecibir un objeto Curso y viene lainformacion del appen (id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int nregistrosAfectados = 0;

            try  //importante para evitar que se caiga la aplicacion
            {
                int idPeriodo = oPeriodo.IIDPERIODO;
                Periodo obj = bd.Periodos.Where(p => p.IIDPERIODO.Equals(oPeriodo.IIDPERIODO)).First();   //esto nos devuelve una fila, con First() me devuelve solo la primer fila
                obj.BHABILITADO = 0;
                bd.SubmitChanges();   //Confirmo los cambios
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
            }


            return nregistrosAfectados;
        }

    }
}