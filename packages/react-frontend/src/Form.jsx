import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({ name: "", job: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  }

  function submitForm() {
    props.handleSubmit(person);
    setPerson({ name: "", job: "" });
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        value={person.name}
        onChange={handleChange}
      />
      <label htmlFor="job">Job</label>
      <input
        id="job"
        name="job"
        value={person.job}
        onChange={handleChange}
      />
      <input type="button" value="Submit" onClick={submitForm} />
    </form>
  );
}

export default Form;