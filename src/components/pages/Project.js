import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./styles/Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";
import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../services/ServiceForm";
import ServiceCard from "../services/ServiceCard";

function Project() {
  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    const projectList = JSON.parse(localStorage.getItem("projectList"));
    const projectData = projectList.filter((item) => item.id === id);

    setProject(projectData[0]);
    setServices(projectData[0].services);
  }, [id]);

  function editPost(project) {
    if (project.orçamento < project.cost) {
      setMessage("O orçamento não pode ser menor que o custo do projeto.");
      setType("error");
      return false;
    }

    const projectList = JSON.parse(localStorage.getItem("projectList"));
    projectList.forEach((oldProject, index, array) =>
      oldProject.id === id ? (array[index] = project) : oldProject
    );

    console.log(project);
    localStorage.setItem("projectList", JSON.stringify(projectList));

    setProject(project);
    setShowProjectForm(false);
    setMessage("Projeto atualizado.");
    setType("success");
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    const projectList = JSON.parse(localStorage.getItem("projectList"));

    projectList.forEach((project, projectIndex, array) => {
      project.services.forEach((service, serviceIndex) =>
        service.id === id
          ? array[projectIndex].services.pop(serviceIndex)
          : service
      );
    });

    localStorage.setItem("projectList", JSON.stringify(projectList));
    setProject(projectUpdated);
    setServices(servicesUpdated);
    setMessage("Serviço removido com sucesso!");
    setType("success");
  }

  function createService(project) {
    // Todo: Debug this method to figure out what's really happenning here
    const lastService = project.services[project.services.length - 1];
    lastService.id = uuidv4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.orçamento)) {
      setMessage("Orçamento ultrapaçado, verifique o valor do serviço");
      setType("error");
      project.services.pop();

      return false;
    }

    project.cost = newCost;

    const projectList = JSON.parse(localStorage.getItem("projectList"));
    projectList.forEach((proj, index, array) =>
      proj.id === id ? (array[index] = project) : proj
    );

    localStorage.setItem("projectList", JSON.stringify(projectList));
    setShowServiceForm(false);
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          {message && <Message type={type} message={message} />}
          <Container customClass="column">
            <div className={styles.details_container}>
              <h1>Projeto: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar Projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Categoria:</span> {project.category.name}
                  </p>
                  <p>
                    <span>Total de Orçamento:</span> R${project.orçamento}
                  </p>
                  <p>
                    <span>Total Utilizado:</span> R${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    btnText={"Concluir Edição"}
                    handleSubmit={editPost}
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicione um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Editar Projeto" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    id={service.id}
                    key={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços cadastrados.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
