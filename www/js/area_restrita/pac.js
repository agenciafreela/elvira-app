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
				data: { act: "getOpcao", tipo: tipo, usuario: usuario, senha: senha, aluno: id_aluno, opcao: 5}, //5 = pac
	            type: "GET",
	            contentType: "text/html;charset=ISO-8859-1",  
				scriptCharset: "ISO-8859-1" ,  
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
							insere_menu_pac(data);	
						}	
						
						
	            },
	            error: function(jqXHR, textStatus, errorThrown)  {
	           
	            	alert("Erro ao tentar fazer o login. Verifique sua conexão com a internet!");
	            	
	            	console.log(jqXHR, textStatus, errorThrown);
	            	 		 	            	
	            }
	            
          });//$.ajax

	}
	
	function inicio_pac() {
		
		$.mobile.showPageLoadingMsg();
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

	function insere_menu_pac(data) {
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
		
		menu_resp += "<p><em>Atenção: Verifique se o seu dispositivo permite downloads!</em></p>";

			//Agrupa as informações para cada tipo
			for (i in data.dados){
				
				
				//Variáveis
				try {
					var down_desc = decodeURIComponent(escape(data.dados[i].DESCRICAO));
				}catch(e){
					var down_desc = data.dados[i].DESCRICAO;
				}
				
				try {
					var down_arquivo = decodeURIComponent(escape(data.dados[i].ARQUIVO));
				}catch(e){
					var down_arquivo = data.dados[i].ARQUIVO;
				}
				
				try {
					var down_disciplina = decodeURIComponent(escape(data.dados[i].DISCIPLINA));
				}catch(e){
					var down_disciplina = data.dados[i].DISCIPLINA;
				}
				
				var down_link = data.dados[i].LINK;
				var dados_lista = "";
	
				
				//Descrição
				if (down_desc == "") {
					try {
						var down_desc = "PAC - " + decodeURIComponent(escape(data.dados[i].ARQUIVO));
					}catch(e){
						var down_desc = "PAC - " + data.dados[i].ARQUIVO;
					}
				}
				
				//Disciplina
				if (down_disciplina != "") {
					down_disciplina = "<p><strong>Disciplina:</strong> " + down_disciplina +"</p>";
				} else {
					down_disciplina = "";
				}
				
				//Arquivo
				if (down_arquivo != "" && down_link != "") {
					dados_lista += "<p><a target='_blank' data-ajax = 'false' data-role='button' data-href='" + down_link + "' href='#' class='btn_download'>" + down_arquivo + "</a></p>";
					//dados_lista += "<p><a target='_blank' href='" + down_link + "'>" + down_arquivo + "</a> <br/><em>(Clique para fazer o download)</em></p>";
				}
				
				
				//Cria um collapse para guardar essas informações
				menu_resp += Danfw.cria_collapsible(down_desc, down_disciplina, dados_lista);
				
			}
			
		//Remove o loading	
		//$.mobile.hidePageLoadingMsg();
			
		//imprime    
		$('.conteudo').html(menu_resp).trigger('create'); 
		
		$.mobile.hidePageLoadingMsg();
	}
	
	$('.btn_download').live('click', function(){
		
		//Abre a página no navegador padrão do dispositivo
		window.plugins.childBrowser.openExternal($(this).data('href') );
		
		//Abre a página innApp
		//window.plugins.childBrowser.showWebPage($(this).data('href'));
		
	});
	
	inicio_pac();
		
});	

	