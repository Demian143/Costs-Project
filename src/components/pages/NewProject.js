import { useNavigate } from "react-router-dom";
import styles from "./styles/NewProject.module.css";
import ProjectForm from "../project/ProjectForm";

function NewProject() {
  const history = useNavigate();

  function createPost(project) {
    // Inicializar o cost e serviços
    project.cost = 0;
    project.services = [];

    // Set the project obj in the local storage and redirect to /projects
    // Todo: Add project obj to a list intead of only one obj
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

    // fetch("http://localhost:5000/projects", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(project),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     history("/projects", {
    //       state: { message: "Projeto criado com sucesso." },
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
