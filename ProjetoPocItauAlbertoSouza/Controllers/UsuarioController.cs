using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjetoPocItauAlbertoSouza.Controllers
{
    public class UsuarioController : ApiController
    {
        public IHttpActionResult Post([FromBody]Model.Usuario usuario)
        {
            return Ok(usuario);
        }
    }
}
