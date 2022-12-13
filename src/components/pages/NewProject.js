import { useNavigate } from "react-router-dom";
import styles from './styles/NewProject.module.css';
import ProjectForm from '../project/ProjectForm';

export default function NewProject() {
    const history = useNavigate();

    function createPost(project) {
        // Inicializar o cost e serviços
        project.budget = 0;
        project.services = [];

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((data) => { history('/projects', { message: 'Projeto criado com sucesso.' }) })
            .catch((err) => { console.log(err) });
    }

    return (
        <div className={styles.newproject_container} >
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços.</p>
            <ProjectForm handleSubmit={createPost} />
        </div>
    )
}