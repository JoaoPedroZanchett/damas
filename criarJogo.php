<?php 
	session_start();
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "dadosdamas";
	$conexao = new mysqli($host,$user, $pass, $db);
	$nomeSala = $_POST['nomeSala'];
	$donoSala = $_POST['donoSala'];
	$tabuleiro = $_POST['tabuleiro'];
	$vez = 'branca';
	$status = 'Entrar';
	$jogadorBranco = $_POST['donoSala'];
	$jogadorVermelho = '0';
	$stmt = $conexao->prepare("INSERT INTO jogos (nomeSala, donoSala, tabuleiro, vez, status, jogadorBranco, jogadorVermelho) VALUES (?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("sssssss", $nomeSala, $donoSala, $tabuleiro, $vez, $status, $jogadorBranco, $jogadorVermelho);
	$stmt->execute();
?>