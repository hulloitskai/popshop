import type { ComponentPropsWithoutRef, FC } from "react";
import { NumericFormat } from "react-number-format";

import { InputBase, SelectItem, Text } from "@mantine/core";
import type { SelectProps } from "@mantine/core";

import AddIcon from "~icons/heroicons/plus-20-solid";
import DeleteIcon from "~icons/heroicons/trash-20-solid";

import {
  TaxRateCreateMutationDocument,
  TaxRateDeleteMutationDocument,
  TaxRateFieldQueryDocument,
} from "~/queries";
import type { TaxRateFieldTaxRateFragment } from "~/queries";

export type TaxRateFieldProps = Omit<
  SelectProps,
  | "data"
  | "itemComponent"
  | "searchable"
  | "creatable"
  | "placeholder"
  | "getCreateLabel"
  | "onCreate"
>;

const TaxRateField: FC<TaxRateFieldProps> = ({ ...otherProps }) => {
  const [createdTaxRateId, setCreatedTaxRateId] = useState<string | null>(null);
  const { value, onChange } = otherProps;

  // == Query
  const { data, loading } = useQuery(TaxRateFieldQueryDocument, {
    variables: {},
  });
  const { taxRates } = data?.viewer?.primaryAccount ?? {};
  useEffect(() => {
    const taxRateIds = (taxRates || []).map(r => r.id);
    if (createdTaxRateId) {
      taxRateIds.push(createdTaxRateId);
    }
    if (onChange && value && !taxRateIds.includes(value)) {
      onChange(null);
    }
    if (createdTaxRateId) {
      setCreatedTaxRateId(null);
    }
  }, [taxRates]);

  // == Select
  const selectData = useMemo<SelectItem[]>(() => {
    return (taxRates || []).map(attributes => {
      const { id, name, percentage } = attributes;
      return {
        value: id,
        label: `${name} (${percentage}%)`,
        ...attributes,
      };
    });
  }, [taxRates]);

  // == Markup
  return (
    <Select
      itemComponent={TaxRateSelectItem}
      data={selectData}
      placeholder={loading ? "Loading..." : "i.e. HST"}
      disabled={loading}
      searchable
      creatable
      getCreateLabel={query => (
        <Group align="center" spacing={4}>
          <AddIcon />
          <Text span>Add a tax rate named &apos;{query}&apos;</Text>
        </Group>
      )}
      onCreate={name => {
        openModal({
          title: <Title order={3}>Create Tax Rate</Title>,
          children: (
            <TaxRateForm
              {...{ name }}
              onCreate={taxRateId => {
                if (onChange) {
                  setCreatedTaxRateId(taxRateId);
                  onChange(taxRateId);
                }
              }}
            />
          ),
        });
        return undefined;
      }}
      {...otherProps}
    />
  );
};

export default TaxRateField;

type TaxRateSelectItemProps = ComponentPropsWithoutRef<"div"> &
  Omit<TaxRateFieldTaxRateFragment, "__typename">;

const TaxRateSelectItem = forwardRef<HTMLDivElement, TaxRateSelectItemProps>(
  (
    {
      id: taxRateId,
      name,
      percentage,
      onMouseOver,
      onMouseDown,
      ...otherProps
    },
    ref,
  ) => {
    const onError = useApolloErrorCallback("Failed to delete tax rate");
    const [runMutation, { loading }] = useMutation(
      TaxRateDeleteMutationDocument,
      {
        onCompleted: () => {
          showNotice({
            message: `Tax rate '${name}' deleted successfully.`,
          });
        },
        onError,
      },
    );
    return (
      <Group {...{ ref }} {...otherProps}>
        <Box sx={{ flex: 1 }} {...{ onMouseOver, onMouseDown }}>
          <Text>
            {name}{" "}
            <Text span color="gray.6">
              ({percentage}%)
            </Text>
          </Text>
        </Box>
        <ActionIcon
          size="sm"
          color="red"
          onClick={() => {
            runMutation({
              variables: {
                input: {
                  taxRateId: taxRateId,
                },
              },
            });
          }}
          {...{ loading }}
        >
          <DeleteIcon />
        </ActionIcon>
      </Group>
    );
  },
);

type TaxRateFormProps = {
  readonly name: string;
  readonly onCreate: (taxRateId: string) => void;
};

type TaxRateFormValues = {
  readonly name: string;
  readonly percentage: number;
};

const TaxRateForm: FC<TaxRateFormProps> = ({ name, onCreate }) => {
  // == Form
  const { getInputProps, onSubmit, setErrors } = useForm<TaxRateFormValues>({
    initialValues: {
      name,
      percentage: 0.0,
    },
  });

  // == Mutation
  const onError = useApolloErrorCallback("Failed to create tax rate");
  const [runMutation, { loading }] = useMutation(
    TaxRateCreateMutationDocument,
    {
      onCompleted: ({ payload: { taxRate, errors } }) => {
        if (taxRate) {
          const { id } = taxRate;
          onCreate(id);
          closeAllModals();
        } else {
          invariant(errors, "Missing errors");
          setErrors(formErrors(errors));
          showAlert({ message: "Failed to create order" });
        }
      },
      onError,
    },
  );

  // == Markup
  return (
    <form
      onSubmit={onSubmit(values => {
        runMutation({
          variables: {
            input: {
              ...values,
            },
          },
        });
      })}
    >
      <Stack>
        <Stack spacing={8}>
          <TextInput label="Name" required {...getInputProps("name")} />
          {resolve(() => {
            const { onChange, ...inputProps } = getInputProps("percentage");
            return (
              <NumericFormat
                customInput={InputBase}
                decimalScale={1}
                suffix="%"
                label="Percentage"
                required
                onValueChange={({ floatValue }) => onChange(floatValue)}
                {...inputProps}
              />
            );
          })}
        </Stack>
        <Button type="submit" {...{ loading }}>
          Create
        </Button>
      </Stack>
    </form>
  );
};
