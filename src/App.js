import { useEffect, useRef, useState } from "react";

let numbers = [64, 84, 22, 32, 83, 65, 51, 26, 23, 56];
let names = [
  "Shea",
  "Ewing",
  "Yang",
  "Mcintosh",
  "Castillo",
  "Cunningham",
  "Johnston",
  "Mckay",
  "Roberson",
  "Perez",
  "Dudley",
  "Wood",
];

let skills = [
  "Angular",
  "CSS",
  "Graphic Design",
  "Ember",
  "HTML",
  "Information Architecture",
  "Javascript",
  "Mechanical Engineering",
  "Meteor",
  "NodeJS",
  "Plumbing",
  "Python",
  "Rails",
  "React",
  "Kitchen Repair",
  "Ruby",
  "UI Design",
  "User Experience",
];
function App() {
  const [filteredNumbers, setFilteredNumbers] = useState(numbers);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [dropdownSearchValue, setDropdownSearchValue] = useState("");
  const [editMode, setEditMode] = useState(false);
  const dropdownRef = useRef();

  const radioChangeHandler = (e) => {
    const value = e.target.value;
    if (value === "even") {
      setFilteredNumbers(
        numbers.filter((number) => {
          if (number % 2 === 0) {
            return true;
          }
          return false;
        })
      );
    } else {
      setFilteredNumbers(
        numbers.filter((number) => {
          if (number % 2 !== 0) {
            return true;
          }
          return false;
        })
      );
    }
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (
        editMode &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setEditMode(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editMode]);

  const skillSelectionHandler = (skill) => {
    setSelectedSkill(skill);
    setDropdownSearchValue("");
    setEditMode(false);
  };

  const filteredSkills = skills.filter((skill) =>
    skill.match(new RegExp(dropdownSearchValue, "i"))
  );

  return (
    <div className="App">
      <h2>Number filtering</h2>
      <input
        type="radio"
        name="evenOrOdd"
        id="even"
        value="even"
        onChange={radioChangeHandler}
      />
      <label htmlFor="even">Even</label>
      <input
        type="radio"
        name="evenOrOdd"
        id="odd"
        value="odd"
        onChange={radioChangeHandler}
      />
      <label htmlFor="odd">Odd</label>
      <ul>
        {filteredNumbers.map((number) => {
          return <li key={number}>{number} </li>;
        })}
      </ul>

      <h2>Search filtering</h2>
      <input
        type="text"
        name="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <ul>
        {names
          .filter((name) => name.match(new RegExp(searchValue, "i")))
          .map((name) => {
            return <li key={name}>{name} </li>;
          })}
      </ul>

      <h2>Dropdown filtering</h2>

      {editMode ? (
        <div ref={dropdownRef} className="dropdown-wrapper">
          <input
            className="dropdown-input"
            name="dropdown-input"
            autoFocus
            onChange={(e) => setDropdownSearchValue(e.target.value)}
            value={dropdownSearchValue}
          />
          <div className="dropdown-list">
            <ul>
              {filteredSkills.map((skill) => {
                return (
                  <li key={skill} onClick={() => skillSelectionHandler(skill)}>
                    {skill}{" "}
                  </li>
                );
              })}
              {filteredSkills.length === 0 && (
                <li className="no-result">No results found</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <input
          className={`dropdown-search ${
            !(dropdownSearchValue || selectedSkill) && "default"
          }`}
          onClick={() => setEditMode(true)}
          onFocus={() => setEditMode(true)}
          value={selectedSkill || "Select Primary skill"}
        />
      )}
    </div>
  );
}

export default App;
