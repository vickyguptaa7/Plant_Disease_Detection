import React from "react";
import Ijlal from "../assets/members/ijlal.jpg";
import Ankur from "../assets/members/Ankur.jpeg";
import Vicky from "../assets/members/Vicky.jpg";
import Kovid from "../assets/members/Kovid.jpeg";
import Priyanshu from "../assets/members/Priyanshu.jpeg";
import Shairin from "../assets/members/Shairin.jpg";

import { FiTarget } from "react-icons/fi";
import { FaServicestack } from "react-icons/fa";
import { RiMessage3Fill } from "react-icons/ri";
import { BsFacebook, BsLinkedin, BsGithub } from "react-icons/bs";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";

const members = [
  {
    id: 0,
    name: "Shairin Meraj",
    education: "B.Tech ECE",
    url: Shairin,
    linkedInUrl: "https://www.linkedin.com/in/shairin-meraj-451524202",
    githubUrl: "https://github.com/ShairinMeraj",
    facebookUrl: "https://www.facebook.com/",
  },
  {
    id: 1,
    name: "Ankur Mishra",
    education: "B.Tech CSE",
    url: Ankur,
    linkedInUrl: "https://www.linkedin.com/in/ankur-mishra-374304235/",
    githubUrl: "https://github.com/qmigo",
    facebookUrl: "https://www.facebook.com/",
  },
  {
    id: 2,
    name: "Priyanshu",
    education: "B.Tech ECE",
    url: Priyanshu,
    linkedInUrl: "https://www.linkedin.com/in/priyanshu-pathak-34843220b/",
    githubUrl: "https://github.com/Pr1y4nshu",
    facebookUrl: "https://www.facebook.com/",
  },
  {
    id: 3,
    name: "Kovid Sharma",
    education: "B.Tech CSE",
    url: Kovid,
    linkedInUrl: "https://www.linkedin.com/in/kovid-sharma-469580201",
    githubUrl: "https://github.com/kovid-sharma",
    facebookUrl: "https://www.facebook.com/",
  },
  {
    id: 4,
    name: "Ijlal Ahmed",
    education: "B.Tech CSE",
    url: Ijlal,
    linkedInUrl: "https://www.linkedin.com/in/ijlal-ahmad-14aa35202/",
    githubUrl: "https://github.com/Thre4dripper",
    facebookUrl: "https://www.facebook.com/",
  },
  {
    id: 5,
    name: "Vicky Gupta",
    education: "B.Tech CSE",
    url: Vicky,
    linkedInUrl: "https://www.linkedin.com/in/vicky-gupta-61a418175/",
    githubUrl: "https://github.com/Vicky-Guptaa",
    facebookUrl: "https://www.facebook.com/",
  },
];

