using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.BLL
{
    public class bllProduto
    {
        public int Incluir(Model.Produto produto)
        {
            if (VerificarAcesso(produto.IdUsuario))
            {
                using (var dal = new DAL.dalProduto())
                {
                    return dal.Incluir(produto);
                }
            }
            return -1;
        }

        public int Alterar(Model.Produto produto)
        {
            if (VerificarAcesso(produto.IdUsuario))
            {
                using (var dal = new DAL.dalProduto())
                {
                    return dal.Alterar(produto);
                }
            }
            return -1;
        }

        public int Excluir(Model.Produto produto)
        {
            if (VerificarAcesso(produto.IdUsuario))
            {
                using (var dal = new DAL.dalProduto())
                {
                    return dal.Excluir(produto);
                }
            }
            return -1;
        }

        public List<Model.Produto> Consultar(Model.Produto produto)
        {
            using (var dal = new DAL.dalProduto())
            {
                return dal.Consultar(produto);
            }
        }
        private bool VerificarAcesso(int idUsuario)
        {
            if (idUsuario > 0)
            {
                using (var dal = new DAL.dalUsuario())
                {
                    var pesquisa = dal.Consultar(new Model.Usuario { IdUsuario = idUsuario });
                    if (pesquisa.Any(p => p.Administra))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
