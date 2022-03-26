const Persons = ({ persons, remove }) => {
  return (
    <ul>
      {persons.map(({ id, name, number }) => (
        <li key={name} style={{ display: "flex", alignItems: "center" }}>
          <p>
            {name} {number}
          </p>
          <button
            onClick={() => {
              remove(id, name);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
export default Persons;
