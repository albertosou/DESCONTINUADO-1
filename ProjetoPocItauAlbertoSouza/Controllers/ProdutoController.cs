using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjetoPocItauAlbertoSouza.Controllers
{
    [RoutePrefix("api/Produto")]
    public class ProdutoController : ApiController
    {
        [Route("Incluir")]
        public IHttpActionResult Post(Model.Produto produto)
        {
            try
            {
                produto.IdProduto = new BLL.bllProduto().Incluir(produto);
                if (produto.IdProduto > 0)
                {
                    return Ok(produto);
                }
                else
                {
                    return BadRequest("Erro ao cadastrar produto.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Alterar")]
        public IHttpActionResult Put(Model.Produto produto)
        {
            try
            {
                var ret = new BLL.bllProduto().Alterar(produto);
                if (ret > 0)
                {
                    return Ok(produto);
                }
                else
                {
                    return BadRequest("Erro ao cadastrar produto.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("Excluir")]
        public IHttpActionResult Delete(Model.Produto produto)
        {
            try
            {
                var ret = new BLL.bllProduto().Excluir(produto);
                if (ret > 0)
                {
                    return Ok(produto);
                }
                else
                {
                    return BadRequest("Erro ao cadastrar produto.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [AcceptVerbs("VIEW", "GET", "PUT", "POST", "DELETE", "HEAD")]
        public IHttpActionResult Get([FromBody]Model.Produto produto)
        {
            try
            {
                //Model.Produto produto = null;

                //if (!string.IsNullOrEmpty(s_produto))
                //{
                //    produto = Newtonsoft.Json.JsonConvert.DeserializeObject<Model.Produto>(s_produto);
                //}
                
                var @return = new BLL.bllProduto().Consultar(produto ?? new Model.Produto());
                return Ok(@return);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
