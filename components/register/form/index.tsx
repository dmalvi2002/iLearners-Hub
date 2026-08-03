"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  FaChild,
  FaUser,
  FaBook,
  FaPhone,
  FaEnvelope,
  FaSchool,
  FaGraduationCap,
} from "react-icons/fa";

type FormData = {
  studentName: string;
  institutionName: string;
  studyYear: string;
  parentName: string;
  address: string;
  postalCode: string;
  email: string;
  phone: string;
  level: string;
  levelDetail: string;
  subjects: string[];
  homeworkClubOption: string;
  message: string;
};

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [availableSubjects, setAvailableSubjects] = useState<string[]>([]);
  const [submitError, setSubmitError] = useState<string>("");

  // Google Script Web App URL from .env.local
  const GOOGLE_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>();

  // Watch the level field to update subjects
  const watchLevel = watch("level");
  // Update available subjects when level changes
  useEffect(() => {
    if (watchLevel === "Primary") {
      setSelectedLevel("Primary");
      setAvailableSubjects(["Mathematics", "English", "Science"]);
    } else if (["S1", "S2"].includes(watchLevel)) {
      setSelectedLevel("Secondary");
      setAvailableSubjects(["Mathematics", "Science"]);
    } else if (watchLevel === "S3") {
      setSelectedLevel("Secondary");
      setAvailableSubjects(["Mathematics", "Physics", "Chemistry", "Biology"]);
    } else if (watchLevel === "National 5") {
      setSelectedLevel("National 5");
      setAvailableSubjects(["Mathematics", "Physics", "Chemistry", "Biology"]);
    } else if (watchLevel === "Highers") {
      setSelectedLevel("Highers");
      setAvailableSubjects(["Mathematics", "Physics", "Chemistry", "Biology"]);
    } else if (watchLevel === "Advanced Highers") {
      setSelectedLevel("Advanced Highers");
      setAvailableSubjects(["Mathematics", "Physics", "Chemistry", "Biology"]);
    } else if (watchLevel === "Homework Club") {
      setSelectedLevel("Homework Club");
      setAvailableSubjects([]);
    } else {
      setSelectedLevel("");
      setAvailableSubjects([]);
    }

    // Reset subjects when level changes
    setValue("subjects", []);
    setValue("homeworkClubOption", "");
  }, [watchLevel, setValue]);
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Format the current time
      const currentTime = new Date().toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/London",
      }); // Prepare the email payload according to the template structure
      const emailPayload = {
        time: currentTime,
        student_name: data.studentName,
        name_of_institution: data.institutionName,
        study_year: data.studyYear,
        parent_name: data.parentName,
        address: data.address,
        post_code: data.postalCode,
        number: data.phone,
        email: data.email,
        level: data.level,
        primary_level: data.levelDetail || "N/A",
        subjects:
          data.subjects && data.subjects.length > 0
            ? data.subjects.join(", ")
            : "N/A",
        homework_club_options: data.homeworkClubOption || "N/A",
        message: data.message || "No additional message provided",
      };

      console.log("Sending data to Google Sheets:", emailPayload);

      if (!GOOGLE_SCRIPT_URL) {
        throw new Error("Google Script URL is missing in environment variables.");
      }

      // Send data to Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(emailPayload),
      });

      const result = await response.json();

      if (result.result === "success") {
        console.log("Form submitted successfully:", result);
        setIsSuccess(true);
        reset();

        // Smooth scroll to success message container after a short delay
        setTimeout(() => {
          const successContainer = document.getElementById(
            "success-message-container"
          );
          if (successContainer) {
            successContainer.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 300); // Small delay to ensure the success message has rendered

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error(`${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        error instanceof Error
          ? `Failed to submit registration: ${error.message}`
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/70 rounded-3xl shadow-lg overflow-hidden"
        >
          <div className="p-8 text-center">
            <h2 className=" leading-tight bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-3xl font-bold text-transparent md:text-5xl drop-shadow-lg">
              Join Our Learning Adventure!
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-indigo-700">
              Fill out this form to register for a course or ask questions
            </p>
          </div>{" "}
          {isSuccess ? (
            <motion.div
              id="success-message-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-8 text-center"
            >
              <div className="bg-green-100 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Yay! We got your message!
                </h2>
                <p className="text-gray-700">
                  Our friendly team will get back to you very soon. Get ready
                  for an amazing learning journey!
                </p>
                <motion.div
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ repeat: 1, duration: 0.5 }}
                  className="text-6xl mx-auto mt-4 text-yellow-500"
                >
                  😊
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
              {/* Error message display */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
                >
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Error: </span>
                    <span>{submitError}</span>
                  </div>
                </motion.div>
              )}

              <div className="bg-yellow-100 p-4 rounded-lg mb-6 border-2 border-dashed border-yellow-300">
                <h2 className="text-xl font-bold text-yellow-700 flex items-center">
                  <FaChild className="mr-2" /> Student Information
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name of Student
                    </label>
                    <input
                      {...register("studentName", {
                        required: "Student name is required",
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter student's name"
                    />
                    {errors.studentName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.studentName.message}
                      </p>
                    )}
                  </div>{" "}
                  <div>
                    <label className=" text-sm font-medium text-gray-700 flex items-center">
                      <FaSchool className="mr-2" /> Institution Name
                    </label>
                    <input
                      {...register("institutionName", {
                        required: "Institution name is required",
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter school or institution name"
                    />
                    {errors.institutionName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.institutionName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Which year you're currently studying
                    </label>
                    <input
                      {...register("studyYear", {
                        required: "Current study year is required",
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter which year"
                    />
                    {errors.studyYear && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.studyYear.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-100 p-4 rounded-lg border-2 border-dashed border-blue-300">
                <h2 className="text-xl font-bold text-blue-700 flex items-center">
                  <FaUser className="mr-2" /> Parent Information
                </h2>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Parent's Name
                    </label>
                    <input
                      {...register("parentName", {
                        required: "Parent name is required",
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Parent/Guardian's name"
                    />
                    {errors.parentName && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.parentName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      {...register("address", {
                        required: "Address is required",
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      {...register("postalCode", {
                        required: "Postal code is required",
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Postal code"
                    />
                    {errors.postalCode && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FaPhone className="mr-1" /> Contact no.
                      </label>{" "}
                      <input
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[\d+\s]*$/,
                            message:
                              "Only numbers, + symbol and spaces are allowed",
                          },
                          maxLength: {
                            value: 17,
                            message: "Phone number cannot exceed 17 characters",
                          },
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g., +44 7123 456789"
                        maxLength={17}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <FaEnvelope className="mr-1" /> Email address
                      </label>{" "}
                      <input
                        type="email"
                        {...register("email", {
                          required: "Email address is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                            message: "Please enter a valid email address",
                          },
                          validate: {
                            noSpaces: (value) =>
                              !/\s/.test(value) ||
                              "Email address cannot contain spaces",
                            validDomain: (value) => {
                              const domain = value.split("@")[1];
                              return (
                                (domain && domain.includes(".")) ||
                                "Please enter a valid email domain"
                              );
                            },
                          },
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your.name@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-100 p-4 rounded-lg border-2 border-dashed border-green-300">
                <h2 className="text-xl font-bold text-green-700 flex items-center">
                  <FaGraduationCap className="mr-2" /> Educational Information
                </h2>
                <div className="mt-4 space-y-4">
                  {" "}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Which level you're interested in?
                    </label>
                    <select
                      {...register("level", {
                        required: "Please select a level",
                      })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a level</option>
                      <option value="Primary">Primary</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                      <option value="National 5">National 5</option>
                      <option value="Highers">Highers</option>
                      <option value="Advanced Highers">Advanced Highers</option>
                      <option value="Homework Club">Homework Club</option>
                    </select>
                    {errors.level && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.level.message}
                      </p>
                    )}
                  </div>
                  {selectedLevel === "Primary" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Primary Level Details
                      </label>
                      <select
                        {...register("levelDetail", {
                          required: "Please select a primary level",
                        })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select a primary level</option>
                        <option value="P3">P3</option>
                        <option value="P4">P4</option>
                        <option value="P5">P5</option>
                        <option value="P6">P6</option>
                        <option value="P7">P7</option>
                      </select>
                      {errors.levelDetail && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.levelDetail.message}
                        </p>
                      )}
                    </div>
                  )}{" "}
                  {availableSubjects.length > 0 &&
                    selectedLevel !== "Homework Club" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Query (Select all that apply)
                        </label>
                        <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-3 bg-gray-50">
                          {availableSubjects.map((subject) => (
                            <label
                              key={subject}
                              className="flex items-center space-x-2"
                            >
                              <input
                                type="checkbox"
                                {...register("subjects", {
                                  required:
                                    "Please select at least one subject",
                                })}
                                value={subject}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              />
                              <span className="text-sm text-gray-700">
                                {subject}
                              </span>
                            </label>
                          ))}
                        </div>
                        {errors.subjects && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.subjects.message}
                          </p>
                        )}
                      </div>
                    )}
                  {selectedLevel === "Homework Club" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Homework Club Options
                      </label>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            {...register("homeworkClubOption", {
                              required: "Please select a homework club option",
                            })}
                            value="per-hour-inquiry"
                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            Per Hour Inquiry
                          </span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            {...register("homeworkClubOption", {
                              required: "Please select a homework club option",
                            })}
                            value="subscription-inquiry"
                            className="border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">
                            Subscription Inquiry
                          </span>
                        </label>
                      </div>
                      {errors.homeworkClubOption && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.homeworkClubOption.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <FaBook className="mr-1" /> Questions or Comments
                    </label>
                    <textarea
                      {...register("message")}
                      rows={4}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Tell us anything else we should know, or ask us any questions!"
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.button
                  // whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer disabled:cursor-not-allowed px-8 inline-block py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl border-b-4 active:border-b-0 active:border-t-0 active:shadow-inner active:translate-y-1 hover:-translate-y-1 transform transition-all duration-200
                  bg-gradient-to-r from-indigo-500 to-purple-600 border-indigo-700 hover:from-indigo-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Submit Registration"
                  )}
                </motion.button>
              </div>

              <div className="text-center mt-4 text-sm text-gray-500">
                <p>We'll get back to you as soon as possible!</p>
                <div className="flex justify-center mt-4 space-x-2">
                  {["🧠", "🎨", "🔍", "🎵", "🌟"].map((emoji, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1,
                        delay: i * 0.2,
                      }}
                      className="text-2xl"
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationForm;
