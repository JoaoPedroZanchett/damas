<?php
	session_start();
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "dadosdamas";
	$conexao = new mysqli($host,$user, $pass, $db);
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"/>
	<link href="css/icon.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection"/>
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
	<title>Jogo de Damas Online</title>
</head>
<body>
	<nav><div class="nav-wrapper red darken-4"><a class="brand-logo center"><?php echo $_SESSION['nomeCompleto'] ?> - Jogo de Damas Online</a></div></nav>
	<div class="container" id="meuvue">
		<div class="row">
			<br><br>
			<div class="card col offset-s1 s10 offset-m4 m4">
				<div class="card-content">
					<table>
						<h4>Jogos Abertos</h4>
						<thead>
							<tr>
								<td>Sala</td>
								<td>Status</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="sala in salasCriadas">
								<td>{{sala.nomeSala}}</td>
								<td><a href="game.php" v-on:click="entrarSala(sala)">{{sala.status}}</a></td>
							</tr>
							<tr>
								<td><input placeholder="Nome da Sala" v-model="inputNomeSala"></td>
								<td><button v-on:click="criarSala()">CRIAR SALA</button></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<script src="jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="js/materialize.min.js"></script>
	<script type="text/javascript" src="vue.js"></script>
</body>
</html>

