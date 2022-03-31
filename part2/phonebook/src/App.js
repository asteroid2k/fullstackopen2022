import { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import services from "./services";
import "./app.css";

const { getAll, create, remove, put } = services;

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");

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

      overwriteContact({ ...existing, ...newContact });

      return;
    }
    create(newContact)
      .then((data) => setPersons(persons.concat(data)))
      .then((err) => {
        notify(`Added ${newName}`);
      })
      .catch((e) => {
        const errorMsg = e.response && e.response.data.error;
        showError(errorMsg || `${newContact.name} was not added.`);
      });
    clearForm();
  };

  const overwriteContact = (contact) => {
    const overwrite = (data) =>
      persons.map((note) => (note._id !== data._id ? note : data));
    put(contact)
      .then((data) => {
        setPersons(overwrite(data));
        notify(`${contact.name} has been updated.`);
      })
      .catch(() => showError(`${contact.name} was not updated.`));
  };

  const deleteContact = (id, name) => {
    const confirm = window.confirm(`Delete ${name}`);
    if (!confirm) {
      return;
    }
    const removeDeleted = () => persons.filter((person) => person._id !== id);
    setPersons(removeDeleted());
    remove(id)
      .then((data) => notify(`${name} has been deleted.`))
      .catch(() => showError(`${name} was not deleted.`));
  };

  useEffect(fetchPersons, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
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
    setFilterName(event.target.value);
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
  const notify = (text) => {
    setNotification(text);
    setTimeout(() => {
      setNotification("");
    }, 2000);
  };
  const showError = (text) => {
    setError(text);
    setTimeout(() => {
      setError("");
    }, 2000);
  };

  const contactList = filterName ? filterByName() : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.length > 0 && (
        <div className="notif">
          <p>{notification}</p>
        </div>
      )}
      {error.length > 0 && (
        <div className="err">
          <p>{error}</p>
        </div>
      )}
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
