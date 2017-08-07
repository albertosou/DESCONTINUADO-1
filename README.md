# ProjetoPocItauAlbertoSouza
v1\poc

Utilizei para codificar *Visual Studio 2015*, o banco de dados *SQL Server 2016* e para modelagem *SQL Power Architect (Community Edition)*.

O Script de Criação do Banco de Dados está na pasta *./SQL_MER/SCRIPT_DB.sql*.

Para rodar a aplicação é necessário somente a configuração do arquivo Web.Config (*./ProjetoPocItauAlbertoSouza/Web.config*) na linha 47.
Nenhuma espeficicação de porta ou configuração foi feita na solução. Utilizei somente o template simples de projeto MVC + Web Api.

Criei uma regra para atribuíção do *perfil* Administrador (para o cadastro de produtos) da seguinte forma. 
--> Durante o cadastro, se no nome do usuário conter a string *(Adm)* o usuário terá a atribuíção do perfil Administrador.

Exemplo: 
----------------------------------------------------------------------------------

Nome: Alberto Souza (Adm)

Email: nononon@nononon.com
