import styles from './styles/ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import Submit from '../form/Submit';
import { useState, useEffect } from 'react';

function ProjectForm({ handleSubmit, projectData, btnText }) {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => response.json())
            .then((data) => { setCategories(data) })
            .catch((error) => { console.log(error) });
    }, [])

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input
                handleOnChange={handleChange}
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                value={project.name ? project.name : ''} />
            <Input
                handleOnChange={handleChange}
                type="number"
                text="Orçamento do projeto"
                name="orçamento"
                placeholder="Insira o orçamento total"
            />
            <Select
                handleOnChange={handleCategory}
                name="category_id"
                text="Selecione a categoria"
                value={project.category ? project.category.id : ''}
                options={categories} />
            <Submit text={btnText} />
        </form>
    )
}


export default ProjectForm;