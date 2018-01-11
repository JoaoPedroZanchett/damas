<?php
	$host = "localhost";
	$user = "root";
	$pass = "";
	$db = "dadosdamas";
	$conexao = new mysqli($host,$user, $pass, $db);

	$sql = "SELECT * FROM tabuleiro";
	$resultado = $conexao->query($sql);

	while($linha = $resultado->fetch_assoc()) {
		$pessoa =  array(
	       array(
	          'vez'     => $linha["vez"],
	          'posicoes'       => $linha["posicoes"]
	        )
	     );
		echo $json1 = json_encode( $pessoa );
	}

?>



