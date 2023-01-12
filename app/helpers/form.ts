import type { FormErrors, UseFormReturnType } from "@mantine/form";
import type {
  GetFieldStatus,
  GetInputPropsType,
  LooseKeys,
} from "@mantine/form/lib/types";

import type { InputFieldError } from "~/queries";

export const formErrors = (errors: InputFieldError[]): FormErrors => {
  return Object.fromEntries(
    errors.map(({ field, message }) => [field, message]),
  );
};

export const useNestedForm = <Values>(
  form: UseFormReturnType<any>,
  path: LooseKeys<Values>,
) => {
  const getInputProps = useCallback(
    <Field extends LooseKeys<Values>>(
      nestedPath: Field,
      options?: {
        type?: GetInputPropsType;
        withError?: boolean;
        withFocus?: boolean;
      },
    ): any =>
      form.getInputProps(`${String(path)}.${String(nestedPath)}`, options),
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
  const insertListItem = useCallback(
    <Field extends LooseKeys<Values>>(
      nestedPath: Field,
      item: unknown,
      index?: number,
    ) =>
      form.insertListItem(`${String(path)}.${String(nestedPath)}`, item, index),
    [form, path],
  );
  const removeListItem = useCallback(
    <Field extends LooseKeys<Values>>(nestedPath: Field, index: number) =>
      form.removeListItem(`${String(path)}.${String(nestedPath)}`, index),
    [form, path],
  );
  return {
    getInputProps,
    setFieldValue,
    isTouched,
    isDirty,
    values,
    insertListItem,
    removeListItem,
  };
};
