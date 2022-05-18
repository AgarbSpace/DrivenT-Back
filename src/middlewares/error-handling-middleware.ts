import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { ApplicationError } from "@/protocols";

/* eslint-disable-next-line */
export function handleApplicationErrors(
  err: ApplicationError & Record<string, unknown>,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err.error === "UnauthorizedError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.error === "CannotEnrollBeforeStartDateError") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message,
    });
  }

  if (err.error === "InvalidDataError") {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
      details: err?.details,
    });
  }

  if (err.error === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.error === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send({
      message: err.message,
    });
  }

  if (err.error === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }

  /* eslint-disable-next-line no-console */
  console.error(err);
  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: "Internal Server Error",
  });
}
