import { Request } from "express";
import { Session } from "express-session";
import { Response } from "express";

interface uploadFile {
  photoSumnail: string;
  photos: string;
}

export interface fileUploadReq extends Request {
  user?: {
    userEmail: string;
    loginType: string;
    identifier: string;
  };
  files?: uploadFile[];
}

export interface fileUploadRes extends Response {}
