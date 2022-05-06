### Backend desenvolvido em .NET Core 6 e usando o Entity Framework
#### Fazer o clone no git (git clone)
#### Compilar a solução
#### Setar o projeto CustomerWebApp.WebAPI como projeto de inicialização
### Banco de dados utilizado foi o SQL Server 
#### Para criar as tabelas no Banco de Dados, configurar o arquivo AppSettings.json dentro do projeto CustomerWebApp.WebAPI
#### Neste arquivo, ajustar a propriedade DefaultConnection de acordo com o servidor de sua preferência
#### executar os migrations do entity framework, executando os comandos 'Add-Migration FirstMigration' e depois 'Update-Database' no PowerShell do Visual Studio, tendo como projeto padrão o CustomerWebApp.WebAPI
#### executar a aplicação (F5) a aplicação será aberta no swagger
