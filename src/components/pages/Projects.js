import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCart from "../project/ProjectCard";
import Loading from "../layout/Loading";

import styles from "./styles/Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }

  // Get the obj in local storage
  useEffect(() => {
    const projectsData = localStorage.getItem("projectList");

    setProjects(JSON.parse(projectsData));
    setRemoveLoading(true);
  }, []);

  function removeProject(id) {
    const projectsData = JSON.parse(localStorage.getItem("projectList"));
    const newList = projectsData.filter((project) => project.id !== id);

    localStorage.setItem("projectList", JSON.stringify(newList));

    setProjects(newList);
    setProjectMessage("Projeto removido com sucesso.");
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>
      {message && <Message type="success" message={message} />}
      {projectMessage && <Message type="success" message={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCart
              id={project.id}
              name={project.name}
              budget={project.orçamento}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
