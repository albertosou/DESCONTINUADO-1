using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjetoPocItauAlbertoSouza.Controllers
{
    [RoutePrefix("api/Pedido")]
    public class PedidoController : ApiController
    {
        [Route("Concluir")]
        public IHttpActionResult Post(Model.Pedido item)
        {
            try
            {
                var ret = new BLL.bllPedido().Concluir(item);
                if (ret > 0)
                    return Ok(ret);
                else
                    return BadRequest("Erro ao concluir pedido.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Atualizar")]
        public IHttpActionResult Put(Model.Pedido item)
        {
            try
            {
                var ret = new BLL.bllPedido().Atualizar(item);
                if (ret > 0)
                    return Ok(ret);
                else
                    return BadRequest("Erro ao atualizar pedido.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [AcceptVerbs("VIEW", "GET", "PUT", "POST", "DELETE", "HEAD")]
        public IHttpActionResult Get(Model.Pedido item)
        {
            try
            {
                var lista = new BLL.bllPedido().Consultar(item);
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
