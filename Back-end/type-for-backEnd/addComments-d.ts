import { Request } from "express";
import { Session } from "express-session";
import { Response } from "express";

export interface addcommentsReq extends Request {
  user?: {
    identifier: string;
    userEmail: string;
    loginType: string;
  };
}

export interface addCommentsRes extends Response {}
