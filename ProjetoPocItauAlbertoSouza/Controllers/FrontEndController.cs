using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ProjetoPocItauAlbertoSouza.Controllers
{
    public class FrontEndController : Controller
    {
        // GET: Carrinho
        public ActionResult Carrinho()
        {
            return View();
        }

        // GET: Login
        public ActionResult Login()
        {
            return View();
        }
        // GET: CadastroUsuario
        public ActionResult CadastroUsuario()
        {
            return View();
        }
    }
}