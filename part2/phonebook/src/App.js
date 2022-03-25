import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value.trim());
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value.trim());
  };
  const addContact = (event) => {
    event.preventDefault();
    const newContact = { id: Date.now(), name: newName, number: newNumber };
    if (checkDuplicate(newContact) > -1) {
      alert(`${newContact.name} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(newContact));
    clearForm();
  };
  const checkDuplicate = (contact) => {
    return persons.findIndex(
      (person) =>
        person.name.toLocaleLowerCase() === contact.name.toLocaleLowerCase()
    );
  };
  const handleFilter = (event) => {
    setFilterName(event.target.value.trim());
  };
  const filterByName = () => {
    return persons.filter((person) =>
      person.name.toLocaleLowerCase().includes(filterName.toLocaleLowerCase())
    );
  };
  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const contactList = filterName ? filterByName() : persons;

  const fetchPersons = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(fetchPersons, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filterName={filterName} />
      <h2>Add New</h2>
      <PersonForm
        add={addContact}
        newNumber={newNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={contactList} />
    </div>
  );
};

export default App;
