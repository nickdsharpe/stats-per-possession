import { ChangeEvent } from "react";

type GameDropdownProps = {
  selectedGame: string;
  handleGameChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const GameDropdown: React.FC<GameDropdownProps> = ({
  selectedGame,
  handleGameChange,
}) => {
  return (
    <div>
      <div className="dropdown-label">
        <label htmlFor="game-dropdown">Game:</label>
        <div className="dropdown-wrapper">
          <select
            className="game-dropdown"
            id="game-dropdown"
            value={selectedGame}
            onChange={handleGameChange}
          >
            <option value="Overall">Overall</option>
            <option value="Game3">Game 3</option>
            <option value="Game5">Game 5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default GameDropdown;
