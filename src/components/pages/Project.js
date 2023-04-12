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

    projectList.map((item, index) => {
      if (item.id === id) {
        projectList[index] = project;

        setProject(project);
        setShowProjectForm(false);
        setMessage("Projeto atualizado.");
        setType("success");

        return true;
      }
      return item;
    });

    localStorage.setItem("projectList", JSON.stringify(projectList));
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);
    // Todo: Refactor the usage of map

    const projectList = JSON.parse(localStorage.getItem("projectList"));
    // Copy the original arr to find the service inside the project that matches the id
    // Then pop the service from the orignal list and save in the localStorage
    const newList = projectList;

    newList.map((item, index) =>
      item.services.map((item, serviceIndex) =>
        item.id === id ? projectList[index].services.pop(serviceIndex) : item
      )
    );
    // JSON.parse(localStorage.getItem('projectList'))[0].services[0].id ==='573bd6b0-db5a-48bf-9e4d-027d9934e6c2'

    localStorage.setItem("projectList", JSON.stringify(projectList));
    setProject(projectUpdated);
    setServices(servicesUpdated);
    setMessage("Serviço removido com sucesso!");
    setType("success");
  }

  function createService(project) {
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
    const newList = projectList.map((item) =>
      item.id === id ? project : item
    );

    localStorage.setItem("projectList", JSON.stringify(newList));
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
