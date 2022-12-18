import { useLocation } from 'react-router-dom';

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from '../layout/LinkButton';
import styles from './styles/Project.module.css';

function Projects() {
    const location = useLocation();
    let message = '';

    if (location.state) {
        message = location.state.message;
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <a href='#'>Novo Projeto</a>
                <LinkButton to="/newproject" text="Criar projeto" />
            </div>
            {message && <Message type="success" message={message} />}
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>)
}

export default Projects;