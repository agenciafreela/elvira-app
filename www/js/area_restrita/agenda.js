$(document).on('pageshow','body',function(e,data){	
	
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	
	function faz_login() {
		
		tipo = localStorage.getItem("tipo");
		usuario = localStorage.getItem("usuario");
		senha = localStorage.getItem("senha");
		id_aluno = localStorage.getItem("id_aluno");
		nome_usuario = localStorage.getItem("nome_usuario"); 
		
		$.ajax({
				url: "http://www.elvirabrandao.com.br/app/integracao/integra.php",
				data: { act: "getOpcao", tipo: tipo, usuario: usuario, senha: senha, aluno: id_aluno, opcao: 3}, //3 = agenda
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
							
							//Insere o menu da Agenda
							insere_menu_agenda(data);
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
	
	function inicio_agenda() {
		$.mobile.showPageLoadingMsg();	
		
		//$.mobile.hidePageLoadingMsg();
		$('.loading').fadeOut();
	
		//Inicializa PopUp
		$("#popup_agenda").popup();
	
		faz_login();
	
	}	

	function insere_menu_agenda(data) {
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

		//Calendário
			//Inclui uma lista com os meses para o usuário escolher
			menu_resp += Danfw.cria_mes_agenda();
	
			//Inicializa o calendário		
			var calendar = $('#calendario').fullCalendar({
		        defaultView: 'month',
		        header: {
		            left: 'prev,next today',
		            center: 'title',
		            right: 'month,agendaWeek,agendaDay'
		        },
		        selectable: true,
		        selectHelper: true,
		        ignoreTimezone: true,
		        eventClick: function (calEvent, jsEvent, view) {
		            mostra_popup(calEvent.id, data);
		        },
		        editable: false,
		        events: []
		    });
	       
	       //Preenche o calendário com a agenda	
	       for (i in data.dados) {
		       $('#calendario').fullCalendar('renderEvent', {
		                //id: data.dados[i].ID,
		                id: i,
						title: data.dados[i].TITULO + ' - ' + data.dados[i].DISCIPLINA,
						start: ( Danfw.converte_data(data.dados[i].DATA_ENTREGA) ),
						end: ( Danfw.converte_data(data.dados[i].DATA_ENTREGA) ),
		                allDay: true
		            },
		            true
		        );
			}
			
		//Remove o popup de loading	
		$.mobile.hidePageLoadingMsg();

		//imprime    
		$('.conteudo').html(menu_resp).trigger('create'); 
		
	}
	
	//Facilidade para o usuário escolher o mês no calendário
	$('.muda_mes').live('click', function () {
        var mes = $(this).attr('title');
        $('#calendario').fullCalendar('gotoDate', y, mes);
    });
    
    //Abre popup com as informações do evento
    function mostra_popup(id, data) {
    	//Botão fechar
    		var cont_popup = '<a href="#" data-rel="back" data-role="button" data-theme="c" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Fechar</a>';
    
		//Variáveis
			var titulo = data.dados[id].TITULO;
			var disciplina = data.dados[id].DISCIPLINA;
			var descricao = data.dados[id].DESCRICAO;
			var professores = data.dados[id].PROFESSOR;
			var solicitacao = data.dados[id].DATA_SOLICITACAO;
			var entrega = data.dados[id].DATA_ENTREGA;
	
		//Informações do Evento	(VERIFICAR SE É VAZIO ANTES DE EXIBIR)
			//Título
			if (titulo != null){
				cont_popup += '<p><strong>' + titulo + '</strong></p>';
			}
			
			//Disciplina
			if(disciplina != null){
				cont_popup += '<p><strong>Disciplina:</strong> ' + disciplina + '</p>';
			}
			
			//Descrição
			if(descricao != null){
				cont_popup += '<p><strong>Descrição:</strong> ' + descricao + '</p>';
			}
			
			//Professores
			if (professores[0] != null){
				cont_popup += '<p><strong>Professor:</strong> ';
				
				for (i in professores) {
					cont_popup += professores[i].NOME + "<br/>"; 
				}
				
				cont_popup += '</p>';
			}
			
			//Data Solicitação
			if(solicitacao != "") {
				cont_popup += '<p><strong>Data Solicitação: </strong>' + solicitacao + '</p>';
			}
			
			//Data Entrega
			if (entrega != "") {
				cont_popup += '<p><strong>Data Entrega: </strong>' + entrega + '</p>';
	        }
    
		//Cria o Popup com os dados passados
			$('#popup_agenda').html(cont_popup).trigger('create'); 
    
		//Abre o Pop Up
    		$('#popup_agenda').popup( "open" );
	}
	
	inicio_agenda();
		
});	

	