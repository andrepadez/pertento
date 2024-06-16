import { SearchInput } from 'components/SearchInput';

export const ExperimentsSearch = ({ searchText, handleSearch, resetFilters }) => {
  return (
    <div className="flex items-center justify-between">
      <SearchInput value={searchText} handleSearch={handleSearch} />
      <div>
        <a onClick={resetFilters}>reset filters</a>
      </div>
    </div>
  );
};
