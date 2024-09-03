'use client'

import { useState, useEffect } from "react"
import { PlusIcon, TrashIcon, ChevronDownIcon } from "lucide-react"

const skillCategories = [
  "Programming Languages",
  "Frameworks/Libraries",
  "Databases",
  "Tools/Technologies"
]

const categorySkills = {
  "Programming Languages": ["JavaScript", "Python", "Java", "C++", "Ruby", "Go", "Rust", "Other"],
  "Frameworks/Libraries": ["React", "Angular", "Vue", "Node.js", "Express", "Django", "Flask", "Other"],
  "Databases": ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Elasticsearch", "Other"],
  "Tools/Technologies": ["Docker", "Kubernetes", "AWS", "Azure", "GCP", "Git", "CI/CD", "Other"]
}

const proficiencyLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

export default function TechnicalSkills() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [skills, setSkills] = useState([])
  const [dropdowns, setDropdowns] = useState({})
  const [customSkill, setCustomSkill] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")
  const [selectedProficiency, setSelectedProficiency] = useState("")

  useEffect(() => {
    setSelectedSkill("")
    setSelectedProficiency("")
    setCustomSkill("")
  }, [selectedCategory])

  useEffect(() => {
    if (selectedSkill && selectedSkill !== "Other" && selectedProficiency) {
      addSkill()
    }
  }, [selectedSkill, selectedProficiency])

  const addSkill = () => {
    if ((selectedSkill && selectedSkill !== "Other") || (customSkill && selectedSkill === "Other")) {
      const newSkill = {
        category: selectedCategory,
        name: selectedSkill === "Other" ? customSkill : selectedSkill,
        proficiency: selectedProficiency
      }
      setSkills(prev => [...prev, newSkill])
      setSelectedSkill("")
      setSelectedProficiency("")
      setCustomSkill("")
    }
  }

  const removeSkill = (index) => {
    setSkills(prev => prev.filter((_, i) => i !== index))
  }

  const toggleDropdown = (field) => {
    setDropdowns(prev => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const renderDropdown = (options, placeholder, value, onChange) => (
    <div className="relative">
      <button
        type="button"
        onClick={() => toggleDropdown(placeholder)}
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
      >
        {value || placeholder}
        <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
      </button>
      {dropdowns[placeholder] && (
        <div className="absolute z-10 w-full mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <div
              key={option}
              className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100 transition duration-150 ease-in-out"
              onClick={() => {
                onChange(option)
                toggleDropdown(placeholder)
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Technical Skills</h1>

      <div className="bg-white shadow-xl rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add Skills</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          {skillCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {category}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-64">
              {renderDropdown(categorySkills[selectedCategory], "Select skill", selectedSkill, setSelectedSkill)}
            </div>
            {selectedSkill === "Other" && (
              <div className="w-64">
                <input
                  type="text"
                  value={customSkill}
                  onChange={(e) => setCustomSkill(e.target.value)}
                  placeholder="Enter custom skill"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                />
              </div>
            )}
            <div className="w-64">
              {renderDropdown(proficiencyLevels, "Select proficiency", selectedProficiency, setSelectedProficiency)}
            </div>
            <button
              onClick={addSkill}
              disabled={!selectedSkill || (selectedSkill === "Other" && !customSkill) || !selectedProficiency}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                selectedSkill && (selectedSkill !== "Other" || customSkill) && selectedProficiency
                  ? 'bg-green-500 text-white hover:bg-green-600 shadow-md'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-700">{skill.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{skill.proficiency}</p>
                  <p className="text-xs text-gray-500 mt-1">{skill.category}</p>
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none transition-colors duration-200"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}