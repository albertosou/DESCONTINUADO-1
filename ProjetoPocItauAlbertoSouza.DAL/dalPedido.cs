using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.DAL
{
    public class dalPedido : _BaseDAL
    {
        public int Concluir(Model.Pedido pedido)
        {
            base.AddParameter("@ID_CARRINHO", pedido.IdCarrinho);
            base.AddParameter("@ID_USUARIO", pedido.IdUsuario);

            return base.ExecutarSemConsulta("PRC_PEDIDO_FINALIZAR");
        }
        public int Atualizar(Model.Pedido pedido)
        {
            base.AddParameter("@ID_PEDIDO", pedido.IdPedido);
            base.AddParameter("@STATUS", pedido.Status);

            return base.ExecutarSemConsulta("PRC_PEDIDO_ATUALIZAR");
        }
        public List<Model.Pedido> Consultar(Model.Pedido pedido)
        {
            var @return = new List<Model.Pedido>();
            base.AddParameter("@ID_USUARIO", pedido.IdUsuario);

            var dr = base.ExecutarLeitura("PRC_PEDIDO_CONSULTAR");

            while (dr.Read())
            {
                var i = new Model.Pedido
                {
                    IdPedido = Convert.ToInt32(dr["ID_PEDIDO"]),
                    IdProduto = Convert.ToInt32(dr["ID_PRODUTO"]),
                    Nome = dr["NOME"].ToString(),
                    Descricao = dr["DESCRICAO"] is DBNull ? null : dr["DESCRICAO"].ToString(),
                    Quantidade = Convert.ToInt32(dr["QUANTIDADE"]),
                    Valor = Convert.ToDouble(dr["VALOR"]),
                    ValorTransacao = Convert.ToDouble(dr["VALOR_TRANSACAO"]),
                    Status = dr["STATUS"].ToString(),
                    Url = dr["URL"].ToString(),
                };
                @return.Add(i);
            }

            return @return;

        }
    }
}
