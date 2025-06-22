import { Request } from "express";
import { User } from "../model/entities/user";

export interface IPayload {
    usuario: User;
}

export interface RequestWithPayload extends Request {
    payload: IPayload;
  }