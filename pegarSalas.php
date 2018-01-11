<?php
	session_start();
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "dadosdamas";
	$conexao = new mysqli($host,$user, $pass, $db);
	$sql = "SELECT * FROM jogos";
	$resultado = $conexao->query($sql);
	$todas = [];
	while($linha = $resultado->fetch_assoc()) {
		$pessoa =  array(
	       array(
	          'nomeSala' => $linha["nomeSala"],
	          'donoSala' => $linha["donoSala"],
	          'tabuleiro' => $linha["tabuleiro"],
	          'vez' => $linha['vez'],
	          'status' => $linha['status'],
	          'jogadorBranco' => $linha["jogadorBranco"],
	          'jogadorVermelho' => $linha["jogadorVermelho"]
	        )
	     );
	}
		echo $json1 = json_encode( $pessoa );
		

?>