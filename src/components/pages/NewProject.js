import { useNavigate } from "react-router-dom";
import styles from "./styles/NewProject.module.css";
import ProjectForm from "../project/ProjectForm";
import { v4 as uuidv4 } from "uuid";

function NewProject() {
  const history = useNavigate();

  function createPost(project) {
    // Inicialize cost and services
    project.cost = 0;
    project.services = [];
    // Add unique id
    project.id = uuidv4();

    if (localStorage.getItem("projectList")) {
      const projectList = JSON.parse(localStorage.getItem("projectList"));

      // Just add to a pre exitent list
      projectList.push(project);
      localStorage.setItem("projectList", JSON.stringify(projectList));

      history("/projects", {
        state: { message: "Projeto criado com sucesso." },
      });
    } else {
      // Create new list
      localStorage.setItem("projectList", JSON.stringify([project]));

      history("/projects", {
        state: { message: "Projeto criado com sucesso." },
      });
    }
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os serviços.</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
}

export default NewProject;