const AboutUs = () => {
  const isDarkMode = useSelector((state) => state.ui.isDarkMode);
  const allMembers = members.map((member) => {
    return (
      <div
        className=" bg-[color:var(--main-color)] mx-6 mb-12 shadow-[0px_0px_10px_rgba(0,0,0,0.4)] rounded-xl overflow-hidden hover:-translate-y-4 duration-700"
        key={member.id}
      >
        <div className=" border-8 border-[color:var(--color-primary)] bg-[color:var(--color-primary)] rounded-br-[90px] overflow-hidden">
          <img
            src={member.url}
            className="w-56 h-64 object-cover object-top hover:scale-125 duration-[6s] ease-linear"
            alt=""
          />
        </div>
        <div className="text-center p-4">
          <h3 className="text-left text-[color:var(--tertiary-text-color)] font-bold tracking-wider">
            {member.name.toUpperCase()}
          </h3>
          <h4 className="text-left mt-1 text-[color:var(--color-primary)] text-md font-bold">
            {member.education}
          </h4>
          <div className="flex mt-4 gap-4 text-lg text-[color:var(--tertiary-text-color)]">
            <a href={member.facebookUrl} target="_blank" rel="noreferrer">
              <BsFacebook className="hover:text-[color:var(--color-primary)] hover:scale-110 duration-300  ease-in-out" />
            </a>
            <a href={member.linkedInUrl} target="_blank" rel="noreferrer">
              <BsLinkedin className="hover:text-[color:var(--color-primary)] hover:scale-110 duration-300  ease-in-out" />
            </a>
            <a href={member.githubUrl} target="_blank" rel="noreferrer">
              <BsGithub className="hover:text-[color:var(--color-primary)] hover:scale-110 duration-300  ease-in-out" />
            </a>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="mt-28 mx-auto">
      <div className="header flex flex-col items-center justify-center">
        <h1 className="text-[color:var(--color-primary)] text-4xl font-semibold mb-2 text-center">
          About Us
        </h1>
        <div className="h-[0.30rem] w-12 bg-[color:var(--color-primary)] rounded-full"></div>
      </div>
      <p
        className={twMerge(
          "tracking-wider mt-6 text-center text-[0.95rem] ",
          isDarkMode ? "text-gray-300" : "text-gray-400"
        )}
      >
        Team ENKRYPT is an organisation with the belief in making better out of
        today. We are here to analyse the existing problems of the conventional
        and graphical passwords. To Build something beautiful with a unique
        design, creative modelling and our top most priorty data safety.
      </p>

      <div className="mt-12 flex items-center justify-evenly flex-wrap">
        <div className="rounded-xl overflow-hidden w-80 mx-4 mb-8 shadow-[0px_0px_10px_rgba(0,0,0,0.4)] hover:scale-110 duration-700 ease-in-out">
          <div className="bg-[color:var(--color-primary)] px-4 py-3 text-white text-lg flex items-center gap-2">
            <FiTarget className="text-2xl" />
            <h3 className="">Mission</h3>
          </div>
          <div className="bg-[color:var(--main-color)] p-4">
            <p
              className={twMerge(
                "tracking-wider text-[color:var(--tertiary-text-color)] text-sm ",
                isDarkMode ? "text-gray-300" : "text-gray-400"
              )}
            >
              To provide a simple, feasible and flexible graphical
              authentication infrastructure. Overcome the challenges faced by
              the existing techniques by building on the fundamental process and
              designing a unique way to ENKRYPT your choices.
            </p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden w-80 mx-4 mb-8 shadow-[0px_0px_10px_rgba(0,0,0,0.4)] hover:scale-110 duration-700 ease-in-out">
          <div className="bg-[color:var(--color-primary)] px-4 py-3 text-white text-lg flex items-center gap-2">
            <FaServicestack className="text-2xl" />
            <h3 className="">Service</h3>
          </div>
          <div className="bg-[color:var(--main-color)] p-4">
            <p
              className={twMerge(
                "tracking-wider text-[color:var(--tertiary-text-color)] text-sm ",
                isDarkMode ? "text-gray-300" : "text-gray-400"
              )}
            >
              We here at ENKRYPT facilitates our user with User friendly
              experience which makes them forget their conventional passwords
              much easily. Our service includes high security, unique
              functionalty and high end user experience with keeping the safety
              always the top priorty.
            </p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden w-80 mx-4 mb-8 shadow-[0px_0px_10px_rgba(0,0,0,0.4)] hover:scale-110 duration-700 ease-in-out">
          <div className="bg-[color:var(--color-primary)] px-4 py-3 text-white text-lg flex items-center gap-2">
            <RiMessage3Fill className="text-2xl" />
            <h3 className="">Message</h3>
          </div>
          <div className="bg-[color:var(--main-color)] p-4">
            <p
              className={twMerge(
                "tracking-wider  text-[color:var(--tertiary-text-color)] text-sm ",
                isDarkMode ? "text-gray-300" : "text-gray-400"
              )}
            >
              We at ENKRYPT knows the importance of privacy and it is the need
              of the hour in this high tech world. We hereby designed a process
              which can compete with all of these challenges so our users can
              relax while their choices are in safest hands.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 header flex flex-col items-center justify-center">
        <h1 className=" text-[color:var(--color-primary)] text-4xl font-semibold mb-2 text-center">
          Our Team
        </h1>
        <div className="h-[0.30rem] w-12 bg-[color:var(--color-primary)] rounded-full"></div>
      </div>
      <div className="flex justify-evenly items-center flex-wrap mt-12">
        {allMembers}
      </div>
    </div>
  );
};

export default AboutUs;
