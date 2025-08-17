import React, { useEffect, useState } from 'react';
import Cards, { Job } from '../Components/Cards';
import { Client } from '../main';
import { GetJobs } from '../GraphQL/Queries';
import NavBar from '../Components/NavBar';
import SidePannel from '../Components/SidePannel';
import { useLazyQuery } from '@apollo/client';

const AllJobs = () => {
  const [PassPannelData, setPassDataToPannel] = useState<Job | undefined>(undefined);
  const [JobData, setJobData] = useState<Job[]>([]);

  const [getJobs, { data, loading, error }] = useLazyQuery(GetJobs);

  useEffect(() => {
    // Try reading from cache first
    const cachedData = Client.readQuery({ query: GetJobs });

    if (cachedData?.GetAllJobs?.length > 0) {
      setJobData(cachedData.GetAllJobs);
    } else {
      // If no cache, fetch from server
      getJobs();
    }
  }, [getJobs]);

  // Update JobData when new data arrives
  useEffect(() => {
    if (data?.GetAllJobs) {
      setJobData(data.GetAllJobs);
    }
  }, [data]);

  return (
    <div>
      <div className=" text-black fixed top-5 left-52 w-[70%] border border-black rounded-full shadow-black shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)]">
        <NavBar Color={"black"}/>
      </div>

      <div className="p-3 mt-24">
        <Cards Jobs={JobData} setPassDataToPannel={setPassDataToPannel} />
      </div>

      <div>
        <SidePannel PassPannelData={PassPannelData} />
      </div>
    </div>
  );
};

export default AllJobs;
