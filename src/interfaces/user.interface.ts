import { FullTechData } from "./tech.interface";
import { WorkData } from "./work.interface";

export interface UserData {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  techs: FullTechData[];
  works: WorkData[];
  created_at: string;
  updated_at: string;
  avataR_url: string;
}
