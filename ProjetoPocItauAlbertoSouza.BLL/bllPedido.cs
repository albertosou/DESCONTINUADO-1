using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.BLL
{
    public class bllPedido
    {
        public int Atualizar(Model.Pedido pedido)
        {
            using (var dal = new DAL.dalPedido())
            {
                return dal.Atualizar(pedido);
            }
        }

        public int Concluir(Model.Pedido pedido)
        {
            using (var dal = new DAL.dalPedido())
            {
                return dal.Concluir(pedido);
            }
        }
        public List<Model.Pedido> Consultar(Model.Pedido pedido)
        {
            using (var dal = new DAL.dalPedido())
            {
                return dal.Consultar(pedido);
            }
        }
    }
}
