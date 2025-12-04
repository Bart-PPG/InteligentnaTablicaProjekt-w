export interface Project {
  id: string;          
  name: string;
  description: string;
  ownerId: string;
  status: string;
  createdAt?: number | Date;
}
