declare namespace Express {
  export interface Request {
    payloadData?:  Record<string, unknown>;
  }
}