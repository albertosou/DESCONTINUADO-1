using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;

namespace ProjetoPocItauAlbertoSouza.DAL
{
    public abstract class _BaseDAL : IDisposable
    {
        internal System.Data.SqlClient.SqlConnection Conexao { get; private set; }
        internal System.Data.SqlClient.SqlCommand Comando { get; private set; }
        internal System.Data.SqlClient.SqlDataAdapter Adaptador { get; private set; }

        internal void AddParameter(string v, object nome)
        {
            throw new NotImplementedException();
        }

        internal Dictionary<string, Parametro> Parametros { get; private set; }

        private string ConnectionString { get { return ConfigurationManager.ConnectionStrings["DBPOC"].ConnectionString; } }


        public void Dispose()
        {
            this.Parametros = null;
            DisposeThis();
        }

        private void DisposeThis()
        {
            if (this.Conexao != null)
            {
                this.Conexao.Dispose();
                this.Conexao = null;
            }
            if (this.Comando != null)
            {
                this.Comando.Dispose();
                this.Comando = null;
            }
            if (this.Adaptador != null)
            {
                this.Adaptador.Dispose();
                this.Adaptador = null;
            }
        }

        internal void AddParameter<T>(string chave, T valor, System.Data.ParameterDirection direcao = System.Data.ParameterDirection.Input)
        {
            if (this.Parametros == null)
                this.Parametros = new Dictionary<string, Parametro>();

            if (this.Parametros.ContainsKey(chave))
                this.Parametros.Remove(chave);
            
            if (!object.Equals(valor, default(T)))
                this.Parametros.Add(chave, new Parametro { Valor = valor, Direcao = direcao });
        }

        internal IDataReader ExecutarLeitura(string procedure)
        {
            try
            {
                DisposeThis();
                AbrirConexao();
                CriarComando(procedure);
                return this.Comando.ExecuteReader();
            }
            finally
            {
                this.Parametros = null;
            }
        }

        internal int ExecutarSemConsulta(string procedure)
        {
            try
            {
                DisposeThis();
                AbrirConexao();
                CriarComando(procedure);
                return this.Comando.ExecuteNonQuery();
            }
            finally
            {
                this.Parametros = null;
            }
        }

        internal object ExecutarEscalar(string texto)
        {
            try
            {
                DisposeThis();
                AbrirConexao();
                CriarComando(texto);
                return this.Comando.ExecuteScalar();
            }
            finally
            {
                this.Parametros = null;
            }
        }

        internal int ExecutarTexto(string texto)
        {
            try
            {
                DisposeThis();
                AbrirConexao();
                CriarComandoTexto(texto);
                return this.Comando.ExecuteNonQuery();
            }
            finally
            {
                this.Parametros = null;
            }
        }

        private void CriarComando(string procedure)
        {
            this.Comando = this.Conexao.CreateCommand();
            this.Comando.CommandText = procedure;
            this.Comando.CommandType = CommandType.StoredProcedure;

            if (this.Parametros == null)
                this.Parametros = new Dictionary<string, Parametro>();

            foreach (var item in this.Parametros.Select(p => new { p.Key, p.Value.Valor, p.Value.Direcao, Tipo = p.Value.ObterTipo() }))
            {
                var par = this.Comando.CreateParameter();
                par.Direction = item.Direcao;
                par.DbType = item.Tipo;
                par.ParameterName = item.Key;
                par.Value = item.Valor;
                this.Comando.Parameters.Add(par);
            }

            this.Parametros = new Dictionary<string, Parametro>();
        }

        private void CriarComandoTexto(string texto)
        {
            this.Comando = this.Conexao.CreateCommand();
            this.Comando.CommandText = texto;
            this.Comando.CommandType = CommandType.Text;
        }

        private void AbrirConexao()
        {
            this.Conexao = new System.Data.SqlClient.SqlConnection(this.ConnectionString);
            this.Conexao.Open();
        }

        internal class Parametro
        {
            public ParameterDirection Direcao { get; internal set; }
            public object Valor { get; internal set; }

            public DbType ObterTipo()
            {
                var @return = DbType.Object;

                if (this.Valor is String)
                    @return = DbType.String;
                else if (this.Valor is Int32)
                    @return = DbType.Int32;
                else if (this.Valor is Double)
                    @return = DbType.Decimal;
                else if (this.Valor is Boolean)
                    @return = DbType.Boolean;
                else if (this.Valor is DateTime)
                    @return = DbType.DateTime;

                return @return;
            }
        }
    }
}