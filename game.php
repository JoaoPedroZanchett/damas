<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"/>
	<link href="css/icon.css" rel="stylesheet">
	<link href="css/css.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection"/>
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
	<title>Jogo de Damas Online</title>
</head>
<body>
	<div id="meuvue">
		<center>
			<div class="container row">
				<table>
					<thead>
						<tr><h4><b>Click:</b> {{clique}}    <b>Player:</b> {{jogador}}</h4></tr>
					</thead>
					<tbody>
						<tr v-for="i, linha in tabuleiro">						
							<td v-for="j, coluna in i" v-on:click="jogar([linha,coluna])" :class="getClass(linha, coluna)"><img :src="j"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</center>
	</div>

	<script src="jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="js/materialize.min.js"></script>
	<script type="text/javascript" src="vue.js"></script>
	<script type="text/javascript" src="js.js"></script>
</body>
</html>


