/* 
	Pequeno Framework criado para facilitar a criação de itens dinamicamente
	
	Autor: Dânio Filho - daniofilho@ig.com.br
	Data: jun/2013
	
*/

var Danfw = {

	/* ---- Funções de Criação de Menus ---- */
		cria_li_listview: function (var_tag_a, var_tag_h3, var_id, var_class, var_nome, var_classe) {	
			//Modelo
			/*
			<ul data-role="listview" data-theme="c">
			    <li>
					<a href="area_restrita.html">
						<h3>Área Restrita</h3>
					</a>
				</li>	
			</ul>
			*/
			
			var cria_var = '<ul data-role="listview" data-theme="c">';
				cria_var += "<li><a href='" + var_tag_a +"' data-id='" + var_id +"' class='" + var_class +"' data-nome='" + var_nome + "' data-classe='" + var_classe + "'>";
					cria_var +=	"<h3>" + var_tag_h3 +"</h3>";	
				cria_var += "</a></li>";
				cria_var += '</ul>';
			
			return cria_var;
		},
		
		cria_logout: function () {
			
			return Danfw.cria_li_listview("#", "Sair", "btn_logout");
			
		},
		
		cria_collapsible: function (var_tag_span, var_tag_p, menus) {
			/*
				<div data-role="collapsible" data-theme="a" data-content-theme="a">
				   <h3>Header swatch A</h3>
				   <p>I'm the collapsible content with a themed content block set to "a".</p>
				</div>
			*/

			var var_col = '<div data-role="collapsible" data-theme="c" data-content-theme="b">';
				var_col += '<h3>' + var_tag_span + '</h3>';
				
			
			//Parâmetro p é opcional
			if (var_tag_p != "") {
				var_col += '<p>' + var_tag_p + '</p>';
			}
			
			var_col += menus;
			
			var_col += '</div>';
			
			return var_col;
		},
		
		cria_header: function (var_usuario) {
			/*
			<div data-role="header" data-theme="c">
					<h1>Page Title</h1>
					<a href="index.html" data-icon="gear" class="ui-btn-right">Options</a>
				</div>	
			*/
			var var_header = "";
			
			var_header += '<div data-role="header" data-theme="b">';
				var_header += "<h1>" + var_usuario + "</h1>";
				//Botão de Logout
				var_header += '<a href="#" data-icon="delete"  data-mini="true" id="btn_logout" class="ui-btn-right">SAIR</a>';
			var_header += '</div>';
			
			return var_header;
			
		},
		
		cria_mes_agenda: function () {
			
			var mes_agenda = '<center><div data-role="controlgroup" data-type="horizontal" data-mini="true">';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="0">Janeiro</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="1">Fevereiro</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="2">Março</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="3">Abril</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="4">Maio</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="5">Junho</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="6">Julho</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="7">Agosto</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="8">Setembro</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="9">Outubro</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="10">Novembro</a>';
					mes_agenda += '<a href="#" data-role="button" class="muda_mes" title="11">Dezembro</a>';
			  mes_agenda += '</div></center><br/><br/>';
			  
			  return mes_agenda;
		},
		
		converte_data: function (str_data) {
		    //recebe no formato dd/mm/yyyy
				var nova_data = str_data.split("/");
			
			//converte para mm/dd/yyyy
				var dia = nova_data[0];
				var mes = nova_data[1];
				var ano = nova_data[2];
				
				var novo_formato = ano + "/" + mes + "/" + dia;

			//retorna no novo formato
				return novo_formato;
				
		},
		
		cria_materia: function( descricao_disciplina, exame_final, falta_b1, falta_b2, falta_b3, falta_b4, media_aritmetica, media_final, nota_b1, nota_b2, nota_b3, nota_b4, percentual_faltas, recuperacao_bimestral_2, recuperacao_bimestral_4, resultado, total_faltas, total_pontos ){
			
			/*
				Modelo:
				
				<div data-role="collapsible">
						
							<h3>Nome da Disciplina</h3>
							
								<ul data-role="listview"  data-theme="c" data-divider-theme="a">
									
									<li data-role="list-divider">1&#186; Bimestre</li>
									
									<li>
								
										<h3>Notas:</h3>	
										<p>10,00</p>
										
									</li>
									
									<li>
										
										<h3>Faltas:</h3>
										<p>0</p>	
										
									</li>
									
									<li data-role="list-divider">2&#186; Bimestre</li>
									
									<li>
									
										<h3>Notas</h3>	
										<p>10,0</p>
										
									</li>
									
									<li>
										
										<h3>Faltas</h3>
										<p>0</p>	
										
									</li>
									
									<li data-role="list-divider">Rec. 1&#186; Semestre</li>

									<li>
										
										<h3>REC</h3>
										
									</li>
									
									<li data-role="list-divider">3&#186; Bimestre</li>
									
									<li>
								
										<h3>Notas:</h3>	
										<p>10,00</p>
										
									</li>
									
									<li>
										
										<h3>Faltas:</h3>
										<p>0</p>	
										
									</li>
									
									
									<li data-role="list-divider">4&#186; Bimestre</li>
									
									<li>
								
										<h3>Notas:</h3>	
										<p>10,00</p>
										
									</li>
									
									<li>
										
										<h3>Faltas:</h3>
										<p>0</p>	
										
									</li>
									
									<li data-role="list-divider">Rec. 2&#186; Semestre</li>

									<li>
										
										<h3>REC</h3>
										
									</li>
									
									<li data-role="list-divider">Total</li>
									
									<li>
										
										<h3>Pontos:</h3>
										<p>0</p>	
										
									</li>


									<li>
										
										<h3>Faltas:</h3>
										<p>0</p>	
										
									</li>

									<li data-role="list-divider">Total</li>
									
									<li>
										
										<h3>% Frequência:</h3>
										<p>100</p>	
										
									</li>
									
									<li>
										
										<h3>Média Anual:</h3>
										<p>100</p>	
										
									</li>
									
									<li>
										
										<h3>Exame Final:</h3>
										<p>100</p>	
										
									</li>
									
									<li>
										
										<h3>Média Final:</h3>
										<p>100</p>	
										
									</li>
									
									<li>
										
										<h3>Resultado:</h3>
										<p>100</p>	
										
									</li>
									
								</ul>
											
						</div><!-- materia -->
			*/
			
			if ( falta_b1 == null) { falta_b1 = ""; }
			if ( falta_b2 == null) { falta_b2 = ""; }
			if ( falta_b3 == null) { falta_b3 = ""; }
			if ( falta_b4 == null) { falta_b4 = ""; }
			
			mat = '<div data-role="collapsible">';
						
				mat += '<h3>' + descricao_disciplina + '</h3>';
				
					mat += '<ul data-role="listview"  data-theme="c" data-divider-theme="a">';
						
						mat += '<li data-role="list-divider">1&#186; Bimestre</li>';
						
						mat += '<li>';
					
							mat += '<h3>Nota</h3>	';
							mat += '<p>' + nota_b1 + '</p>';
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Faltas</h3>';
							mat += '<p>' + falta_b1 + '</p>';	
							
						mat += '</li>';
						
						mat += '<li data-role="list-divider">2&#186; Bimestre</li>';
						
						mat += '<li>';
						
							mat += '<h3>Nota</h3>';
							mat += '<p>' + nota_b2 + '</p>';
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Faltas</h3>';
							mat += '<p>' + falta_b2 + '</p>';	
							
						mat += '</li>';
						
						mat += '<li data-role="list-divider">Rec. 1&#186; Semestre</li>';

						mat += '<li>';
							
							mat += '<h3>' + recuperacao_bimestral_2 + '</h3>';
							
						mat += '</li>';
						
						mat += '<li data-role="list-divider">3&#186; Bimestre</li>';
						
						mat += '<li>';
					
							mat += '<h3>Nota</h3>';
							mat += '<p>' + nota_b3 + '</p>';
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Faltas</h3>';
							mat += '<p>' + falta_b3 + '</p>';	
							
						mat += '</li>';
						
						
						mat += '<li data-role="list-divider">4&#186; Bimestre</li>';
						
						mat += '<li>';
					
							mat += '<h3>Nota</h3>';
							mat += '<p>' + nota_b4 + '</p>';
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Faltas</h3>';
							mat += '<p>' + falta_b4 + '</p>';	
							
						mat += '</li>';
						
						mat += '<li data-role="list-divider">Rec. 2&#186; Semestre</li>';

						mat += '<li>';
							
							mat += '<h3>' + recuperacao_bimestral_4 + '</h3>';
							
						mat += '</li>';
						
						mat += '<li data-role="list-divider">Total</li>';
						
						mat += '<li>';
							
							mat += '<h3>Pontos</h3>';
							mat += '<p>' + total_pontos + '</p>';	
							
						mat += '</li>';


						mat += '<li>';
							
							mat += '<h3>Faltas</h3>';
							mat += '<p>' + total_faltas + '</p>';	
							
						mat += '</li>';

						mat += '<li data-role="list-divider">Total</li>';
						
						mat += '<li>';
							
							mat += '<h3>% Frequência</h3>';
							mat += '<p>' + percentual_faltas + '</p>';	
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Média Anual</h3>';
							mat += '<p>' + media_aritmetica + '</p>';	
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Exame Final</h3>';
							mat += '<p>' + exame_final + '</p>';
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Média Final</h3>';
							mat += '<p>' + media_final + '</p>';	
							
						mat += '</li>';
						
						mat += '<li>';
							
							mat += '<h3>Resultado</h3>';
							mat += '<p>' + resultado + '</p>';	
							
						mat += '</li>';
						
					mat += '</ul>';
								
			mat += '</div>';
			
			return mat;
			
		},
		
		cria_collapsible_materia: function(materias) {
			/*
				<div data-role="collapsible-set" data-inset="false" data-theme="b">
				   <!-- Matérias -->
				</div>
			*/

			var var_col = '<div data-role="collapsible-set" data-inset="false" data-theme="c">';
			
				var_col += materias;
			
			var_col += '</div>';
			
			return var_col;
		},


}