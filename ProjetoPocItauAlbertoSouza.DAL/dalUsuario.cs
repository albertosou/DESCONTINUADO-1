using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoPocItauAlbertoSouza.DAL
{
    public class dalUsuario : _BaseDAL
    {
        public int Incluir(Model.Usuario usuario)
        {
            base.AddParameter("@EMAIL", usuario.Email);
            base.AddParameter("@SENHA", usuario.Senha);
            base.AddParameter("@NOME", usuario.Nome);

            return int.Parse(base.ExecutarEscalar("PRC_USUARIO_INSERIR").ToString());
        }

        public List<Model.Usuario> Consultar(Model.Usuario usuario)
        {
            var @return = new List<Model.Usuario>();
            base.AddParameter("@ID_USUARIO", usuario.IdUsuario);
            base.AddParameter("@EMAIL", usuario.Email);
            base.AddParameter("@NOME", usuario.Nome);

            var dr = base.ExecutarLeitura("PRC_USUARIO_CONSULTAR");

            while (dr.Read())
            {
                var i = new Model.Usuario
                {
                    IdUsuario = Convert.ToInt32( dr["ID_USUARIO"]),
                    Email = dr["EMAIL"].ToString(),
                    Nome = dr["NOME"].ToString(),
                    Senha = dr["SENHA"].ToString(),
                    Administra = Convert.ToBoolean(dr["ADMINISTRA"])
                };
                @return.Add(i);
            }

            return @return;
        }
    }
}
