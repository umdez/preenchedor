# Preenchedor
Ao desenvolver um sistema qualquer, nós constantemente encaramos alguns impecilhos. Um deles é o carregamento de dados para testes
posteriores. A partir disso, criei esta ferramenta com o proposito de oferecer características para realizar a criação de tabelas e o registro de dados nelas.

## A configuração

Este projeto conta com uma conexão a um banco de dados e seu posterior preenchimento. Para isso é necessário informar certas propriedades
para a diretiva de armazenamento. Abaixo listamos cada uma das propriedades requeridas.

| Diretiva |Propriedade| Tipo | Descrição|
|---|---|---|---|
|armazenamento| dialeto| texto| O dialeto usado. Podendo ser: mysql, postgres ou então sqlite.|
|armazenamento| usuario| texto| O nome do usuário do banco. Exceto para o SQLite.|
|armazenamento| senha| texto | A nossa senha de conexão com o banco. Exeto para o SQlite.|
|armazenamento| database| texto| O nome do banco utilizado.|
|armazenamento| maxDeConsultasConcorrentes| numero||
|armazenamento| maxDeConexoes| numero||
|armazenamento| maxTempInativo| numero||
|armazenamento| endereco| texto| O endereço do nosso banco de dados. Exeto para o SQlite.|
|armazenamento| porta| numero| A porta utilizada para conexão com o nosso banco de dados. Exeto para o SQlite.|
|armazenamento| seForForcarCriacaoDeNovasTabelas| boleano| Realiza a remoção das tabelas existentes e as cria novamente.|

Abaixo temos um exemplo.
```javascript
config.armazenamento = {
  "dialeto": "mysql"                
, "usuario": "leo"                  
, "senha": "montes"                 
, "database": "database"            
, "maxDeConsultasConcorrentes": 200 
, "maxDeConexoes": 1                
, "maxTempInativo": 30              
, "endereco": "127.0.0.1"           
, "porta": 3306      
, "seForForcarCriacaoDeNovasTabelas": false  
};
```
