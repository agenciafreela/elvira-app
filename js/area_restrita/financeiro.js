$(document).ready(function () {
	
	
	function faz_login() {
		$.mobile.showPageLoadingMsg();
		
		tipo = localStorage.getItem("tipo");
		usuario = localStorage.getItem("usuario");
		senha = localStorage.getItem("senha");
		id_aluno = localStorage.getItem("id_aluno");
		nome_usuario = localStorage.getItem("nome_usuario"); 
		
		$.ajax({
				url: "http://www.elvirabrandao.com.br/app/integracao/integra.php",
				data: { act: "getOpcao", tipo: tipo, usuario: usuario, senha: senha, aluno: id_aluno, opcao: 1}, //1 = Financeiro
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
							insere_menu_financeiro(data);	
						}
							
						
	            },
	            error: function(jqXHR, textStatus, errorThrown)  {
	           
	            	alert("Erro ao tentar fazer o login. Verifique sua conexão com a internet!");
	            	
	            	console.log(jqXHR, textStatus, errorThrown);
	            	 		 	            	
	            }
	            
          });//$.ajax

	}
	
	function inicio_financeiro() {
		
		//$.mobile.hidePageLoadingMsg();
		$('.loading').fadeOut();
	
		faz_login();
	
	}
	
	function fn_logout(){
		
		localStorage.clear();
    	
    	$('.conteudo').html("");

    	location.href="area_restrita.html";
	}
	
	$('#btn_logout').live('click', function () {
		fn_logout();
	});	

	function insere_menu_financeiro(data) {
		console.log(data);
		var menu_resp = "";
		var info_user = "";
		
		
		//Insere informações do usuário e do aluno
			info_user += "Olá " + localStorage.getItem("nome_usuario");
				
			//Cria um header com as informações do usuário
			$('.header-usuario').html( Danfw.cria_header(info_user) );
			
			/*
				A linha abaixo é um bug fix para ativar o trigger em elementos do tipo data-role header, footer e content
			*/
			$('.header-usuario').closest(":jqmData(role='page')").trigger('pagecreate');
			
		//Insere informações do aluno
		menu_resp += "<p><strong>Aluno:</strong> " + localStorage.getItem("nome_aluno") +"</p>";

			//Agrupa as informações para cada tipo
			for (i in data.dados){
		
				//Variáveis
				var venc = data.dados[i].VENCIMENTO;
				var valor_pagar = data.dados[i].VALORPAGAR;
				var valor_pago = data.dados[i].VALORPAGO;
				var link = data.dados[i].LINK;
				var dados_lista = "";
				
				var fin_tipo = data.dados[i].TIPO;
				var fin_desc = data.dados[i].DESCRICAO;
				
				//Mostra as opções se não houverem valores indefinidos
				if (venc != null) {
					dados_lista += "<p> <strong>Vencimento:</strong> " + venc + "</sp>";
				}
				
				if (valor_pagar != null) {
					dados_lista += "<p> <strong>Valor à pagar:</strong> R$ " + valor_pagar + "</p>";
				}
				
				if (valor_pago != null) {
					dados_lista += "<p> <strong>Valor pago:</strong> R$ " + valor_pago + "</p>";
				}
				
				if (link != "") {
					dados_lista += "<p> <strong>Segunda via do Boleto:</strong> <a href='"+ link + "' target='_blank'> Gerar </a></p>";
				}
				
				if (fin_tipo == null) {
					fin_tipo = "Dados de Cobrança";
				}
				
				if (fin_desc == null) {
					fin_desc = "Sem descrição.";
				}
				
				//Cria um collapse para guardar essas informações
				menu_resp += Danfw.cria_collapsible(fin_tipo,"<strong>Descrição:</strong> " + fin_desc, dados_lista);
				
			}
			
			
		//imprime    
		$('.conteudo').html(menu_resp).trigger('create'); 
		$.mobile.hidePageLoadingMsg();
		
	}
	
	inicio_financeiro();
		
});	

	