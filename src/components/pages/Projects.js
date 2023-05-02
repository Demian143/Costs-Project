import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { success } from "../messages/messages";
import { ToastContainer } from "react-toastify";

import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";
import ProjectCart from "../project/ProjectCard";
import Loading from "../layout/Loading";

import styles from "./styles/Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  useEffect(() => {
    const projectsData = localStorage.getItem("projectList");

    setProjects(JSON.parse(projectsData));
    setRemoveLoading(true);
  }, []);

  let location = useLocation();

  useEffect(() => {
    if (location.state) {
      success(location.state.message);
    }
    // To avoid duplicates in dev enviroment
    return () => {
      location.state = null;
    };
  }, [location]);

  const removeProject = (id) => {
    const projectsData = JSON.parse(localStorage.getItem("projectList"));
    const newList = projectsData.filter((project) => project.id !== id);

    localStorage.setItem("projectList", JSON.stringify(newList));

    setProjects(newList);
    success("Projeto removido com sucesso.");
  };

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar projeto" />
      </div>
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
      <ToastContainer />
    </div>
  );
}

export default Projects;
