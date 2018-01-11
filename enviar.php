<?php
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "dadosdamas";
	$conexao = new mysqli($host,$user, $pass, $db);

	$tabuleiro = $_POST['tabuleiro'];
	$vez = $_POST['vez'];
	echo $vez;

	$sql = "UPDATE tabuleiro SET posicoes='$tabuleiro' WHERE 1=1";
	$sql1 = "UPDATE tabuleiro SET vez='$vez' WHERE 1=1";
	$resultado = $conexao->query($sql);
	$resultado1 = $conexao->query($sql1);


?>

