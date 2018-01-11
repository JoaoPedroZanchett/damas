var vue = new Vue({
	el: "#meuvue",
	data: {
		comer: false,
		clique: 0,
		peca: null,
		jogador: "Slytherin",
		vez: "branca",
		id: null,
		jogadorBranco: null,
		jogadorVermelho: null,
		inputNomeSala: " ",
		salasCriadas: [],
		tabuleiro: [["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],
					["img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png"],
					["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],
					["img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png"],
					["img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png"],
					["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"],
					["img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png"],
					["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"]],
	},
	methods: {
		entrarSala: function(sala){
			if(sala.jogadorVermelho == "0"){
				sala.jogadorVermelho = this.id;
			}
			this.tabuleiro = sala.tabuleiro;
			this.jogadorBranco = sala.donoSala;
			this.jogadorVermelho = sala.jogadorVermelho;
			console.log(sala.jogadorVermelho);
		},
		// criarSala: function(){
		// 	var me = this;
		// 	$.ajax({
		// 		url:"criarJogo.php",
		// 		method: "POST",
		// 		data: {
		// 			"nomeSala": me.inputNomeSala,
		// 			"tabuleiro": JSON.stringify([["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],["img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png"],["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],["img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png"],["img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png"],["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"],["img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png"],["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"]]),
		// 			"donoSala": me.id,
		// 		},
		// 		success: function(data){
		// 			me.mostrarSalas();
		// 		},
		// 	});
		},
		mostrarSalas: function(){
			var me = this;
			$.ajax({
				url: "pegarSalas.php",
				method: "GET",
				success: function(data){
					console.log(JSON.parse(data));
					me.salasCriadas = JSON.parse(data);
				}
			});
		},
		jogar: function(pos){
			console.log(this.jogadorBranco + " E "+ this.jogadorVermelho);
			//PRIMEIRO CLIQUE - SETANDO A PEÇA
			if(this.clique == 0){
				if((this.tabuleiro[pos[0]][pos[1]] == "img/"+this.vez+".png" || this.tabuleiro[pos[0]][pos[1]] == "img/"+this.vez+"_dama.png") && this.tabuleiro[pos[0]][pos[1]] != "img/casa_preta.png" && this.tabuleiro[pos[0]][pos[1]] != "img/transparente.png" && ((this.vez == "branca" && this.id == 1) || (this.vez == "vermelho" && this.id == this.jogadorVermelho))){
					this.clique = 1;
					//SALVA A POSICAO DA PEÇA
					this.peca = pos;
					this.verificar(pos);
				}
			}
			//SEGUNDO CLIQUE - PONTO FUTURO
			else if(this.clique == 1){ 
				if(this.tabuleiro[pos[0]][pos[1]] == "img/opcao.png" || (pos[0] == this.peca[0] && pos[1] == this.peca[1])){
					// SE CLICAR NA MESMA PEÇA, PODE CLICAR EM OUTRA
					if(pos[0] == this.peca[0] && pos[1] == this.peca[1]){
						this.clique = 0;
						//MOSTRA ONDE PODE JOGAR  
						this.verificar(this.peca);
					} 
					//JOGADAS DA DAMA
					else if(this.id == this.jogadorVermelho && pos[0] - this.peca[0] == 2 && this.vez == "vermelho" && this.tabuleiro[this.peca[0]][this.peca[1]] == "img/vermelho_dama.png"){
						this.verificar(this.peca);
						this.tabuleiro[pos[0]-1][pos[1] - ((pos[1]-this.peca[1])/2)] = "img/casa_preta.png";
						this.mover(pos);
						this.clique = 2;
						this.verificar(pos);
						//SE NAO TIVER OPCAO DE COMER MAIS, TROCA DE VEZ
						if(!this.comer){
							this.verificar(pos);
							this.clique = 0;
							this.peca = null;
							this.vez = "branca";
							this.jogador = "Slytherin";
						}
						else {
							this.peca = pos;
							this.clique = 1;
						}
					} // JOGADAS DA DAMA
					else if(this.id == this.jogadorVermelho && pos[0] - this.peca[0] == -2 && this.vez == "vermelho" && this.tabuleiro[this.peca[0]][this.peca[1]] == "img/vermelho_dama.png"){
						//MESMO PROCESSO Q O ANTERIOR
						this.verificar(this.peca);
						this.tabuleiro[pos[0]+1][pos[1] - ((pos[1]-this.peca[1])/2)] = "img/casa_preta.png";
						this.mover(pos);
						this.clique = 2;
						this.verificar(pos);
						if(!this.comer){
							this.verificar(pos);
							this.clique = 0;
							this.peca = null;
							this.vez = "branca";
							this.jogador = "Slytherin";
						}
						else {
							this.peca = pos;
							this.clique = 1;
						}
					}
					//SE CLICAR EM 2 CASAS PRA FRENTE NA VEZ DO VERMELHO
					else if(this.id == this.jogadorVermelho && pos[0] - this.peca[0] == 2 && this.vez == "vermelho"){
						//ESCONDE ONDE PODE JOGAR
						this.verificar(this.peca);
						//APAGA A PEÇA BRANCA NO MEIO
						this.tabuleiro[pos[0]-1][pos[1] - ((pos[1]-this.peca[1])/2)] = "img/casa_preta.png";
						//MOVE A PEÇA
						this.mover(pos);
						this.clique = 2;
						//MOSTRA AS CASAS VERDES
						this.verificar(pos);
						//SE NAO PODE COMER MAIS PEÇAS
						if(!this.comer){
							//ESCONDE AS CASAS VERDER
							this.verificar(pos);
							this.clique = 0;
							this.peca = null;
							//PASSA PARA O PROXIMO JOGADOR
							this.vez = "branca";
							this.jogador = "Slytherin";

						}
						else {
							//SE NÃO, MANTEM A MESMA PEÇA SELECIONADA E JOGA DE NOVO
							this.peca = pos;
							this.clique = 1;
						}
					}//DAMA BRANCA JOGANDO
					else if(this.id == this.jogadorBranco && pos[0] - this.peca[0] == 2 && this.vez == "branca" && this.tabuleiro[this.peca[0]][this.peca[1]] == "img/branca_dama.png"){
						this.verificar(this.peca);
						this.tabuleiro[pos[0]-1][pos[1] - ((pos[1]-this.peca[1])/2)] = "img/casa_preta.png";
						this.mover(pos);
						this.clique = 2;
						this.verificar(pos);
						if(!this.comer){
							this.verificar(pos);
							this.clique = 0;
							this.peca = null;
							this.vez = "vermelho";
							this.jogador = "Gryffindor";	
						}
						else {
							this.peca = pos;
							this.clique = 1;
						}
					}
					//DAMA BRANCA JOGANDO
					else if(this.id == this.jogadorBranco && pos[0] - this.peca[0] == -2 && this.vez == "branca" && this.tabuleiro[this.peca[0]][this.peca[1]] == "img/branca_dama.png"){
						//MESMO PROCESSO Q O ANTERIOR
						this.verificar(this.peca);
						this.tabuleiro[pos[0]+1][pos[1] - ((pos[1]-this.peca[1])/2)] = "img/casa_preta.png";
						this.mover(pos);
						this.clique = 2;
						this.verificar(pos);
						if(!this.comer){
							this.verificar(pos);
							this.clique = 0;
							this.peca = null;
							this.vez = "vermelho";
							this.jogador = "Gryffindor";	
						}
						else {
							this.peca = pos;
							this.clique = 1;
						}
					}
					//VEZ DAS BRANCAS COMEREM
					else if(this.id == this.jogadorBranco && pos[0] - this.peca[0] == -2 && this.vez == "branca"){
						//MESMO PROCESSO Q O ANTERIOR
						this.verificar(this.peca);
						this.tabuleiro[pos[0]+1][pos[1] - ((pos[1]-this.peca[1])/2)] = "img/casa_preta.png";
						this.mover(pos);
						this.clique = 2;
						this.verificar(pos);
						if(!this.comer){
							this.verificar(pos);
							this.clique = 0;
							this.peca = null;
							this.vez = "vermelho";
							this.jogador = "Gryffindor";	
						}
						else {
							this.peca = pos;
							this.clique = 1;
						}
					}
					//SE NAO COMER NENHUMA
					else {
						//APENAS MOVE UMA CASA E MUDA A VEZ
						this.verificar(this.peca);
						this.mover(pos);
						this.clique = 0;
						this.peca = null;
						if(this.vez == "vermelho"){
							this.vez = "branca";
							this.jogador = "Slytherin";		
						}
						else {
							this.vez = "vermelho";
							this.jogador = "Gryffindor";	
						};
					}
					this.ehDama(pos);
					this.semPecas();
					$.ajax({
						url:"enviar.php",
						method: "POST",
						data: {
							vez: this.vez,
							tabuleiro: JSON.stringify(this.tabuleiro),
						},
						success: function(data){
							console.log(data);
						},
					});
		
				}
			}
		},
		verifJogada: function(){
			var me = this;
			$.ajax({
				url:"receber.php",
				method: "GET",
				dataType: "json",
				success: function(data){
					if(me.clique == 0){
						me.vez = data['0'].vez;
						if(me.vez == "vermelho"){
							me.jogador = "Gryffindor";
						}
						else {
							me.jogador = "Slytherin";
						}
						me.tabuleiro = JSON.parse(data['0'].posicoes);
					}
				},
			});
		},
		semPecas: function(){
			//VERIFICA SE ALGUM LADO NAO TEM PEÇAS MAIS
			var quantV = 0;
			var quantB = 0;
			for(var i = 0; i < 8; i++){
				for(var j = 0; j < 8; j++){
					if(this.tabuleiro[i][j] == "img/vermelho.png" || this.tabuleiro[i][j] == "img/vermelho_dama.png"){
						quantV ++;
					}
					else if(this.tabuleiro[i][j] == "img/branca.png" || this.tabuleiro[i][j] == "img/branca_dama.png"){
						quantB ++;
					}
				}
			}
			if(quantV == 0 || quantB == 0){ //RESETA O JOGO			
				this.vez = "branca";
				this.jogador = "Slytherin";	
				this.peca = null;
				this.tabuleiro = [["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],
					["img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png"],
					["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],
					["img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png"],
					["img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png"],
					["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"],
					["img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png"],
					["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"]];
				this.resetar();
			}
		},
		resetar: function(){
			$.ajax({
				url:"enviar.php",
				method: "POST",
				data: {
					vez: this.vez,
					tabuleiro: JSON.stringify(this.tabuleiro),
				},
				success: function(data){
					console.log(data);
				},
			});
		},
		ehDama: function(pos){ // PEÇAS QUE CHEGAM NA EXTREMIDADE OPOSTA, VIRAM DAMA
			if(this.tabuleiro[pos[0]][pos[1]] == "img/vermelho.png" && pos[0] == 7){
				this.tabuleiro[pos[0]][pos[1]] = "img/vermelho_dama.png";
			}
			else if(this.tabuleiro[pos[0]][pos[1]] == "img/branca.png" && pos[0] == 0){
				this.tabuleiro[pos[0]][pos[1]] = "img/branca_dama.png";
			}
		},
		verificar: function(pos){		
			if(this.vez == "vermelho" && this.tabuleiro[pos[0]][pos[1]] == "img/vermelho_dama.png"){ //VERIF. DAMA VERMELHA
				this.comer = false;
				if(pos[0] < 6 && (this.tabuleiro[pos[0]+1][pos[1]+1] == "img/branca.png" || this.tabuleiro[pos[0]+1][pos[1]+1] == "img/branca_dama.png") && this.tabuleiro[pos[0]+2][pos[1]+2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+2][pos[1]+2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] < 6 && this.tabuleiro[pos[0]+2][pos[1]+2] == "img/opcao.png"){
					this.tabuleiro[pos[0]+2][pos[1]+2] = "img/casa_preta.png";
				}
				if(pos[0] < 6 && (this.tabuleiro[pos[0]+1][pos[1]-1] == "img/branca.png" || this.tabuleiro[pos[0]+1][pos[1]-1] == "img/branca_dama.png") && this.tabuleiro[pos[0]+2][pos[1]-2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+2][pos[1]-2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] < 6 && this.tabuleiro[pos[0]+2][pos[1]-2] == "img/opcao.png"){
					this.tabuleiro[pos[0]+2][pos[1]-2] = "img/casa_preta.png";
				}
				//ESSE RESTO SERVE PARA MOVER UMA PEÇA
				if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]+1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+1][pos[1]+1] = "img/opcao.png";
				}
				else if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]+1] == "img/opcao.png"){
					this.tabuleiro[pos[0]+1][pos[1]+1] = "img/casa_preta.png";
				}
				if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]-1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+1][pos[1]-1] = "img/opcao.png";
				}
				else if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]-1] == "img/opcao.png"){
					this.tabuleiro[pos[0]+1][pos[1]-1] = "img/casa_preta.png";
				}

				if(pos[0] > 1 && (this.tabuleiro[pos[0]-1][pos[1]+1] == "img/branca.png" || this.tabuleiro[pos[0]-1][pos[1]+1] == "img/branca_dama.png") && this.tabuleiro[pos[0]-2][pos[1]+2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-2][pos[1]+2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] > 1 && this.tabuleiro[pos[0]-2][pos[1]+2] == "img/opcao.png"){
					this.tabuleiro[pos[0]-2][pos[1]+2] = "img/casa_preta.png";
				}
				if(pos[0] > 1 && (this.tabuleiro[pos[0]-1][pos[1]-1] == "img/branca.png" || this.tabuleiro[pos[0]-1][pos[1]-1] == "img/branca_dama.png") && this.tabuleiro[pos[0]-2][pos[1]-2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-2][pos[1]-2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] > 1 && this.tabuleiro[pos[0]-2][pos[1]-2] == "img/opcao.png"){
					this.tabuleiro[pos[0]-2][pos[1]-2] = "img/casa_preta.png";
				}
				if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]+1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-1][pos[1]+1] = "img/opcao.png";
				}
				else if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]+1] == "img/opcao.png"){
					this.tabuleiro[pos[0]-1][pos[1]+1] = "img/casa_preta.png";
				}
				if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]-1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-1][pos[1]-1] = "img/opcao.png";
				}
				else if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]-1] == "img/opcao.png"){
					this.tabuleiro[pos[0]-1][pos[1]-1] = "img/casa_preta.png";
				}
			}
			else if(this.vez == "branca" && this.tabuleiro[pos[0]][pos[1]] == "img/branca_dama.png"){ //VERIF. DAMA BRANCA
				this.comer = false;
				if(pos[0] < 6 && (this.tabuleiro[pos[0]+1][pos[1]+1] == "img/vermelho.png" || this.tabuleiro[pos[0]+1][pos[1]+1] == "img/vermelho_dama.png") && this.tabuleiro[pos[0]+2][pos[1]+2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+2][pos[1]+2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] < 6 && this.tabuleiro[pos[0]+2][pos[1]+2] == "img/opcao.png"){
					this.tabuleiro[pos[0]+2][pos[1]+2] = "img/casa_preta.png";
				}
				if(pos[0] < 6 && (this.tabuleiro[pos[0]+1][pos[1]-1] == "img/vermelho.png" || this.tabuleiro[pos[0]+1][pos[1]-1] == "img/vermelho_dama.png") && this.tabuleiro[pos[0]+2][pos[1]-2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+2][pos[1]-2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] < 6 && this.tabuleiro[pos[0]+2][pos[1]-2] == "img/opcao.png"){
					this.tabuleiro[pos[0]+2][pos[1]-2] = "img/casa_preta.png";
				}
				//ESSE RESTO SERVE PARA MOVER UMA PEÇA
				if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]+1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+1][pos[1]+1] = "img/opcao.png";
				}
				else if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]+1] == "img/opcao.png"){
					this.tabuleiro[pos[0]+1][pos[1]+1] = "img/casa_preta.png";
				}
				if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]-1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+1][pos[1]-1] = "img/opcao.png";
				}
				else if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]-1] == "img/opcao.png"){
					this.tabuleiro[pos[0]+1][pos[1]-1] = "img/casa_preta.png";
				}

				if(pos[0] > 1 && (this.tabuleiro[pos[0]-1][pos[1]+1] == "img/vermelho.png" || this.tabuleiro[pos[0]-1][pos[1]+1] == "img/vermelho_dama.png") && this.tabuleiro[pos[0]-2][pos[1]+2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-2][pos[1]+2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] > 1 && this.tabuleiro[pos[0]-2][pos[1]+2] == "img/opcao.png"){
					this.tabuleiro[pos[0]-2][pos[1]+2] = "img/casa_preta.png";
				}
				if(pos[0] > 1 && (this.tabuleiro[pos[0]-1][pos[1]-1] == "img/vermelho.png" || this.tabuleiro[pos[0]-1][pos[1]-1] == "img/vermelho_dama.png") && this.tabuleiro[pos[0]-2][pos[1]-2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-2][pos[1]-2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] > 1 && this.tabuleiro[pos[0]-2][pos[1]-2] == "img/opcao.png"){
					this.tabuleiro[pos[0]-2][pos[1]-2] = "img/casa_preta.png";
				}
				if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]+1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-1][pos[1]+1] = "img/opcao.png";
				}
				else if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]+1] == "img/opcao.png"){
					this.tabuleiro[pos[0]-1][pos[1]+1] = "img/casa_preta.png";
				}
				if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]-1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-1][pos[1]-1] = "img/opcao.png";
				}
				else if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]-1] == "img/opcao.png"){
					this.tabuleiro[pos[0]-1][pos[1]-1] = "img/casa_preta.png";
				}
			}
			else if(this.vez == 'vermelho'){ //VERIF. PECA VERMELHA
				this.comer = false;

				//ESSES 2 IF'S E ELSE IF'S SERVEM PARA COMER E DEIXAR A CASA VERDE
				if(pos[0] < 6 && (this.tabuleiro[pos[0]+1][pos[1]+1] == "img/branca.png" || this.tabuleiro[pos[0]+1][pos[1]+1] == "img/branca_dama.png") && this.tabuleiro[pos[0]+2][pos[1]+2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+2][pos[1]+2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] < 6 && this.tabuleiro[pos[0]+2][pos[1]+2] == "img/opcao.png"){
					this.tabuleiro[pos[0]+2][pos[1]+2] = "img/casa_preta.png";
				}
				if(pos[0] < 6 && (this.tabuleiro[pos[0]+1][pos[1]-1] == "img/branca.png" || this.tabuleiro[pos[0]+1][pos[1]-1] == "img/branca_dama.png") && this.tabuleiro[pos[0]+2][pos[1]-2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+2][pos[1]-2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] < 6 && this.tabuleiro[pos[0]+2][pos[1]-2] == "img/opcao.png"){
					this.tabuleiro[pos[0]+2][pos[1]-2] = "img/casa_preta.png";
				}
				//ESSE RESTO SERVE PARA MOVER UMA PEÇA
				if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]+1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+1][pos[1]+1] = "img/opcao.png";
				}
				else if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]+1] == "img/opcao.png"){
					this.tabuleiro[pos[0]+1][pos[1]+1] = "img/casa_preta.png";
				}
				if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]-1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]+1][pos[1]-1] = "img/opcao.png";
				}
				else if(pos[0] < 7 && this.tabuleiro[pos[0]+1][pos[1]-1] == "img/opcao.png"){
					this.tabuleiro[pos[0]+1][pos[1]-1] = "img/casa_preta.png";
				}
			}
			else if(this.vez == 'branca'){ //VERIF. PEÇA BRANCA
				this.comer = false;
				//MESMO CÓDIGO QUE ALI EM CIMA ^^
				if(pos[0] > 1 && (this.tabuleiro[pos[0]-1][pos[1]+1] == "img/vermelho.png" || this.tabuleiro[pos[0]-1][pos[1]+1] == "img/vermelho_dama.png") && this.tabuleiro[pos[0]-2][pos[1]+2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-2][pos[1]+2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] > 1 && this.tabuleiro[pos[0]-2][pos[1]+2] == "img/opcao.png"){
					this.tabuleiro[pos[0]-2][pos[1]+2] = "img/casa_preta.png";
				}
				if(pos[0] > 1 && (this.tabuleiro[pos[0]-1][pos[1]-1] == "img/vermelho.png" || this.tabuleiro[pos[0]-1][pos[1]-1] == "img/vermelho_dama.png") && this.tabuleiro[pos[0]-2][pos[1]-2] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-2][pos[1]-2] = "img/opcao.png";
					this.comer = true;
				}
				else if(pos[0] > 1 && this.tabuleiro[pos[0]-2][pos[1]-2] == "img/opcao.png"){
					this.tabuleiro[pos[0]-2][pos[1]-2] = "img/casa_preta.png";
				}
				if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]+1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-1][pos[1]+1] = "img/opcao.png";
				}
				else if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]+1] == "img/opcao.png"){
					this.tabuleiro[pos[0]-1][pos[1]+1] = "img/casa_preta.png";
				}
				if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]-1] == "img/casa_preta.png"){
					this.tabuleiro[pos[0]-1][pos[1]-1] = "img/opcao.png";
				}
				else if(pos[0] > 0 && this.tabuleiro[pos[0]-1][pos[1]-1] == "img/opcao.png"){
					this.tabuleiro[pos[0]-1][pos[1]-1] = "img/casa_preta.png";
				}
			}
		},
		mover: function(pos){
			//APENAS INVERTE AS PEÇAS
			var aux = this.tabuleiro[pos[0]][pos[1]];
			this.tabuleiro[pos[0]][pos[1]] = this.tabuleiro[this.peca[0]][this.peca[1]];
			this.tabuleiro[this.peca[0]][this.peca[1]] = aux;
		},
		getClass: function(i, j){
			//DEFINE A COR DAS CASAS NO TABULEIRO
			if(i % 2 == 0 && j % 2 == 0){
				return "casa_branca";
			}
			else if(i % 2 == 1 && j % 2 == 1){
				return "casa_branca";
			}
			else { return "casa_preta"}
		}
	},
	mounted: function(){
		var me = this;
		$.ajax({
			url: "id.php",
			method: "GET",
			success: function(data){
				me.id = data;
			}
		});
		this.mostrarSalas();
		// setInterval(function(){ me.verifJogada(); }, 500);	
	}
});
// [["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],["img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png"],["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"],["img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png"],["img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png"],["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"],["img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png"],["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"]]



// [["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"], ["img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png"], ["img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png","img/transparente.png","img/vermelho.png"], ["img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png"], ["img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png","img/transparente.png","img/casa_preta.png"], ["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"], ["img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png"], ["img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png","img/branca.png","img/transparente.png"]]