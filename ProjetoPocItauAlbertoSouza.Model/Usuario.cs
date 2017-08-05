using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.Model
{
    public class Usuario
    {
        public bool Administra { get; set; }
        public string Email { get; set; }
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Senha { get; set; }
    }
}
