using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjetoPocItauAlbertoSouza.Controllers
{

    [RoutePrefix("api/Usuario")]
    public class UsuarioController : ApiController
    {
        [Route("Incluir")]
        public IHttpActionResult Post([FromBody]Model.Usuario usuario)
        {
            try
            {
                usuario.Id = new BLL.bllUsuario().Incluir(usuario);
                if (usuario.Id > 0)
                {
                    return Ok(usuario);
                }
                else
                {
                    return BadRequest("Erro ao cadastrar usuário.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Login")]
        public IHttpActionResult PostLogin([FromBody]Model.Usuario usuario)
        {
            try
            {
                var Validado = false;
                var Model = new BLL.bllUsuario().Login(usuario, out Validado);
                return Ok(new { Model, Validado , Mensagem = Validado ? "Sucesso" : "Falha ao autenticar usuario" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
