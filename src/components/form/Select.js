import styles from "./styles/Select.module.css";

function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ""}
      >
        <option>Selecione uma opção</option>
        {options.map((options, index) => (
          <option value={options.id} key={index}>
            {options.category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
