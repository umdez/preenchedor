# Preenchedor
Ao desenvolver um sistema qualquer, nós constantemente encaramos alguns impecilhos. Um deles é o carregamento de dados para testes
posteriores. A partir disso, criei esta ferramenta com o proposito de oferecer características para realizar a criação de tabelas e o registro de dados nelas.

## A configuração

Este projeto conta com uma conexão a um banco de dados e seu posterior preenchimento. Para isso é necessário informar certas propriedades
para a diretiva de armazenamento. Abaixo listamos cada uma das propriedades requeridas.

| Diretiva |Propriedade| Tipo | Descrição|
|---|---|---|---|
|armazenamento| usuario| texto| O nome do usuário do banco. Exceto para o SQLite.|
|armazenamento| senha| texto | A nossa senha de conexão com o banco. Exeto para o SQlite.|
|armazenamento| database| texto| O nome do banco utilizado.|
|armazenamento| seForForcarCriacaoDeNovasTabelas| boleano| Realiza a remoção das tabelas existentes e as cria novamente.|

## Como utilizar

Abaixo temos um exemplo básico de como realizar o preenchimento de modelos quaisquer.
```javascript
var Preenchedor = require('preenchedor');
var dados = require('./a/pasta/com/os/dados/indice');
var modelos = require('./a/pasta/com/os/modelos/indice');

var aConfiguracaoPadrao = armazenamento = {
  "usuario": "leo"                  
, "senha": "montes"                 
, "database": "database"            
, "seForForcarCriacaoDeNovasTabelas": false  
};

var preenchedor = new Preenchedor(aConfiguracaoPadrao, dados, modelos);

preenchedor.conectarAoBanco( function() {
  // Carregamos aqui os dados.
  preenchedor.armazenarOsDados();
});
```

Um exemplo de um arquivo no formato JSON que será carregado:
```json
[
  {
    "model": "Projetos",
    "data": {
      "id": 1,
      "propriedade": "algum texto..."
    }
  },
  {
    "model": "Projetos",
    "data": {
      "id": 2,
      "propriedade": "algum texto..."
    }
  }
]
```

## Mais informações
O preenchedor é apenas um arcabouço que utiliza extensivamento o projeto [sequelize-fixtures](https://github.com/domasx2/sequelize-fixtures). Caso você esteja mais interessado no assunto é recomendavel acessar a página oficial do projeto.
