import React, { useState, useEffect } from "react";
import {
  candidateSignupFields,
  employerSignupFields,
} from "../../constants/formFields";
import FormAction from "../FormAction";
import NotificationBanner from "../NotificationBanner";
import useNotification from "../../services/useNotification";
import { useNavigate } from "react-router-dom";
import { registerUserAPI } from "../../api/authApi";
import InputField from "../Input";
import Ruthi_logo from "../../assets/Ruthi_logo.png";
import wavesNegative from "../../assets/wavesNegative.svg";
import wavesNegative1 from "../../assets/wavesNegative1.svg";

export default function Signup() {
  const [isEmployer, setIsEmployer] = useState(false);
  const [signUpState, setSignUpState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const { notification, showNotification, closeNotification } =
    useNotification();

  useEffect(() => {
    const fields = isEmployer ? employerSignupFields : candidateSignupFields;
    const initialState = {};
    fields.forEach((field) => (initialState[field.id] = ""));
    setSignUpState(initialState);
  }, [isEmployer]);

  const handleChange = (e) => {
    setSignUpState({ ...signUpState, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (notification) {
      setIsSubmitting(false);
    }
  }, [notification]);

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Invalid email format";
    }

    // Company email validation (basic check for non-common domains)
    if (isEmployer) {
      const commonDomains = [
        "gmail.com",
        "yahoo.com",
        "hotmail.com",
        "outlook.com",
      ];
      const domain = email.split("@")[1];
      if (commonDomains.includes(domain)) {
        return "Please use a company email address";
      }
    }

    return null;
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    var is_valid = true;
    const fields = isEmployer ? employerSignupFields : candidateSignupFields;

    // Create a new object to store the updated sign up state
    let updatedSignUpState = { ...signUpState };

    var password = "";
    // validating input fields
    for (const field of fields) {
      console.log("print fields", field.name);

      // removing existing error message
      field.error = false;
      field.errorMessage = "";

      // updatedSignUpState[field.id + "Error"] = false;

      //checking if value exists or not
      console.log("sign up state", signUpState[field.id]);
      if (!signUpState[field.id]) {
        field.error = true;
        field.errorMessage = `${field.labelText} is required`;
        //updatedSignUpState[field.id + "Error"] = true;
        //updatedSignUpState[field.id + "ErrorMessage"] = `${field.labelText} is required`;
        is_valid = false;
      } else {
        // validate if its a proper username
        if (
          field.name === "username" &&
          !/^[a-z0-9_]+$/.test(signUpState[field.id].trim())
        ) {
          field.error = true;
          field.errorMessage =
            "Username can only contain lowercase letters, numbers, and underscores";
          is_valid = false;
        } else if (field.name === "email") {
          const emailError = validateEmail(signUpState[field.id].trim());
          if (emailError) {
            field.error = true;
            field.errorMessage = emailError;
            is_valid = false;
          }
        } else if (field.name === "password") {
          password = signUpState[field.id];
          if (signUpState[field.id].length < 8) {
            field.error = true;
            field.errorMessage = "Password must be at least 8 characters long";
            is_valid = false;
          } else if (
            /\s/.test(signUpState[field.id]) ||
            signUpState[field.id].includes(",")
          ) {
            field.error = true;
            field.errorMessage =
              "Password should not contain white spaces and commas";
            is_valid = false;
          }
        } else if (
          field.name === "confirm_password" &&
          signUpState[field.id] !== password
        ) {
          field.error = true;
          field.errorMessage = "Passwords do not match";
          is_valid = false;
        }
      }
      // Update the sign up state with the new error states
      setSignUpState(updatedSignUpState);
    }

    if (is_valid) {
      setIsSubmitting(true);
      registerUserAPI(
        { ...signUpState, role: isEmployer ? "recruiter" : "candidate" },
        showNotification,
        () => navigate("/login")
      );
    }
  };

  const fields = isEmployer ? employerSignupFields : candidateSignupFields;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {notification && (
        <NotificationBanner
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      {/* Left Side */}
      <div className="w-full lg:w-1/3 bg-blue-900 text-white p-6 lg:p-8 flex flex-col items-start justify-center z-10">
        <div className="flex items-center">
          <img
            src={Ruthi_logo}
            alt="Ruthi Logo"
            className="w-20 lg:w-24 h-auto mb-3"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-center">Ruthi</h1>
        </div>
        <p className="text-base lg:text-lg max-w-xs lg:max-w-sm leading-relaxed text-start">
          A platform for job-seekers to practice interviews and get evaluated.
          Hone your skills and get ready for your dream job with real-time
          feedback and tailored advice.
        </p>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-2/3 flex items-center justify-end p-4 lg:p-8 relative">
        <div className="fixed inset-0 overflow-hidden z-0 hidden lg:block">
          <img
            src={wavesNegative}
            alt="SVG Curve"
            className="absolute right-0 top-0 h-full w-full object-cover"
            style={{ transform: "rotate(90deg)" }}
          />
        </div>

        {/* Form Container */}
        <div className="relative p-4 lg:p-6 rounded-lg w-full max-w-md z-10 lg:mr-8 overflow-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-orange-500 mb-4">
            Create an Account
          </h1>

          <div className="flex space-x-3 mb-4">
            <button
              className={`flex-1 px-3 py-2 text-sm ${
                !isEmployer
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-full transition-colors duration-300`}
              onClick={() => setIsEmployer(false)}
            >
              Candidate
            </button>
            <button
              className={`flex-1 px-3 py-2 text-sm ${
                isEmployer
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded-full transition-colors duration-300`}
              onClick={() => setIsEmployer(true)}
            >
              Employer
            </button>
          </div>

          <form onSubmit={handleSubmitSignUp} className="space-y-3 mb-2">
            {fields.map((field) => (
              <InputField
                key={field.id}
                handleChange={handleChange}
                value={signUpState[field.id]}
                labelText={field.labelText}
                labelFor={field.labelFor}
                id={field.id}
                name={field.name}
                type={field.type}
                isRequired={field.isRequired}
                placeholder={field.placeholder}
                error={field.error}
                errorMessage={field.errorMessage}
              />
            ))}

            <FormAction
              handleClick={handleSubmitSignUp}
              text="Sign Up"
              loading={isSubmitting}
              customStyles="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
            />
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            Already a user?{" "}
            <a href="/login" className="text-blue-700 font-semibold">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
