import styles from "./styles/ProjectForm.module.css";
import Input from "../form/Input";
import Select from "../form/Select";
import Submit from "../form/Submit";
import { ToastContainer } from "react-toastify";
import { error } from "../messages/messages";
import { useState } from "react";

function ProjectForm({ handleSubmit, projectData, btnText }) {
  const [project, setProject] = useState(projectData || {});

  const categories = [
    { category: "Infra", id: 1 },
    { category: "Desenvolvimento", id: 2 },
    { category: "Design", id: 3 },
    { category: "Planejamento", id: 4 },
  ];

  const submit = (e) => {
    // Fix: Object was being sent to handleSubmit without any verification
    const objIsComplete =
      project.name &&
      project.orçamento &&
      project.category &&
      project.category.name !== "Selecione uma opção";

    if (objIsComplete) {
      e.preventDefault();
      handleSubmit(project);
      return;
    } else {
      e.preventDefault();
      error("Por favor preencha todo o formulario.");
      return;
    }
  };

  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({
      ...project,
      category: {
        id: e.target.value,
        name: e.target.options[e.target.selectedIndex].text,
      },
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
        value={project.name ? project.name : ""}
      />
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
        value={project.category ? project.category.id : ""}
        options={categories}
      />
      <Submit text={btnText} />
      <ToastContainer />
    </form>
  );
}

export default ProjectForm;
