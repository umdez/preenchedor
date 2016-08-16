'use strict';

/*******************************************************************
 * Preenchedor é de (C) propriedade da Devowly Sistemas 2015-2016  *
 *                 https://github.com/devowly                      *
 *******************************************************************
 * 
 * $Id iniciar.js, criado em 15/08/2016 às 11:18 por Leo Felippe $
 *
 * Versão atual 0.0.1-Beta
 */

var Sequelize = require('sequelize');
var sequelize_fixtures = require('sequelize-fixtures');
var registrador = require('../utilitarios/registrador')('Preenchedor');
var Promessa = require('bluebird');

/* Provê metodos e funções de iniciar a conexão com o banco de dados, carregar os
 * modelos do banco, e preencher o banco com os dados.
 */
var Preenchedor = function(configuracao, dados, modelos) {
  this.bd = null;
  this.listaDosModelos = {};
  this.osModelos = modelos;
  this.osDados = dados;
  this.aConfiguracao = configuracao.armazenamento || configuracao;
};

/* Realiza o carregamento daqueles modelos do Sequelize, armazenando-os em
 * listaModelos. Estes modelos serão depois utilizados para fazer o
 * preenchimento do banco de dados.
 */
Preenchedor.prototype.carregarOsModelos = function () {
  
  registrador.debug('Carregando os modelos do banco de dados.');
  
  // Carrega todos modelos e cada um deles é adicionado a listaModelos.
  this.osModelos(this.bd, this.listaDosModelos);
};
 
/* Realiza a leitura e armazenamento dos dados.
 */
Preenchedor.prototype.armazenarOsDados = function () { 

  registrador.debug('Carregando dados de preenchimento do banco de dados.');
 
  // Carregamos aqueles arquivos json que contem os registros que serão
  // armazenados no Banco de Dados
  this.osDados(sequelize_fixtures, this.listaDosModelos);
};

/* Realiza a conexão com o banco de dados. e depois o sincroniza. Quando for
 * sincronizado, ele criará as tabelas se ainda não estiverem criadas. Depois de
 * sincronizado a gente retorna para carregar os registros que serão adicionados
 * às tabelas.
 */
Preenchedor.prototype.conectarAoBanco = function (cd) { 
  registrador.debug('Iniciando o processo de preenchimento.');
  
  // Realiza uma conexão com o banco de dados.
  var sequelize = new Sequelize( 
    this.aConfiguracao.database, 
    this.aConfiguracao.usuario, 
    this.aConfiguracao.senha
  );

  // Armazena banco de dados.
  this.bd = sequelize;
  
  // Carregamos todos os nossos modelos.
  this.carregarOsModelos();
  
  // Sincroniza os modelos com o banco de dados.
  sequelize.sync({ "force": this.aConfiguracao.seForForcarCriacaoDeNovasTabelas }).then(function() {
    registrador.debug('Banco de dados sincronizado.');
    cd();
  }).catch(function(erro){
    registrador.error(erro);
  }); 
};

module.exports = Preenchedor;