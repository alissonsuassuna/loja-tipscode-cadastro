import React from 'react';
import styled from 'styled-components';
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from 'axios';
import { toast } from 'react-toastify'; 

const Thead = styled.thead``
const Tbody = styled.tbody``

const Table = styled.table`

    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-sizing: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`

const Tr = styled.tr``

const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;
`

const Td = styled.td`
    padding-top: 15px;
`

const Grid = ({ products, setProducts, setOnEdit }) => {
    
    const handleDelete = async (id) => {
        await axios.delete('http://localhost:4000/' + id)
        .then( ( {data} ) => {
            const newArray = products.filter( (product) => product.id !== id )

            setProducts(newArray)
            toast.success(data);
        } )
        .catch( ( { data } ) => toast.error(data) );

        setOnEdit(null)
    }

    const handleEdit = (item) => {
        setOnEdit(item)
    }

    return (
       <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Preço</Th>
                    <Th>Estoque</Th>
                </Tr>
            </Thead>

            <Tbody>
                { products.map( (item, i) => (
                    <Tr key={i}>
                        <Td width="30%"> {item.nome} </Td>
                        <Td width="30%"> {item.preco} </Td>
                        <Td width="20%"> {item.estoque} </Td>
                        <Td>
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td>
                            <FaTrash onClick={ () => handleDelete(item.id) } />
                        </Td>
                    </Tr>
                ) ) }
            </Tbody>
       </Table>
    )
}

export default Grid;