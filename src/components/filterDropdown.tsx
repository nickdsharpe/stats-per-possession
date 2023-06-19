import { ChangeEvent } from "react";

type FilterDropdownProps = {
  selectedOption: string;
  handleOptionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  selectedOption,
  handleOptionChange,
}) => {
  return (
    <div>
      <div className="dropdown-label">
        <label htmlFor="filter-dropdown">Filter:</label>
        <div className="dropdown-wrapper">
          <select
            className="filter-dropdown"
            id="filter-dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="total">Total</option>
            <option value="shoot">Shooting</option>
            <option value="pass">Passing</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;
