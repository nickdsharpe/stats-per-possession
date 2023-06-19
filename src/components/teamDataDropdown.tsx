import { ChangeEvent } from "react";

type TeamDataDropdownProps = {
  selectedTeamData: string;
  handleTeamDataChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const TeamDataDropdown: React.FC<TeamDataDropdownProps> = ({
  selectedTeamData,
  handleTeamDataChange,
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
            onChange={handleTeamDataChange}
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
