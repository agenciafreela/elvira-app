$(document).ready(function () {
	
	/*
$('#btn_logout').live('click', function () {
		fn_logout();
	});
	
	
	function fn_logout(){
		
		localStorage.clear();
    	
    	$('.conteudo').html("");

    	location.href="area_restrita.html";
	}
*/
	
	function faz_login() {
		$.mobile.showPageLoadingMsg();
		
		tipo = localStorage.getItem("tipo");
		usuario = localStorage.getItem("usuario");
		senha = localStorage.getItem("senha");
		id_aluno = localStorage.getItem("id_aluno");
		nome_usuario = localStorage.getItem("nome_usuario"); 
		
		$.ajax({
				url: "http://www.elvirabrandao.com.br/app/integracao/integra.php",
				data: { act: "getOpcao", tipo: tipo, usuario: usuario, senha: senha, aluno: id_aluno, opcao: 2}, //2 = Boletim
	            type: "GET",
	            dataType: "jsonp",
	            jsonpCallback: 'fn_resposta_jsonp', //Funcão callback do jsonp definida manualmente na api de integração
	            success: function(data){

		               	
			            $('.loading').fadeOut(function(){
				           
				           console.log("Login: " + data.success);
		            	   console.log("Olá " + nome_usuario );
						   				   			            
			            });
						
						//Verifica se possui dados
						if (data.success == false) {
					
							error = "<p><strong>Sem conteúdo disponível para exibir.</strong></p>";
							$('.conteudo').html(error).trigger('create');
							$.mobile.hidePageLoadingMsg();
							
					
	            	    } else {
							
							//Insere o menu do financeiro
							insere_menu_boletim(data);	
						}
	            	
						
						
	            },
	            error: function(jqXHR, textStatus, errorThrown)  {
	           
	            	alert("Erro ao tentar fazer o login. Verifique sua conexão com a internet!");
	            	
	            	console.log(jqXHR, textStatus, errorThrown);
	            	 		 	            	
	            }
	            
          });//$.ajax

	}
	
	function inicio_boletim() {
		
		//$.mobile.hidePageLoadingMsg();
		$('.loading').fadeOut();
	
		faz_login();
	
	}	

	function insere_menu_boletim(data) {
		console.log(data);
		var menu_resp = "";
		var info_user = "";
		var dados_lista = "";
		
		//Insere informações do usuário e do aluno
			info_user += "Olá " + localStorage.getItem("nome_usuario");
				
			//Cria um header com as informações do usuário
			$('.header-usuario').html( Danfw.cria_header(info_user) );
			
			/*
				A linha abaixo é um bug fix para ativar o trigger em elementos do tipo data-role header, footer e content
			*/
			$('.header-usuario').closest(":jqmData(role='page')").trigger('pagecreate');

		menu_resp += "<h3>Boletim de Notas e Frequência</h3>";

		menu_resp += "<h4>" + localStorage.getItem("nome_aluno") +"</h4>";
		
		menu_resp += "<h5>" + localStorage.getItem("classe_aluno") + "</h5>";
		
			//Agrupa as informações para cada tipo
			for (i in data.dados){
		
				//Variáveis
				var descricao_disciplina = data.dados[i].DESCRICAO_DISCIPLINA;
				var exame_final = data.dados[i].EXAME_FINAL;
				var falta_b1 = data.dados[i].FALTA_B1;
				var falta_b2 = data.dados[i].FALTA_B2;
				var falta_b3 = data.dados[i].FALTA_B3;
				var falta_b4 = data.dados[i].FALTA_B4;
				var media_aritmetica = data.dados[i].MEDIA_ARITMETICA;
				var media_final = data.dados[i].MEDIA_FINAL;
				var nota_b1 = data.dados[i].NOTA_B1;
				var nota_b2 = data.dados[i].NOTA_B2;
				var nota_b3 = data.dados[i].NOTA_B3;
				var nota_b4 = data.dados[i].NOTA_B4;
				var percentual_faltas = data.dados[i].PERCENTUAL_FALTAS;
				var recuperacao_bimestral_2 = data.dados[i].RECUPERACAO_BIMESTRAL_2;
				var recuperacao_bimestral_4 = data.dados[i].RECUPERACAO_BIMESTRAL_4;
				var resultado = data.dados[i].RESULTADO;
				var total_faltas = data.dados[i].TOTAL_FALTAS;
				var total_pontos = data.dados[i].TOTAL_PONTOS;

				
				dados_lista += Danfw.cria_materia( descricao_disciplina, exame_final, falta_b1, falta_b2, falta_b3, falta_b4, media_aritmetica, media_final, nota_b1, nota_b2, nota_b3, nota_b4, percentual_faltas, recuperacao_bimestral_2, recuperacao_bimestral_4, resultado, total_faltas, total_pontos );
				

			}
			
			//Cria a matéria
			menu_resp += Danfw.cria_collapsible_materia(dados_lista);
			
		//imprime    
		$('.conteudo').html(menu_resp).trigger('create'); 
		
		$.mobile.hidePageLoadingMsg();
		
	}
	
	inicio_boletim();
		
});	

	