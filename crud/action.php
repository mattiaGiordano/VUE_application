<?php

    //action.php

    $connect = new PDO("mysql:host=localhost;dbname=testing", "root", "");
    $received_data = json_decode(file_get_contents("php://input"));
    $data = array();
    if($received_data->action == 'fetchall')
    {
        $query = "
        SELECT * FROM tbl_esempio 
        ORDER BY id DESC
        ";
        $statement = $connect->prepare($query);
        $statement->execute();
        while($row = $statement->fetch(PDO::FETCH_ASSOC))
        {
            $data[] = $row;
        }
        echo json_encode($data);
    }
    if($received_data->action == 'insert')
    {
        $data = array(
        ':nome' => $received_data->nome,
        ':cognome' => $received_data->cognome
        );

        $query = "
        INSERT INTO tbl_esempio 
        (nome, cognome) 
        VALUES (:nome, :cognome)
        ";

        $statement = $connect->prepare($query);

        $statement->execute($data);

        $output = array(
        'messaggio' => 'Dati Inseriti'
        );

        echo json_encode($output);
    }
    if($received_data->action == 'fetchSingle')
    {
        $query = "
        SELECT * FROM tbl_esempio 
        WHERE id = '$received_data->id'
        ";

        $statement = $connect->prepare($query);

        $statement->execute();

        $result = $statement->fetchAll();

        foreach($result as $row)
        {
            $data['id'] = $row['id'];
            $data['nome'] = $row['nome'];
            $data['cognome'] = $row['cognome'];
        }

        echo json_encode($data);
    }
    if($received_data->action == 'update')
    {
        $data = array(
        ':nome' => $received_data->nome,
        ':cognome' => $received_data->cognome,
        ':id'   => $received_data->hiddenId
        );

        $query = "
        UPDATE tbl_esempio 
        SET nome = :nome, 
        cognome = :cognome 
        WHERE id = :id
        ";

        $statement = $connect->prepare($query);

        $statement->execute($data);

        $output = array(
        'messaggio' => 'Dati Aggiornati'
        );

        echo json_encode($output);
    }

    if($received_data->action == 'delete')
    {
        $query = "
        DELETE FROM tbl_esempio 
        WHERE id = '$received_data->id'
        ";

        $statement = $connect->prepare($query);

        $statement->execute();

        $output = array(
        'messaggio' => 'Dati Eliminati'
        );

        echo json_encode($output);
    }

?>