import React, { useState } from "react";


// ClientDropdown component to select a client from a dropdown list
const ClientDropdown = ({ value, onChange, clients, addClient }) => {
  
  // State to manage the dropdown's open/close status
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4  w-1/2">
      <div className="relative w-full ">
        {/* Button to toggle the dropdown menu */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full mt-1 block text-left bg-white border border-gray-300 rounded py-2 px-4"
        >
          {value || "Select a client"}
        </button>
        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute bg-white border border-gray-300 rounded mt-1 w-full z-10">
            <ul>
              {/* Map through the clients array to render each client as a list item */}
              {clients.map((client) => (
                <li
                  key={client}
                  onClick={() => {
                    onChange(client);
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {client}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDropdown;
