import { instanceAxios } from '@/lib/axiosConfig'
import { Job } from '@prisma/client'
import { AxiosResponse } from 'axios'

export const getTotalRowCount = async (args: string): Promise<number> => {
  const response: AxiosResponse<number> = await instanceAxios.get<number>(args);
  const count: number = response.data;
  return count;
}

type GetJobsType = (args: string) => Promise<Job[]>;
export const getJobs: GetJobsType = async (args) => {
  const response: AxiosResponse<Job[]> = await instanceAxios.get<Job[]>(args);
  const jobs: Job[] = response.data;
  return jobs;
}
