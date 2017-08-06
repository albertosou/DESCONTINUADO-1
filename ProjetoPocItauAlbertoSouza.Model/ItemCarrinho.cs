using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.Model
{
    public class ItemCarrinho : Produto
    {
        public int Quantidade { get; set; }
        public string Chave { get; set; }
        public int IdCarrinho { get; set; }
    }
}
