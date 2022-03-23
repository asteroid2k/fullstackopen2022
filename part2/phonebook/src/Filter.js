const Filter = ({ filterName, handleFilter }) => {
  return (
    <div>
      <label htmlFor="filterName">Filter shown with:</label>
      <input id="filterName" value={filterName} onChange={handleFilter} />
    </div>
  );
};
export default Filter;
