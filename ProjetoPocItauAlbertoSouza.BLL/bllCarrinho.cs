using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.BLL
{
    public class bllCarrinho
    {
        public List<Model.ItemCarrinho> Incluir(Model.ItemCarrinho itemCarrinho)
        {
            using (var dal = new DAL.dalCarrinho())
            {
                return dal.Incluir(itemCarrinho ?? new Model.ItemCarrinho());
            }
        }
        public List<Model.ItemCarrinho> Incluir(List<Model.ItemCarrinho> itemCarrinhoLista)
        {
            List<Model.ItemCarrinho> @return = null;
            foreach (var item in itemCarrinhoLista)
            {
                @return = Incluir(item);
            }
            return @return;
        }

        public List<Model.ItemCarrinho> Excluir(Model.ItemCarrinho itemCarrinho)
        {
            using (var dal = new DAL.dalCarrinho())
            {
                return dal.Excluir(itemCarrinho??new Model.ItemCarrinho());
            }
        }

        public List<Model.ItemCarrinho> Consultar(Model.ItemCarrinho itemCarrinho)
        {
            using (var dal = new DAL.dalCarrinho())
            {
                return dal.Consultar(itemCarrinho ?? new Model.ItemCarrinho());
            }
        }
    }
}
