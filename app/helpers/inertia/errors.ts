import type { Errors } from "@inertiajs/inertia";

export const unbagErrors = (
  errors: Errors,
  errorBag: string,
): Errors | undefined => {
  const baggedErrors = errors[errorBag];
  if (typeof baggedErrors === "object") {
    return baggedErrors as Errors;
  }
};
