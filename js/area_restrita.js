$(document).ready(function () {

	// Demais funções

	function inicio() {

		//$.mobile.hidePageLoadingMsg();
		$('.loading').hide();

		verifica_logado();

	}

	$('#submit_login').click(function(){

		var tipo = $('#select_tipo').find('option').filter(':selected').val();
		var login = $('#user').val();
		var senha = $('#senha').val();

		entrar(tipo, login, senha, false);

	});


	//Salva em uma variável local qual o id do aluno selecionado ao clicar em algum menu
	$('.btn_menu_aluno').live('click', function () {

		//Pega o id do aluno selecionado
		var id_aluno = $(this).data('id');
		var nome_aluno = $(this).data('nome');
		var classe_aluno = $(this).data('classe');

		localStorage.setItem("id_aluno", id_aluno);
		localStorage.setItem("nome_aluno", nome_aluno);
		localStorage.setItem("classe_aluno", classe_aluno);


	});


	function entrar(tipo, usuario, senha, base64) {
			$.mobile.showPageLoadingMsg();

			$('.login').fadeOut(10, function(){
				//$.mobile.showPageLoadingMsg();
				$('.loading').fadeIn();
			});

			//Se já estiver em base 64 não precisa converter
			if (base64 == false) {
				//Converte usuário e senha para base 64 antes de enviar por parâmetro
				usuario = Base64.encode(usuario);
				senha = Base64.encode(senha);
			}

			//Log
			console.log(usuario + " \n " +senha );


			$.ajax({
				url: "http://www.elvirabrandao.com.br/app/integracao/integra.php",
				data: { act: "verificaLogin", tipo: tipo, usuario: usuario, senha: senha},
	            type: "GET",
	            dataType: "jsonp",
	            jsonpCallback: 'fn_resposta_jsonp', //Funcão callback do jsonp definida manualmente na api de integração
	            success: function(data){

		            //Verifica se foi logado
		            console.log(data);
		            if (data.success == false) {
		            	//Remover o loading da tela
		            	$('.loading').fadeOut();

		            	//Log
		            	console.log("Login: " + data.success);
			            alert("Login incorreto, por favor, verifique seus dados e tente novamente");

			            $('.login').fadeIn();

		            } else {


				   	 	//Se o login estiver correto, salva os dados na localstorage
		            	localStorage.setItem("tipo", tipo);
		            	localStorage.setItem("usuario", usuario);
		            	localStorage.setItem("senha", senha);
									localStorage.setItem("nome_usuario", data.dados.NOME);
									localStorage.setItem("email_usuario", data.dados.EMAIL);

		            	
			            $('.loading').fadeOut(function(){

				           console.log("Login: " + data.success);
		            	   console.log("Olá " + data.dados.NOME);


						   //Verifica se é aluno ou responsável que vai fazer login, e ai mostra um menu específico para cada
						   switch (localStorage.getItem("tipo") ) {

							   case "1": //Aluno

							   		mostra_menu_aluno(data);
							   		break;

							   case "2": //Responsável

							   		mostra_menu_responsavel(data);
							   		break;

							   default://Se não houver nenhum desses valores, então faz logout porque tem algo errado
							   		fn_logout();
							   		break;
						   }


			            });



	            	}

	            },
	            error: function(jqXHR, textStatus, errorThrown)  {

	            	alert("Erro ao tentar fazer o login. Verifique sua conexão com a internet!");

	            	console.log(jqXHR, textStatus, errorThrown);

	            }

          });//$.ajax

	}//entrar

	function fn_logout(){

		localStorage.clear();

    	$('.conteudo').html("");

    	location.href="area_restrita.html";
	}

	function verifica_logado() {

		var check_user = localStorage.getItem("usuario");

		//Se houver algo na variável, então o cliente está logado.. e ai faz direto a função de login
		if ( check_user != null) {

			var check_pass = localStorage.getItem("senha");
			var check_tipo = localStorage.getItem("tipo");

			entrar(check_tipo, check_user, check_pass, true);
		}
	}


	function mostra_menu_responsavel(data) {
			var menu_resp = "";
		    var menu_aluno = "";
		    var info_user = "";


			//Insere informações do usuário e do aluno
			info_user += "Olá " + localStorage.getItem("nome_usuario");

			//Cria um header com as informações do usuário
			$('.header-usuario').html( Danfw.cria_header(info_user) );

			/*
				A linha abaixo é um bug fix para ativar o trigger em elementos do tipo data-role header, footer e content
			*/
			$('.header-usuario').closest(":jqmData(role='page')").trigger('pagecreate');

			//Alunos

				//Para cada aluno que encontrar...
            	   for (i in data.dados.ALUNOS){
            	   		//zera o menu do aluno
            	   		menu_aluno = "";

            	   		//Primeiro define os menus

							//Financeiro
							menu_aluno += Danfw.cria_li_listview("financeiro.html", "Financeiro", data.dados.ALUNOS[i].CODIGO, "btn_menu_aluno", data.dados.ALUNOS[i].NOME,  data.dados.ALUNOS[i].CLASSE);

							//Boletim
							menu_aluno += Danfw.cria_li_listview("boletim.html", "Boletim", data.dados.ALUNOS[i].CODIGO,  "btn_menu_aluno", data.dados.ALUNOS[i].NOME, data.dados.ALUNOS[i].CLASSE);

							//Agenda
							menu_aluno += Danfw.cria_li_listview("agenda.html", "Agenda", data.dados.ALUNOS[i].CODIGO, "btn_menu_aluno", data.dados.ALUNOS[i].NOME, data.dados.ALUNOS[i].CLASSE);

							//Download
							menu_aluno += Danfw.cria_li_listview("downloads.html", "Downloads", data.dados.ALUNOS[i].CODIGO, "btn_menu_aluno", data.dados.ALUNOS[i].NOME, data.dados.ALUNOS[i].CLASSE);

							//PAC
							menu_aluno += Danfw.cria_li_listview("pac.html", "PAC", data.dados.ALUNOS[i].CODIGO, "btn_menu_aluno", data.dados.ALUNOS[i].NOME, data.dados.ALUNOS[i].CLASSE);

							//Livros Paradidáticos
							//menu_aluno += Danfw.cria_li_listview("livro_paradidativos.html", "Livros Paradidáticos", data.dados.ALUNOS[i].CODIGO, "btn_menu_aluno", data.dados.ALUNOS[i].NOME);


						//Agora define dentro de onde os menus ficarão
						menu_resp += Danfw.cria_collapsible(data.dados.ALUNOS[i].NOME, "Classe: " + data.dados.ALUNOS[i].CLASSE, menu_aluno);


            	   }//for alunos

		//Insere o menu concatenado no final de tudo
		$('.conteudo').append(menu_resp).trigger('create'); //o trigger faz com que  o conteúdo adicionado seja formatado

		$.mobile.hidePageLoadingMsg();

	}

	function mostra_menu_aluno (data){
			var menu_resp = "";
		    var menu_aluno = "";
		    var info_user = "";


			//Insere informações do usuário e do aluno
			info_user += "Olá " + localStorage.getItem("nome_usuario");

			//Cria um header com as informações do usuário
			$('.header-usuario').html( Danfw.cria_header(info_user) );

			/*
				A linha abaixo é um bug fix para ativar o trigger em elementos do tipo data-role header, footer e content
			*/
			$('.header-usuario').closest(":jqmData(role='page')").trigger('pagecreate');

				//Menu para os alunos

            	   		//Primeiro define os menus

							//Boletim
							menu_aluno += Danfw.cria_li_listview("boletim.html", "Boletim", data.dados.CODIGO,  "btn_menu_aluno", data.dados.NOME, data.dados.CLASSE);

							//Agenda
							menu_aluno += Danfw.cria_li_listview("agenda.html", "Agenda", data.dados.CODIGO, "btn_menu_aluno", data.dados.NOME, data.dados.CLASSE);

							//Download
							menu_aluno += Danfw.cria_li_listview("downloads.html", "Downloads", data.dados.CODIGO, "btn_menu_aluno", data.dados.NOME, data.dados.CLASSE);

							//PAC
							menu_aluno += Danfw.cria_li_listview("pac.html", "PAC", data.dados.CODIGO, "btn_menu_aluno", data.dados.NOME, data.dados.CLASSE);

							//Livros Paradidáticos
							//menu_aluno += Danfw.cria_li_listview("livro_paradidativos.html", "Livros Paradidáticos", data.dados.CODIGO, "btn_menu_aluno", data.dados.NOME);


						//Agora define dentro de onde os menus ficarão
						menu_resp += menu_aluno;


		//Insere o menu concatenado no final de tudo
		$('.conteudo').append(menu_resp).trigger('create'); //o trigger faz com que  o conteúdo adicionado seja formatado

		$.mobile.hidePageLoadingMsg();

	}

	$('#btn_logout').live('click', function () {
		fn_logout();
	});

	inicio();

});
