import { ApplicationError } from "@/protocols";

export function invalidDataError(
  details: string[]
): ApplicationInvalidateDataError {
  return {
    error: "InvalidDataError",
    message: "Invalid data",
    details,
  };
}

type ApplicationInvalidateDataError = ApplicationError & {
  details: string[];
};
