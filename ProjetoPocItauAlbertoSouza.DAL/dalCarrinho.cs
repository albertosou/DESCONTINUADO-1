using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.DAL
{
    public class dalCarrinho : _BaseDAL
    {
        public List<Model.ItemCarrinho> Incluir(Model.ItemCarrinho itemCarrinho)
        {
            var @return = new List<Model.ItemCarrinho>();
            base.AddParameter("@ID_PRODUTO", itemCarrinho.IdProduto);
            base.AddParameter("@IDENTIFICADOR", itemCarrinho.Chave);
            base.AddParameter("@ID_USUARIO", itemCarrinho.IdUsuario);
            base.AddParameter("@QUANTIDADE", itemCarrinho.Quantidade);

            var dr = base.ExecutarLeitura("PRC_CARRINHO_INCLUIR");

            while (dr.Read())
            {
                var i = new Model.ItemCarrinho
                {
                    IdProduto = Convert.ToInt32(dr["ID_PRODUTO"]),
                    IdCarrinho = Convert.ToInt32(dr["ID_CARRINHO"]),
                    IdUsuario = Convert.ToInt32(dr["ID_USUARIO"] is DBNull ? 0 : dr["ID_USUARIO"]),
                    Chave = dr["IDENTIFICADOR"].ToString(),
                    Nome = dr["NOME"].ToString(),
                    Descricao = dr["DESCRICAO"] is DBNull ? null : dr["DESCRICAO"].ToString(),
                    Valor = Convert.ToDouble(dr["VALOR"]),
                    Estoque = Convert.ToInt32(dr["ESTOQUE"]),
                    Disponiveis = Convert.ToInt32(dr["DISPONIVEIS"]),
                    Quantidade = Convert.ToInt32(dr["QUANTIDADE"]),
                    Url = dr["URL"].ToString(),
                };
                @return.Add(i);
            }

            return @return;
        }
        public List<Model.ItemCarrinho> Excluir(Model.ItemCarrinho itemCarrinho)
        {
            var @return = new List<Model.ItemCarrinho>();
            base.AddParameter("@ID_CARRINHO", itemCarrinho.IdCarrinho);
            base.AddParameter("@IDENTIFICADOR", itemCarrinho.Chave);
            base.AddParameter("@ID_USUARIO", itemCarrinho.IdUsuario);
            base.AddParameter("@ID_PRODUTO", itemCarrinho.IdProduto);

            var dr = base.ExecutarLeitura("PRC_CARRINHO_EXCLUIR");

            while (dr.Read())
            {
                var i = new Model.ItemCarrinho
                {
                    IdProduto = Convert.ToInt32(dr["ID_PRODUTO"]),
                    IdCarrinho = Convert.ToInt32(dr["ID_CARRINHO"]),
                    IdUsuario = Convert.ToInt32(dr["ID_USUARIO"] is DBNull ? 0 : dr["ID_USUARIO"]),
                    Chave = dr["IDENTIFICADOR"].ToString(),
                    Nome = dr["NOME"].ToString(),
                    Descricao = dr["DESCRICAO"] is DBNull ? null : dr["DESCRICAO"].ToString(),
                    Valor = Convert.ToDouble(dr["VALOR"]),
                    Estoque = Convert.ToInt32(dr["ESTOQUE"]),
                    Disponiveis = Convert.ToInt32(dr["DISPONIVEIS"]),
                    Quantidade = Convert.ToInt32(dr["QUANTIDADE"]),
                    Url = dr["URL"].ToString(),
                };
                @return.Add(i);
            }

            return @return;
        }
        public List<Model.ItemCarrinho> Consultar(Model.ItemCarrinho itemCarrinho)
        {
            var @return = new List<Model.ItemCarrinho>();
            base.AddParameter("@IDENTIFICADOR", itemCarrinho.Chave);
            base.AddParameter("@ID_USUARIO", itemCarrinho.IdUsuario);
            base.AddParameter("@ID_CARRINHO", itemCarrinho.IdCarrinho);

            var dr = base.ExecutarLeitura("PRC_CARRINHO_CARREGAR");

            while (dr.Read())
            {
                var i = new Model.ItemCarrinho
                {
                    IdProduto = Convert.ToInt32(dr["ID_PRODUTO"]),
                    IdCarrinho = Convert.ToInt32(dr["ID_CARRINHO"]),
                    IdUsuario = Convert.ToInt32(dr["ID_USUARIO"] is DBNull ? 0 : dr["ID_USUARIO"]),
                    Chave = dr["IDENTIFICADOR"].ToString(),
                    Nome = dr["NOME"].ToString(),
                    Descricao = dr["DESCRICAO"] is DBNull ? null : dr["DESCRICAO"].ToString(),
                    Valor = Convert.ToDouble(dr["VALOR"]),
                    Estoque = Convert.ToInt32(dr["ESTOQUE"]),
                    Disponiveis = Convert.ToInt32(dr["DISPONIVEIS"]),
                    Quantidade = Convert.ToInt32(dr["QUANTIDADE"]),
                    Url = dr["URL"].ToString(),
                };
                @return.Add(i);
            }

            return @return;
        }

    }
}
