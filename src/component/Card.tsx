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
  const [userClick, setUserClick] = useState<string | null>(null);

  const lenguagesHandler = useCallback(
    ({ currentTarget: { textContent } }: React.MouseEvent<HTMLElement>) => {
      setUserClick(textContent);
    },
    []
  );

  //render Jobs
  function renderJobs() {
    const jobs = jsonData as JobData[];
    const filteredJobs = userClick
      ? jobs.filter(
          (job) =>
            job.languages.includes(userClick) ||
            (job.tools && job.tools.includes(userClick)) ||
            job.role.includes(userClick) ||
            job.level.includes(userClick)
        )
      : jobs;

    return filteredJobs.map((job) => (
      <JobCard key={job.id} job={job} onClick={lenguagesHandler} />
    ));
  }

  return (
    <>
      <img
        src="../public/bg-header-desktop.svg"
        alt=""
        className="w-full bg-darkCyan"
      />
      <div className="bg-zinc-300 bg-bgC py-16">
        <div className="max-w-screen-xl mx-auto px-4 space-y-8">
          {renderJobs()}
        </div>
      </div>
    </>
  );
}

export default Card;
