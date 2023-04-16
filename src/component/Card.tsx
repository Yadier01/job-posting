import React, { useState, useCallback } from "react";
import jsonData from "../data.json";
import JobCard from "./JobCard";

interface JobData {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: string;
  level: string;
  postedAt: string;
  contract: string;
  location: string;
  languages: Array<string>;
  tools?: Array<string>;
}

function Card() {
  const [userClicks, setUserClicks] = useState<string[]>([]);

  const handleResetClick = useCallback(() => {
    setUserClicks([]);
  }, []);

  const languagesHandler = useCallback(
    ({ currentTarget: { textContent } }: React.MouseEvent<HTMLElement>) => {
      setUserClicks((clicks: string[]) => [...clicks, textContent ?? ""]);
    },
    []
  );

  // Remove a click from the list of user clicks
  const removeUserClick = useCallback((clickToRemove: string) => {
    setUserClicks((clicks) =>
      clicks.filter((click) => click !== clickToRemove)
    );
  }, []);

  //render Jobs
  function renderJobs() {
    const jobs = jsonData as JobData[];
    const filteredJobs =
      userClicks.length > 0
        ? jobs.filter((job) =>
            userClicks.every(
              (click) =>
                job.languages.includes(click) ||
                (job.tools && job.tools.includes(click)) ||
                job.role.includes(click) ||
                job.level.includes(click)
            )
          )
        : jobs;

    return filteredJobs.map((job) => (
      <JobCard key={job.id} job={job} onClick={languagesHandler} />
    ));
  }

  return (
    <>
      <img
        src="../public/bg-header-desktop.svg"
        alt=""
        className="w-full bg-darkCyan"
      />
      {/* Show all selected language/tool/role/level and reset button */}
      {userClicks.length > 0 && (
        <div className="bg-black flex justify-between items-center">
          <div>
            {userClicks.map((click) => (
              <span
                key={click}
                className=" text-lg py-2 px-4 mr-4 inline-flex items-center border rounded-full font-semibold"
              >
                {click}
                <button
                  type="button"
                  onClick={() => removeUserClick(click)}
                  className="ml-2 h-6 w-6 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </span>
            ))}
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-black rounded px-4 py-2 mr-4"
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
      )}
      <div className="bg-zinc-300 bg-bgC py-16">
        <div className="max-w-screen-xl mx-auto px-4 space-y-8">
          {renderJobs()}
        </div>
      </div>
    </>
  );
}

export default Card;
