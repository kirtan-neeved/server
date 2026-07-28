import type { Request, Response } from "express";

// Pre-Defining what all fields will params will have
type UserParams = {
  id: string;
};

// Request<
//     Params,
//     ResBody,
//     ReqBody,
//     ReqQuery,
//     Locals
// >
const temp = async (
  req: Request<UserParams, {}, {}, {}, {}>, 
  res: Response,
) => {
  //   const { age } = req.params; => Error: age does not exists in type UserParams

  const { id } = req.params;

  res.send(`Id received : ${id}`);
};

export { temp };
