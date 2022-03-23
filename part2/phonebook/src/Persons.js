const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(({ name, number }) => (
        <li key={name}>
          {name} {number}
        </li>
      ))}
    </ul>
  );
};
export default Persons;
