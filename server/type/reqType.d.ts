import { Request as ExpressRequest } from 'express';

export interface CustomRequest extends ExpressRequest {
  user?: { 
    userName: string;
    userEmail: string;
  };
}
