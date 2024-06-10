import React, { useState } from "react";

const ProjectType = ({ data, saveData }) => {
  const [formData, setFormData] = useState(data);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    saveData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <form>
      <h2 className="text-2xl font-bold mb-4 text-center">Project type</h2>
      {/* Project Type Buttons */}
      <div className="mb-4">
        <div className="flex ">
          <button
            type="button"
            className={`py-2 px-2  w-1/3 ${
              formData.projectType === "Time & Materials"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() =>
              setFormData({ ...formData, projectType: "Time & Materials" })
            }
          >
            Time & Materials
          </button>
          <button
            type="button"
            className={`py-2 px-4  w-1/3 ${
              formData.projectType === "Fixed Fee"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() =>
              setFormData({ ...formData, projectType: "Fixed Fee" })
            }
          >
            Fixed Fee
          </button>
          <button
            type="button"
            className={`py-2 px-4 w-1/3 ${
              formData.projectType === "Non-Billable"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() =>
              setFormData({ ...formData, projectType: "Non-Billable" })
            }
          >
            Non-Billable
          </button>
        </div>
      </div>
      {/* Hourly Rate Input for Time & Materials Project Type */}
      {formData.projectType === "Time & Materials" && (
        <div className="mb-4">
          <label className="block text-gray-700">Hourly</label>
          <div className="flex gap-1">
            <select className="w-2/3 mt-1 p-2 border border-gray-300 rounded-md">
              <option>Project Hourly Rate</option>
            </select>
            <input
              type="number"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleChange}
              className="mt-1 block w-1/3 border border-gray-300 rounded py-2 px-4"
              required
            />
          </div>
        </div>
      )}
      {/* Budget Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Budget</label>
        <div className="flex gap-2">
          <select className="w-2/3 mt-1 p-2 border border-gray-300 rounded-md">
            <option>Hours per Person</option>
          </select>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="mt-1 block w-1/3 border border-gray-300 rounded py-2 px-4"
            required
          />
        </div>
      </div>
      {/* Email Alert Input */}
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          name="emailAlert"
          checked={formData.emailAlert}
          onChange={handleChange}
          className="mr-2"
        />
        <label className="text-gray-700">
          Send email alerts if project exceeds
        </label>
        <input
          type="number"
          name="alertThreshold"
          value={formData.alertThreshold}
          onChange={handleChange}
          className="ml-2 w-16 border border-gray-300 rounded py-2 px-3"
          required
        />
        % of budget
      </div>
    </form>
  );
};

export default ProjectType;
