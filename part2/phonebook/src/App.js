import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import services from "./services";

const { getAll, create, remove, put } = services;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const fetchPersons = () => {
    getAll().then((data) => setPersons(data));
  };

  const addContact = (event) => {
    event.preventDefault();
    const newContact = {
      date: new Date().toISOString(),
      name: newName,
      number: newNumber,
    };
    const existing = checkDuplicate(newContact);
    if (existing) {
      const confirm = window.confirm(
        `${newContact.name} is already added to phonebook, replace the old one?`
      );
      if (!confirm) {
        return;
      }

      return overwriteContact({ ...existing, ...newContact });
    }
    create(newContact).then((data) => setPersons(persons.concat(data)));
    clearForm();
  };

  const overwriteContact = (contact) => {
    const overwrite = (data) =>
      persons.map((note) => (note.id !== data.id ? note : data));
    put(contact).then((data) => setPersons(overwrite(data)));
    console.log("overwrite");
  };

  const deleteContact = (id, name) => {
    const confirm = window.confirm(`Delete ${name}`);
    if (!confirm) {
      return;
    }
    const removeDeleted = () => persons.filter((person) => person.id !== id);
    setPersons(removeDeleted());
    remove(id).then((data) => console.log("removed"));
  };

  useEffect(fetchPersons, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value.trim());
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value.trim());
  };

  const checkDuplicate = (contact) => {
    return persons.find(
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
      <Persons persons={contactList} remove={deleteContact} />
    </div>
  );
};

export default App;
