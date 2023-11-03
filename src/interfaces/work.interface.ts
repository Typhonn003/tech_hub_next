export interface NewWorkData {
  title: string;
  description: string;
  deploy_url: string;
}

export interface EditWorkData {
  title: string;
  description: string;
}

export interface WorkData {
  id: string;
  title: string;
  description: string;
  deploy_url: string;
  created_at: string;
  updated_at: string;
}
