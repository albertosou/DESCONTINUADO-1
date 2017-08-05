using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProjetoPocItauAlbertoSouza.Model;

namespace ProjetoPocItauAlbertoSouza.BLL
{
    public class bllUsuario
    {
        public List<Model.Usuario> Consultar(Model.Usuario usuario)
        {
            using (var dal = new DAL.dalUsuario())
            {
                return dal.Consultar(usuario ?? new Model.Usuario());
            }
        }

        public int Incluir(Model.Usuario usuario)
        {
            if (usuario != null && !string.IsNullOrEmpty(usuario.Nome) && !string.IsNullOrEmpty(usuario.Senha) && !string.IsNullOrEmpty(usuario.Email))
            {
                if (!Consultar(new Model.Usuario { Email = usuario.Email }).Any())
                {
                    try
                    {
                        //Gravando apenas o Hash
                        usuario.Senha = usuario.Senha.GetHashCode().ToString();
                        using (var dal = new DAL.dalUsuario())
                        {
                            return dal.Incluir(usuario);
                        }
                    }
                    finally
                    {
                        usuario.Senha = null;
                    }
                }
            }
            return -1;
        }

        public Usuario Login(Usuario usuario, out bool Validado)
        {
            Validado = false;
            try
            {
                if (usuario != null && !string.IsNullOrEmpty(usuario.Senha) && !string.IsNullOrEmpty(usuario.Email))
                {
                    var pesquisa = Consultar(new Usuario { Email = usuario.Email });
                    var hashSenha = usuario.Senha.GetHashCode().ToString();
                    Validado = pesquisa.Any(p => string.Equals(p.Senha, hashSenha));
                    if (Validado)
                        usuario = pesquisa.First();
                }
            }
            finally
            {
                usuario.Senha = string.Empty;
            }
            return usuario ?? new Usuario();
        }
    }
}
