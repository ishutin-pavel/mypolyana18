<?php
	include 'api/database.php';

	$query = "SELECT * FROM plots";
	if ($result = $mysql->query($query)) {
		while ($plot = $result->fetch_assoc()) {
			$q = "UPDATE plots SET `coordinates` = 'm ".$plot['coordinates']." z' WHERE id = '".$plot['id']."'";
			$mysql->query($q);
		}
	}
?>