import React from "react";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const NavigationButtons = ({
  step,
  setStep,
  handleNextStep,
  handleCreateProject,
}) => {
  // Function to handle moving to the next step with validation
  const handleNext = () => {
    handleNextStep(); // This will call the validation before moving to the next step
  };

  // Function to handle moving to the previous step
  const handleBack = () => {
    if (step > 1) {
      // Decrease the step by 1 if it is greater than 1
      setStep(step - 1);
    }
  };

  return (
    <div
      className={`mt-4 flex  w-full max-w-lg  ${
        step === 1 ? "items-center justify-left" : "justify-between"
      }`}
    >
      {/* Show the Back button if the current step is greater than or equal to 1 */}
      {step >= 1 && (
        <button
          onClick={handleBack}
          className="bg-white text-gray-500 pr-4 py-2 rounded flex items-center justify-start"
        >
          <span>
            <MdOutlineKeyboardArrowLeft />
          </span>
          <span>Back</span>
        </button>
      )}
      {/* Show the Next button if the current step is less than 4 */}
      {step < 4 && (
        <button
          onClick={handleNext}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            step === 1 ? "ml-auto" : ""
          }`}
        >
          Next
        </button>
      )}
      {/* Show the Create Project button if the current step is 4 */}
      {step === 4 && (
        <button
          onClick={handleCreateProject}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
        >
          Create Project
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;
