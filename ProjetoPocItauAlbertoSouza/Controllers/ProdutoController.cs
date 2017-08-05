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
                produto.Id = new BLL.bllProduto().Incluir(produto);
                if (produto.Id > 0)
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
        [Route("{produto?}")]
        public IHttpActionResult Get(string produto = null)
        {
            try
            {
                var @return = new BLL.bllProduto().Consultar(new Model.Produto { Nome = produto });
                return Ok(@return);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
