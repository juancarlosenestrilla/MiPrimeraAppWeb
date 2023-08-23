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

        public JsonResult recuperarDatos(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Cursos.Where(P => P.BHABILITADO.Equals(1)
            && P.IIDCURSO.Equals(id))
               .Select(P => new { P.IIDCURSO, P.NOMBRE, P.DESCRIPCION }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        


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

        public int guardarDatos(Curso ocurso)  //ocurso esta lleno gracias al javascript
        {
            PruebaDataContext bd = new PruebaDataContext();  //con un punto de iterrupcion podemos checar que llegan los datos
            int nregistrosAfectados = 0;
            try
            {
                //nuevo o agregar

                if(ocurso.IIDCURSO== 0)
                {
                    bd.Cursos.InsertOnSubmit(ocurso);  //prepara la inserccion
                    bd.SubmitChanges();                //confirmamos los registro o se hace el registro en la tabla
                    nregistrosAfectados = 1;
                    //en caso que exista un error se va al catch

                }
                //editar

                else
                {
                   Curso cursoSel= bd.Cursos.Where(p => p.IIDCURSO.Equals(ocurso.IIDCURSO)).First();   //esto nos devuelve una fila, con First() me devuelve solo la primer fila
                    cursoSel.NOMBRE = ocurso.NOMBRE; //se cambian las variables
                    cursoSel.DESCRIPCION = ocurso.DESCRIPCION;
                    bd.SubmitChanges();

                    nregistrosAfectados = 1;

                }
            }
            catch(Exception ex)
            {
                nregistrosAfectados = 0;   //cuando es cero hay error
            }

            //data es el resultado que uno vota del controlador en el return

            return nregistrosAfectados;
        }

        public int eliminar(Curso ocurso) //vamos arecibir un objeto Curso y viene lainformacion del appen (id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            int nregistrosAfectados = 0;

            try  //importante para evitar que se caiga la aplicacion
            {
                Curso cursoSel = bd.Cursos.Where(p => p.IIDCURSO.Equals(ocurso.IIDCURSO)).First();   //esto nos devuelve una fila, con First() me devuelve solo la primer fila
                cursoSel.BHABILITADO = 0;
                bd.SubmitChanges();  //Confirmo los cambios
                nregistrosAfectados = 1;
            }
            catch(Exception ex)
            {
                nregistrosAfectados = 0;
            }


            return nregistrosAfectados;
        }
        
    }
}