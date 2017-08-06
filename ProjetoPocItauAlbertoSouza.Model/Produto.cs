namespace ProjetoPocItauAlbertoSouza.Model
{
    public class Produto
    {
        public int IdProduto { get; set; }
        public int IdUsuario { get; set; }

        public string Nome { get; set; }

        public int? Estoque { get; set; }

        public string Url { get; set; }

        public double? Valor { get; set; }
        public string Descricao { get; set; }
        public int Disponiveis { get; set; }
    }
}