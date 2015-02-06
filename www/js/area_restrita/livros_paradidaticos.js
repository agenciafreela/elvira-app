$(document).ready(function () {
	

	function inicio() {
		
		//$.mobile.hidePageLoadingMsg();
		$('.loading').fadeOut();
	
		verifica_logado();
	
	}
	
	var btn_logout = "<a href='#' id='btn_logout'>LOGOUT</a>";
	
	$('#submit_login').click(function(){
		
	
		
		var tipo = $('#select_tipo').find('option').filter(':selected').val();
		var login = $('#user').val();
		var senha = $('#senha').val();
		
		entrar(tipo, login, senha, false);
		
	});
	

	function entrar(tipo, usuario, senha, base64) {
		
				
			$('.login').fadeOut(function(){
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
		            
		            if (data.success == false) {
		            	//Remover o loading da tela
		            	$('.loading').fadeOut();
		            	
		            	//Log
		            	console.log("Login: " + data.success);
			            $('.conteudo').html("Login incorreto, por favor, verifique seus dados e tente novamente");
		            } else {
		            
		            	//Se o login estiver correto, salva os dados na localstorage
		            	localStorage.setItem("tipo", tipo);
		            	localStorage.setItem("usuario", usuario);
		            	localStorage.setItem("senha", senha);
		            
		            	
			            $('.loading').fadeOut(function(){
				           
				           console.log("Login: " + data.success);
		            	   console.log("Olá " + data.dados.NOME);				
		            	   $('.conteudo').html("Olá " + data.dados.NOME);

						   $('.conteudo').append("<br/>" + btn_logout);			            
			            });
		            	
	            	}
	            	//$('.conteudo').html("Olá " + data.dados.nome);
	            	
	            },
	            //error: function(XMLHttpRequest, textStatus, errorThrown){ 
	            error: function(jqXHR, textStatus, errorThrown)  {
	           
	            	$('.conteudo').append("Erro ao tentar fazer o login. Verifique sua conexão com a internet!");
	            	
	            	//console.log(data);
	            	console.log(jqXHR, textStatus, errorThrown);
	            	/* for(i in XMLHttpRequest) { 
	            	 	if(i!="channel") 
	            	 		console.log(i +" : " + XMLHttpRequest[i] +""); 
	            	 }*/ 
	            	 		 	            	
	            }
	            
          });

	}
	
	function fn_logout(){
		localStorage.clear();
    	
    	$('.conteudo').html("");
    	
    	$('.login').fadeIn();
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
	
	$('#btn_logout').live('click', function () {
		fn_logout();
	});
	
	inicio();
		
});	

	