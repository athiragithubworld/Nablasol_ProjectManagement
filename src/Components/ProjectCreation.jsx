
import React, { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import ProjectType from "./ProjectType";
import TasksForm from "./TaskForm";
import TeamForm from "./TeamForm";
import NavigationButtons from "../Components/NavigationButton/NavigationButtons";
import { MdOutlineClose } from "react-icons/md";

const ProjectCreation = () => {
  const [step, setStep] = useState(1);

  // State to store project data
  const [projectData, setProjectData] = useState({
    projectName: "",
    client: "",
    startDate: "",
    endDate: "",
    notes: "",
    projectType: "Time & Materials",
    hourlyRate: "",
    budget: "",
    emailAlert: false,
    alertThreshold: 80,
    tasks: [],
    team: [],
  });

  // State to store the list of projects
  const [projects, setProjects] = useState([]);

  // State to manage modal open/close
  const [isOpen, setIsOpen] = useState(true);

  // Function to handle closing the modal with a confirmation
  const closeModal = () => {
    if (
      window.confirm(
        "Are you sure you want to close? Any unsaved changes will be lost."
      )
    ) {
      setIsOpen(false);
    }
  };

  // Function to handle opening the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to save form data to state
  const saveData = (data) => {
    console.log("save data", data);
    const updatedData = { ...projectData, ...data };
    setProjectData(updatedData);
  };

  // for validation checking in ProjectForm
  const validateProjectForm = () => {
    console.log("dat", projectData);
    const requiredFields = ["projectName", "client", "startDate", "endDate"];
    for (const field of requiredFields) {
      if (!projectData[field]) {
        alert(
          `Please fill in the ${field.replace(/^\w/, (c) =>
            c.toUpperCase()
          )} field.`
        );
        return false;
      }
    }
    return true;
  };

  // validation checking for validateProjectTypeForm

  const validateProjectTypeForm = () => {
    if (projectData.projectType === "Fixed Price" && !projectData.budget) {
      alert("Please fill in the Budget field for Fixed Price projects.");
      return false;
    }
    if (
      projectData.projectType === "Time & Materials" &&
      !projectData.hourlyRate
    ) {
      alert(
        "Please fill in the Hourly Rate field for Time & Materials projects."
      );
      return false;
    }
    return true;
  };

  // validation checking for validateTasksForm
  const validateTasksForm = () => {
    if (projectData.tasks.length === 0) {
      alert("Please add at least one task.");
      return false;
    }
    return true;
  };

  // validation checking for validateTeamForm
  const validateTeamForm = () => {
    if (projectData.team.length === 0) {
      alert("Please add at least one team member.");
      return false;
    }
    return true;
  };

  // Function to validate the current step form
  const validateStep = () => {
    const stepValidators = {
      1: validateProjectForm,
      2: validateProjectTypeForm,
      3: validateTasksForm,
      4: validateTeamForm,
    };

    const validator = stepValidators[step];
    return validator ? validator() : true;
  };

  // Function to handle moving to the next step
  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  // Function to handle creating a new project and save it 
  const handleCreateProject = () => {
    if (validateStep()) {
      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem("projects")) || [];

      // Add the new form data to the existing data
      const updatedProjects = [...existingData, projectData];

      setProjects(updatedProjects);
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
      alert("Project Saved Successfully");

      // Reset the form after saving
      setProjectData({
        projectName: "",
        client: "",
        startDate: "",
        endDate: "",
        notes: "",
        projectType: "Time & Materials",
        hourlyRate: "",
        budget: "",
        emailAlert: false,
        alertThreshold: 80,
        tasks: [],
        team: [],
      });

      // Optionally, reset the step to the beginning
      setStep(1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
      {/* Button to open the form if its closed */}
      {!isOpen && (
        <button
          onClick={openModal}
          className="mb-4 bg-blue-500 text-white py-2 px-4"
        >
          Open Project Creation
        </button>
      )}
      {isOpen && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
          <div className="flex justify-end">
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 "
            >
              <span>
                <MdOutlineClose />
              </span>
            </button>
          </div>
          {step === 1 && <ProjectForm data={projectData} saveData={saveData} />}
          {step === 2 && <ProjectType data={projectData} saveData={saveData} />}
          {step === 3 && <TasksForm data={projectData} saveData={saveData} />}
          {step === 4 && <TeamForm data={projectData} saveData={saveData} />}
          <NavigationButtons
            step={step}
            setStep={setStep}
            handleNextStep={handleNextStep}
            handleCreateProject={handleCreateProject}
            validateForm={validateStep}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCreation;




