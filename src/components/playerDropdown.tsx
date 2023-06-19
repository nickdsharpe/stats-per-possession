import { ChangeEvent } from "react";

type PlayerDataDropdownProps = {
  selectedPlayerData: string;
  handlePlayerDataChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  players: any;
};

const PlayerDataDropdown: React.FC<PlayerDataDropdownProps> = ({
  selectedPlayerData,
  handlePlayerDataChange,
  players,
}) => {
  return (
    <div>
      <div className="dropdown-label">
        <label htmlFor="data-dropdown">Player:</label>
        <div className="dropdown-wrapper">
          <select
            className="data-dropdown"
            id="dataSelect"
            value={selectedPlayerData}
            onChange={handlePlayerDataChange}
          >
            {players.map((player: any) => (
              <option key={player.player} value={player.name}>
                {player.player}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default PlayerDataDropdown;
