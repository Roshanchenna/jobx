"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconUserBolt,
  IconPlus,
  IconBook,
  IconDeviceDesktop,
  IconBriefcase,
  IconChevronLeft,
  IconChevronRight,
  IconNotebook,
  IconRocket,
  IconAward,
  IconUserCheck,
  IconFlag,
  IconBallFootball,
  IconTrash
} from '@tabler/icons-react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../ui/lib/utils";
import Ruthi_Logo from "../assets/Ruthi_Logo.svg";
import BasicInformationForm from "./ProfilePageComponents/BasicInformationForm";
import Education from "./ProfilePageComponents/Education";
import ExperienceForm from "./ProfilePageComponents/ExperienceForm";
import TechnicalSkills from "./ProfilePageComponents/TechnicalSkills";
import AddSectionModal from "./ProfilePageComponents/AddSectionModal";

const sectionIcons = {
  "Publications": IconNotebook,
  "Personal Projects": IconRocket,
  "Awards and Achievements": IconAward,
  "Positions of Responsibility": IconUserCheck,
  "Competitions": IconFlag,
  "Extra-curricular Activities": IconBallFootball
};

export default function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Basic Information");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalSections, setAdditionalSections] = useState([]);

  const initialLinks = [
    { label: "Basic Information", icon: <IconUserBolt />, href: "#" },
    { label: "Education", icon: <IconBook />, href: "#" },
    { label: "Experience", icon: <IconBriefcase />, href: "#" },
    { label: "Technical Skills", icon: <IconDeviceDesktop />, href: "#" },
    { label: "Add more", icon: <IconPlus />, href: "#", onClick: () => setIsModalOpen(true) },
    { label: "Logout", icon: <IconArrowLeft />, href: "http://localhost:3000/" },
  ];

  const [links, setLinks] = useState(initialLinks);

  const handleAddSection = (newSection) => {
    setAdditionalSections([...additionalSections, newSection]);
    const IconComponent = sectionIcons[newSection] || IconPlus;
    setLinks([
      ...links.slice(0, -2),
      { 
        label: newSection, 
        icon: <IconComponent />, 
        href: "#",
        deletable: true
      },
      ...links.slice(-2),
    ]);
  };

  const handleDeleteSection = (sectionToDelete) => {
    setAdditionalSections(additionalSections.filter(section => section !== sectionToDelete));
    setLinks(links.filter(link => link.label !== sectionToDelete));
    if (selectedSection === sectionToDelete) {
      setSelectedSection("Basic Information");
    }
  };

  const sections = ["Basic Information", "Education", "Experience", "Technical Skills", ...additionalSections];
  const currentIndex = sections.indexOf(selectedSection);

  const handleNavigation = (direction) => {
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < sections.length) {
      setSelectedSection(sections[newIndex]);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} className="flex-shrink-0">
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div key={idx} className="group relative flex items-center">
                  <SidebarLink
                    link={link}
                    onClick={() => {
                      if (link.onClick) {
                        link.onClick();
                      } else {
                        setSelectedSection(link.label);
                      }
                    }}
                    isActive={selectedSection === link.label}
                    className="w-full"
                  />
                  {link.deletable && (
                    <button
                      onClick={() => handleDeleteSection(link.label)}
                      className="absolute right-2 p-1 text-red-500 hover:text-red-700 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <IconTrash size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4">
          <Dashboard 
            selectedSection={selectedSection}
            additionalSections={additionalSections}
          />
        </main>
        <div className="bg-white p-4">
          <div className="max-w-4xl mx-auto w-full flex justify-between">
            <button
              onClick={() => handleNavigation('prev')}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <IconChevronLeft className="w-5 h-5 inline-block mr-1" />
              Previous
            </button>
            <button
              onClick={() => handleNavigation('next')}
              disabled={currentIndex === sections.length - 1}
              className="px-4 py-2 bg-orange-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <IconChevronRight className="w-5 h-5 inline-block ml-1" />
            </button>
          </div>
        </div>
      </div>
      <AddSectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSection={handleAddSection}
      />
    </div>
  );
}

const Dashboard = ({ selectedSection, additionalSections }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full">
          {(() => {
            switch (selectedSection) {
              case "Basic Information":
                return <BasicInformationForm />;
              case "Education":
                return <Education />;
              case "Experience":
                return <ExperienceForm />;
              case "Technical Skills":
                return <TechnicalSkills />;
              default:
                return <div>Content for {selectedSection} goes here</div>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export const Logo = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src={Ruthi_Logo}
        alt="Ruthi Logo"
        className="h-5 w-6 object-cover rounded-br-lg rounded-tr-sm rounded-lg rounded-bl-sm flex-shrink-0"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        Ruthi
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      to="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <img
        src={Ruthi_Logo}
        alt="Ruthi Logo"
        className="h-5 w-6 object-cover rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"
      />
    </Link>
  );
};
