<?php
	$erro = "";
?>

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
	<nav><div class="nav-wrapper red darken-4"><a class="brand-logo center">Jogo de Damas Online</a></div></nav>
	<div class="container">
		<div class="row">
			<br><br>
			<div class="card col offset-s1 s10 offset-m4 m4">
				<div class="card-content">
					<form class="col s12" method="post" action="index.php">
						<div class="input-field col s6">
				          	<input name="user" type="text" class="validate">
				          	<label for="user">Usuário</label>
				        </div>
						<div class="input-field col s6">
				          	<input name="password" type="password" class="validate">
				          	<label for="password">Senha</label>
				        </div>
				        <button type="submit" class="waves-effect waves-light btn col s12 red darken-4">ENTRAR</button>
			          	<p><br><br><br><br><br><br><a href="cadastrarUsuario.php" class="blue-text text-light-3"><br>Cadastrar-se.</a><br><a href="#" class="blue-text text-light-3">Esqueceu sua senha?</a>
			          	<br><br></p>
				    </form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>

<?php 
	session_start();
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "dadosdamas";
	$conexao = new mysqli($host,$user, $pass, $db);

	if($_POST){
		$nomeUsuario = $_POST['user'];
		$senha = $_POST['password'];
		$sql = "SELECT nomeUsuario, nomeCompleto FROM jogadores WHERE nomeUsuario='$nomeUsuario' && senha='$senha'";
		$resultado = $conexao->query($sql);
		$resultado = $resultado->fetch_assoc();
		if($resultado){
			$_SESSION['nomeUsuario'] = $nomeUsuario;
			$_SESSION['nomeCompleto'] = $resultado['nomeCompleto'];
			header("Location: login.php");
		}
		else {
			echo "<center><h3 style='color: red'>Usuário ou senha incorretos</h3></center>";
		}
	}

?>