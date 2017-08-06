using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.DAL
{
    public class dalProduto : _BaseDAL
    {
        public int Incluir(Model.Produto produto)
        {
            base.AddParameter("@NOME", produto.Nome);
            base.AddParameter("@DESCRICAO", produto.Descricao);
            base.AddParameter("@VALOR", produto.Valor);
            base.AddParameter("@ESTOQUE", produto.Estoque);
            base.AddParameter("@URL", produto.Url);

            return int.Parse(base.ExecutarEscalar("PRC_PRODUTO_INSERIR").ToString());
        }

        public List<Model.Produto> Consultar(Model.Produto produto)
        {
            var @return = new List<Model.Produto>();
            base.AddParameter("@ID_PRODUTO", produto.IdProduto);
            base.AddParameter("@NOME", produto.Nome);
            var dr = base.ExecutarLeitura("PRC_PRODUTO_CONSULTAR");

            while (dr.Read())
            {
                var i = new Model.Produto
                {
                    IdProduto = Convert.ToInt32( dr["ID_PRODUTO"]),
                    Nome = dr["NOME"].ToString(),
                    Descricao = dr["DESCRICAO"] is DBNull ? null : dr["DESCRICAO"].ToString(),
                    Valor = Convert.ToDouble(dr["VALOR"]),
                    Estoque = Convert.ToInt32(dr["ESTOQUE"]),
                    Disponiveis =  Convert.ToInt32(dr["DISPONIVEIS"]),
                    Url = dr["URL"].ToString(),
                };
                @return.Add(i);
            }

            return @return;
        }

        public int Alterar(Model.Produto produto)
        {
            base.AddParameter("@ID_PRODUTO", produto.IdProduto);
            base.AddParameter("@NOME", produto.Nome);
            base.AddParameter("@DESCRICAO", produto.Descricao);
            base.AddParameter("@VALOR", produto.Valor);
            base.AddParameter("@ESTOQUE", produto.Estoque);
            base.AddParameter("@URL", produto.Url);

            return base.ExecutarSemConsulta("PRC_PRODUTO_ALTERAR");
        }
        public int Excluir(Model.Produto produto)
        {
            base.AddParameter("@ID_PRODUTO", produto.IdProduto);
          
            return base.ExecutarSemConsulta("PRC_PRODUTO_EXCLUIR");
        }
    }
}
