import { Request, Response } from "express";

export let allUsers = (req: Request, res: Response) => {
  res.send("Returns all Books");
};

export let getUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let deleteUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let updateUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};

export let addUser = (req: Request, res: Response) => {
  res.send("Returns one book");
};