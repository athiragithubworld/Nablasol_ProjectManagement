import React, { useState } from "react";

const TeamForm = ({ data, saveData, setStep }) => {
  const [team, setTeam] = useState(data.team || []);
  const [newMember, setNewMember] = useState("");

  // Function to add a new team member to the list
  const addMember = () => {
    if (newMember.trim() !== "") {
      const updatedTeam = [...team, newMember];
      setTeam(updatedTeam);
      saveData({ team: updatedTeam });
      setNewMember("");
    }
  };

  // Function to remove a team member from the list
  const removeMember = (member) => {
    const updatedTeam = team.filter((m) => m !== member);
    setTeam(updatedTeam);
    saveData({ team: updatedTeam });
  };

  return (
    <form>
      {/* Heading for the team section */}
      <h2 className="text-2xl font-bold mb-4 text-center">Team</h2>
      {/* Input field and button to add new team members */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newMember}
          onChange={(e) => setNewMember(e.target.value)}
          placeholder="Invite or Add a person"
          className="mt-1 block w-full border border-gray-300 rounded py-2 px-4"
        />
        <button
          type="button"
          onClick={addMember}
          className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
        >
          Add
        </button>
      </div>

      {/* List of team members with option to remove */}
      <ul className="mb-4">
        {team.map((member) => (
          <li key={member} className="flex items-center justify-between py-2">
            <span>{member}</span>
            <button
              type="button"
              onClick={() => removeMember(member)}
              className="text-red-500"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
};

export default TeamForm;
