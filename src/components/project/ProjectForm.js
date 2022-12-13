import styles from './styles/ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import Submit from '../form/Submit';
import { useState, useEffect } from 'react';

export default function ProjectForm() {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => response.json())
            .then((data) => { setCategories(data) })
            .catch((error) => { console.log(error) });
    }, [])

    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto" />
            <Input type="number" text="Orçamento do projeto" name="orçamento" placeholder="Insira o orçamento total" />
            <Select name="category_id" text="Selecione a categoria" value="Selecione" options={categories} />
            <Submit text="Criar projeto" />
        </form>
    )
}