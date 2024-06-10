

import React, { useState, useEffect } from "react";
import ClientDropdown from "../Components/Dropdown/ClientDropdown";
import { IoAddSharp } from "react-icons/io5";

const ProjectForm = ({ data, saveData }) => {
  const [formData, setFormData] = useState(data);
  const [newClient, setNewClient] = useState("");
  const [clients, setClients] = useState([]);

  // Load clients from localStorage when the component mounts
  useEffect(() => {
    const storedClients = JSON.parse(localStorage.getItem("clients"));
    if (storedClients) {
      setClients(storedClients);
    } else {
      setClients(["Client 1", "Client 2", "Client 3"]);
    }
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    saveData({ ...formData, [name]: value }); // Save data to parent component
  };

  // Handle client dropdown changes
  const handleClientChange = (value) => {
    const updatedData = { ...formData, client: value };
    setFormData(updatedData);
    saveData(updatedData); // Save data to parent component
  };

  // Add a new client to the client list
  const addClient = () => {
    if (newClient.trim() !== "") {
      const updatedClients = [...clients, newClient];
      setClients(updatedClients);
      setFormData({ ...formData, client: newClient });
      setNewClient("");
      localStorage.setItem("clients", JSON.stringify(updatedClients));
    }
  };

  return (
    <form>
      <h2 className="text-2xl font-bold mb-4 text-center">Create a project</h2>

      {/* Project Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Project name</label>
        <input
          type="text"
          name="projectName"
          value={formData.projectName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded py-2 px-4 text-gray-700 placeholder-gray-700"
          placeholder="Add Project Name"
          required
          autoComplete="off"
        />
      </div>

      {/* Client Selection and New Client Input */}
      <div className="flex flex-col gap-2 mb-4">
        <label className="block text-gray-700">Client</label>
        <div className="flex items-center gap-4">
          <ClientDropdown
            className="w-1/2"
            value={formData.client}
            onChange={handleClientChange}
            clients={clients}
          />
          <label className="text-center py-2 text-gray-400">Or</label>
          <div className="mb-3 flex items-center border border-gray-300 rounded w-1/2">
            <button
              type="button"
              onClick={addClient}
              className="py-2 px-4 rounded"
            >
              <IoAddSharp />
            </button>
            <input
              type="text"
              value={newClient}
              onChange={(e) => setNewClient(e.target.value)}
              placeholder="New client"
              className="border-none py-2 w-full text-gray-700 placeholder-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Start Date and End Date Inputs */}
      <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-4"
            required
          />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-4"
            required
          />
        </div>
      </div>

      {/* Notes Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Notes</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded py-2 px-4"
        />
      </div>
    </form>
  );
};

export default ProjectForm;

