import axios from 'axios';
import React, { useEffect, useRef} from 'react';
import styled from 'styled-components';
import { toast } from "react-toastify";


const FormContainer = styled.form`

    display: flex;;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`

const InputArea = styled.div`

    display: flex;
    flex-direction: column;
`

const Label = styled.label``

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;

`

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: #fff;
    height: 42px;
`

const Form = ({ getProducts, onEdit, setOnEdit }) => {

    const ref = useRef()


    useEffect(() => {
        if (onEdit) {
          const product = ref.current;
          console.log(product.nome)
    
          product.nome.value = onEdit.nome;
          product.preco.value = onEdit.preco;
          product.estoque.value = onEdit.estoque;
          product.fone.value = onEdit.fone;
        }
      }, [onEdit]);


      const handleSubmit = async (event) => {

        event.preventDefault()

        const product = ref.current

        if(!product.nome.value || !product.preco.value || !product.estoque.value || !product.fone.value) {
            return toast.warn("Preencha todos os campos!");
        }

        if(onEdit) {
            await axios.put('http://localhost:4000/' + onEdit.id, {
                nome: product.nome.value,
                preco: product.preco.value,
                estoque: product.estoque.value,
                fone: product.fone.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
            await axios.post('http://localhost:4000', {
                nome: product.nome.value,
                preco: product.preco.value,
                estoque: product.estoque.value,
                fone: product.fone.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }

        product.nome.value = ''
        product.preco.value = ''
        product.estoque.value = ''
        product.fone.value = ''

        setOnEdit(null);

        getProducts()
      }

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="nome" type='text' />
            </InputArea>
            <InputArea>
                <Label>Preço</Label>
                <Input name="preco" type='text' />
            </InputArea>
            <InputArea>
                <Label>Estoque</Label>
                <Input name="estoque" type='text' />
            </InputArea>
            <InputArea>
                <Label>Fone</Label>
                <Input name="fone" type='text' />
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>
    )

}

export default Form;