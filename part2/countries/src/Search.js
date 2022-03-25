const Search = ({ search, handleInputChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="search">Find Countries</label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleInputChange}
        />
      </div>
    </form>
  );
};
export default Search;
