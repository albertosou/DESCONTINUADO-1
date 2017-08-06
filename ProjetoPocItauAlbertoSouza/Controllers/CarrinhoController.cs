using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjetoPocItauAlbertoSouza.Controllers
{
    [RoutePrefix("api/Carrinho")]
    public class CarrinhoController : ApiController
    {

        [Route("Incluir")]
        public IHttpActionResult Post(List<Model.ItemCarrinho> itemList)
        {
            try
            {
                var lista = new BLL.bllCarrinho().Incluir(itemList);
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [Route("Excluir")]
        public IHttpActionResult Delete(Model.ItemCarrinho item)
        {
            try
            {
                var lista = new BLL.bllCarrinho().Excluir(item);
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AcceptVerbs("VIEW", "GET", "PUT", "POST", "DELETE", "HEAD")]
        public IHttpActionResult Get(Model.ItemCarrinho item)
        {
            try
            {
                var lista = new BLL.bllCarrinho().Consultar(item);
                return Ok(lista);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
