import styles from './styles/Project.module.css';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../layout/Loading';
import Container from '../layout/Container';

function Project() {
    const { id } = useParams();
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            ).then(
                (response) => response.json()
            ).then((data) => {
                setProject(data)
            }
            ).catch((err) => { console.log(err) });
        }, 3000)
    }, [id]);

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass='column'>
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <spam>Categoria:</spam> {project.category.name}
                                    </p>
                                    <p>
                                        <spam>Total de Orçamento:</spam> R${project.orçamento}
                                    </p>
                                    <p>
                                        <spam>Total Utilizado:</spam> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}><p>detalhes do projeto</p></div>
                            )}
                        </div>
                    </Container>
                </div>)
                :
                <Loading />
            }
        </>)
}

export default Project;