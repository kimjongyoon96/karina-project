import { Request } from "express";
import { Session } from "express-session";
import { Response } from "express";
//* api/postView , postView.ts에 해당
export interface postViewReq extends Request {
  query: {
    postuuid?: string;
  };
  session?: Session & {
    userId: string;
  };
}

export interface PostViewRes extends Response {}
