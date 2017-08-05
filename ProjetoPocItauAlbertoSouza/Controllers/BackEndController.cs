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

        public ActionResult Produto(int? id)
        {
            ViewBag.Title = "Back End";
            Model.Produto produto = null;
            if (id.HasValue)
            {
                var @return = new BLL.bllProduto().Consultar(new Model.Produto { Id = id.Value });
                produto = @return.First();
            }
            return View(produto);
        }
    }
}
