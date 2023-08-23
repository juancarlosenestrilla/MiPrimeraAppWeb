using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MiPrimeraAppWeb.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Docente()
        {
            return View();
        }

        public JsonResult listarDocente()
        {
            PruebaDataContext bd = new PruebaDataContext();
           /* var lista = (from docente in bd.Docentes
                         where docente.BHABILITADO.Equals(1)
                         select new
                         {
                             docente.IIDDOCENTE,
                             docente.NOMBRE,
                             docente.APPATERNO,
                             docente.APMATERNO,
                             docente.EMAIL
                         }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);*/

            //expresion lamba es igualque arriba pero lamba

            var lista = bd.Docentes.Where(p => p.BHABILITADO.Equals(1)).Select(
                p => new
                {
                    p.IIDDOCENTE,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.EMAIL
                }
                ).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }


        public JsonResult filtrarDocentePorModalidad(int iidModalidad)
        {
            PruebaDataContext bd = new PruebaDataContext();


            //expresion lamba es igualque arriba pero lamba

            /*se añade esto para hacer el filtrado && p.IIDMODALIDADCONTRATO.Equals(iidModalidad))*/

            var lista = bd.Docentes.Where(p => p.BHABILITADO.Equals(1)&& p.IIDMODALIDADCONTRATO.Equals(iidModalidad)).Select( 
                p => new
                {
                    p.IIDDOCENTE,
                    p.NOMBRE,
                    p.APPATERNO,
                    p.APMATERNO,
                    p.EMAIL
                }
                ).ToList();

            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarModalidadContrato()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = ( bd.ModalidadContratos.Where(p => p.BHABILITADO.Equals(1)).
                        Select(p => new {   //p es variable de rango
                            IID= p.IIDMODALIDADCONTRATO,
                            p.NOMBRE
                        })).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}