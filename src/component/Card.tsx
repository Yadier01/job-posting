import React, { useState } from 'react';
import jsonData from '../data.json';

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
  tools?: Array<string>; // Use optional property instead of union with undefined
}

function Card() {
  const [jobs] = useState<JobData[]>(jsonData);

  const lenguagesHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.textContent);
  };
  function renderJobs() {
    return jobs.map((job) => (
      <div
        key={job.id}
        className={`flex flex-col  bg-white p-4 hover:scale-105 transition-all rounded-lg shadow-xl  ${
          job.featured ? 'border-darkCyan border-l-4  ' : 'border-gray-200'
        } `}
      >
        <img src={job.logo} alt='{job.company}' className='w-16 origin-top' />
        <div className=''>
          <div className='flex gap-4 '>
            <h1 className='inline text-darkCyan font-bold'>{job.company}</h1>
            <span className='bg-darkCyan text-white rounded-full px-3 py-0.5 font-bold uppercase '>
              {job.new ? <span>New!</span> : null}
            </span>
            <span className='bg-veryDark text-white rounded-full px-3 py-0.5 font-bold uppercase'>
              {job.featured ? <span>Featured</span> : null}
            </span>
          </div>
          {job.position}
          <div className='flex gap-4'>
            <span>{job.postedAt}</span>
            <span>{job.contract}</span>
            <span>{job.location}</span>
          </div>
        </div>

        <div className='cursor-pointer flex flex-wrap direction-row gap-4 items-center'>
          <span
            onClick={lenguagesHandler}
            className='cursor-pointer bg-gray-200 py-1 px-3  rounded'
          >
            {job.role}
          </span>
          <span
            onClick={lenguagesHandler}
            className='cursor-pointer bg-gray-200 py-1 px-3 rounded'
          >
            {job.level}
          </span>

          {job.languages.map((language) => (
            <li
              key={language}
              onClick={lenguagesHandler}
              className='bg-gray-200 p-1 rounded py-1 px-3 '
            >
              {language}
            </li>
          ))}

          {job.tools &&
            job.tools.map((tool) => (
              <span
                key={tool}
                onClick={lenguagesHandler}
                className='bg-gray-200 p-1 rounded py-1 px-3 '
              >
                {tool}
              </span>
            ))}
        </div>
      </div>
    ));
  }
  return (
    <>
      <img
        src='../images/bg-header-desktop.svg'
        alt=''
        className='w-full bg-darkCyan'
      />
      <div className=' bg-zinc-300  bg-bgC py-4 '>
        <div className=' bg-zinc-300 max-w-screen-xl mx-auto px-4 space-y-8'>
          {renderJobs()}
        </div>
      </div>
    </>
  );
}

export default Card;
