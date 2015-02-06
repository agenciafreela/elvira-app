$(document).on('pageshow','body',function(e,data){	
		
	function faz_login() {
		
		tipo = localStorage.getItem("tipo");
		usuario = localStorage.getItem("usuario");
		senha = localStorage.getItem("senha");
		id_aluno = localStorage.getItem("id_aluno");
		nome_usuario = localStorage.getItem("nome_usuario"); 
		
		$.ajax({
				url: "http://www.elvirabrandao.com.br/app/integracao/integra.php",
				data: { act: "getOpcao", tipo: tipo, usuario: usuario, senha: senha, aluno: id_aluno, opcao: 3}, //3 = browser
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
							
							//Insere o browser
							insere_browser(data);
						}
	            	
							
						
	            },
	            error: function(jqXHR, textStatus, errorThrown)  {
	           
	            	alert("Erro ao tentar fazer o login. Verifique sua conexão com a internet!");
	            	
	            	console.log(jqXHR, textStatus, errorThrown);
	            	 		 	            	
	            }
	            
          });//$.ajax

	}
	
	function fn_logout(){
		
		localStorage.clear();
    	
    	$('.conteudo').html("");

    	location.href="area_restrita.html";
	}
	
	$('#btn_logout').live('click', function () {
		fn_logout();
	});
	
	function inicio_browser() {

		//$.mobile.hidePageLoadingMsg();
		$('.loading').fadeOut();
	
		faz_login();
	
	}	
	
	function insere_browser(data){
		
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
		
		menu_resp += "<p><em>Aviso: Alguns dispositivos não oferecem suporte a esta página!</em></p>";

			//Pega a url que deverá ser aberta
			var url = localStorage.getItem("url_download");
					 
			$("#iframe_teste").attr('src', url);

						
		//Remove o loading	
		$.mobile.hidePageLoadingMsg();
			
		//imprime    
		$('.conteudo').html(menu_resp).trigger('create'); 
		
	}
	
	inicio_browser();
			
});		