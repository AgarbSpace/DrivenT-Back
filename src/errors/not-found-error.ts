import { ApplicationError } from "@/protocols";

export function notFoundError(): ApplicationError {
  return {
    error: "NotFoundError",
    message: "No result for this search!",
  };
}
