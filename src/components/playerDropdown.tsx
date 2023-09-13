import { ChangeEvent } from "react";

type PlayerDataDropdownProps = {
  selectedPlayer: string;
  handlePlayerChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  players: any;
};

const PlayerDataDropdown: React.FC<PlayerDataDropdownProps> = ({
  selectedPlayer,
  handlePlayerChange,
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
            value={selectedPlayer}
            onChange={handlePlayerChange}
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
