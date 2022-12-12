import type { FormErrors, UseFormReturnType } from "@mantine/form";
import type { GetFieldStatus, LooseKeys } from "@mantine/form/lib/types";

import type { InputFieldError } from "~/queries";

export const formErrors = (errors: InputFieldError[]): FormErrors => {
  return Object.fromEntries(
    errors.map(({ field, message }) => [field, message]),
  );
};

export const useNestedForm = <Values>(
  form: UseFormReturnType<any>,
  path: LooseKeys<Values>,
): UseFormReturnType<Values> => {
  const getInputProps = useCallback(
    <Field extends LooseKeys<Values>>(nestedPath: Field): any =>
      form.getInputProps(`${String(path)}.${String(nestedPath)}`),
    [form, path],
  );
  const setFieldValue = useCallback(
    <Field extends LooseKeys<Values>>(
      nestedPath: Field,
      value: Field extends keyof Values ? Values[Field] : unknown,
    ): any =>
      form.setFieldValue(`${String(path)}.${String(nestedPath)}`, value),
    [form, path],
  );
  const isTouched = useCallback<GetFieldStatus<Values>>(
    nestedPath => form.isTouched(`${String(path)}.${String(nestedPath)}`),
    [form, path],
  );
  const isDirty = useCallback<GetFieldStatus<Values>>(
    nestedPath => form.isDirty(`${String(path)}.${String(nestedPath)}`),
    [form, path],
  );
  const values = useMemo<Values>(() => get(form.values, path), [form]);
  return {
    ...form,
    getInputProps,
    setFieldValue,
    isTouched,
    isDirty,
    values,
  };
};
