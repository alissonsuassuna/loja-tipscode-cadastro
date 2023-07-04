import { db } from '../db.js';

export const getProdutos = (_, res) => {

    const q = 'SELECT * FROM produtos';

    db.query(q, (err, data) => {

        if(err) {
            return res.json(err)
        }

        return res.status(200).json(data)
    })
}

export const addProdutos = (request, response) => {
    const q =
      "INSERT INTO produtos(`nome`, `preco`, `estoque`, `fone`) VALUES(?)";
  
    const values = [
      request.body.nome,
      request.body.preco,
      request.body.estoque,
      request.body.fone,
    ];
    console.log(values)
    console.log(request.body)
    db.query(q, [values], (err) => {
      if (err) return response.json(err);
  
      return response.status(200).json("Produto criado com sucesso.");
    });
  };
  
  export const updateProdutos = (req, res) => {

    const q = "UPDATE produtos SET `nome` = ?, `preco` = ?, `estoque` = ?, `fone` = ? WHERE `id` = ?";


    const values = [
        req.body.nome,
        req.body.preco,
        req.body.estoque,
        req.body.fone
    ];
    console.log(req.body)
    db.query(q, [...values, req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json('produto atualizado com sucesso!');
    });
};
  
  export const deleteProduto = (req, res) => {

    const q = "DELETE FROM produtos WHERE `id` = ? ";

    db.query(q, [req.params.id], (err) => {
        if(err) return res.json(err);

        return res.status(200).json('produto deletado com sucesso!');
    });

}