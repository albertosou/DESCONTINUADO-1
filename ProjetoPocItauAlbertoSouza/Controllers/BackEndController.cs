using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;


namespace ProjetoPocItauAlbertoSouza.Controllers
{
    public class BackEndController : Controller
    {
        public ActionResult Login()
        {
            ViewBag.Title = "Back End";

            return View();
        }
    }
}
