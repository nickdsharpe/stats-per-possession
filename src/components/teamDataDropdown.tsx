import { ChangeEvent } from "react";

type TeamDataDropdownProps = {
  selectedTeamData: string;
  handleTeamChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const TeamDataDropdown: React.FC<TeamDataDropdownProps> = ({
  selectedTeamData,
  handleTeamChange,
}) => {
  return (
    <div>
      <div className="dropdown-label">
        <label htmlFor="data-dropdown">Team:</label>
        <div className="dropdown-wrapper">
          <select
            className="data-dropdown"
            id="dataSelect"
            value={selectedTeamData}
            onChange={handleTeamChange}
          >
            <option value="Nuggets">Nuggets</option>
            <option value="Heat">Heat</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TeamDataDropdown;
