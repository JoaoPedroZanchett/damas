<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8"/>
	<link href="css/icon.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="css/materialize.min.css" media="screen,projection"/>
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1">
	<script src="jquery-3.1.1.min.js"></script>
	<script type="text/javascript" src="js/materialize.min.js"></script>
	<title>Jogo de Damas Online</title>
</head>
<body>
	<nav><div class="nav-wrapper red darken-4"><a class="brand-logo center">Cadastrar Usuário - Jogo de Damas Online</a></div></nav>
	<div class="container">
		<div class="row">
	        <div class="card col offset-s1 s10 offset-m4 m4">
				<div class="card-content">
					<form class="col s12" method="post" action="cadastrarUsuario.php">
						<div class="input-field col s12">
				          	<input name="nomeCompleto" type="text" class="validate">
				          	<label for="nomeCompleto">Nome Completo</label>
				        </div>
						<div class="input-field col s12">
				          	<input name="nomeUsuario" type="text" class="validate">
				          	<label for="nomeUsuario">Nome de Usuário</label>
				        </div>
				        <div class="input-field col s12">
				          	<input name="email" type="text" class="validate">
				          	<label for="email">E-mail</label>
				        </div>
				        <div class="input-field col s12">
				          	<input name="senha" type="password" class="validate">
				          	<label for="senha">Senha</label>
				        </div>
				        <button type="submit" class="waves-effect waves-light btn col s12 red darken-4">CADASTRAR</button>
			          	<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
				    </form>
				</div>
			</div>
	    </div>
	</div>
</body>
</html>

<?php
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "dadosdamas";
	$conexao = new mysqli($host,$user, $pass, $db);
	if($_POST){
		$nomeUsuario = $_POST['nomeUsuario'];
		$nomeCompleto = $_POST['nomeCompleto'];
		$email = $_POST['email'];
		$senha = $_POST['senha'];

		$sql = "SELECT nomeUsuario FROM jogadores WHERE nomeUsuario=$nomeUsuario";
		if(!$conexao->query($sql)){
			$stmt = $conexao->prepare("INSERT INTO jogadores (nomeUsuario, nomeCompleto, email, senha) VALUES (?, ?, ?, ?)");
			$stmt->bind_param("ssss", $nomeUsuario, $nomeCompleto, $email, $senha);
			if($stmt->execute()){
				header("Location: index.php");
			}
		}
	}
?>