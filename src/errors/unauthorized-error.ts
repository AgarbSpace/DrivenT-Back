import { ApplicationError } from "@/protocols";

export function unauthorizedError(): ApplicationError {
  return {
    error: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}
