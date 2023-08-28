import { useCallback } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';

import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  VStack,
} from '@chakra-ui/react';

import { MenuJsonUrlField } from './components/MenuJsonUrlField';
import { RadioButtonMode } from './components/RadioButtonMode';
import {
  DisplayMode,
  Options,
  useOptions,
} from './useOptions';

const OptionDescription: Record<string, string> = {
  displaymode: "Display mode",
};

const validationSchema = yup.object({
  displaymode: yup
    .string()
    .oneOf(["default", "slide"] as DisplayMode[])
    .optional(),
});
interface FormType extends yup.InferType<typeof validationSchema> {}

export const PanelOptions: React.FC = () => {
  const [options, setOptions] = useOptions();

  const onSubmit = useCallback(
    (values: FormType) => {
      const newOptions = (values || {}) as Options;
      if (newOptions.displaymode === "default") {
        delete newOptions.displaymode;
      }
      setOptions(newOptions);
    },
    [setOptions]
  );

  const formik = useFormik({
    initialValues: options || {},
    onSubmit,
    validationSchema,
  });

  return (
    <VStack
      maxW="700px"
      gap="1rem"
      justifyContent="flex-start"
      alignItems="stretch"
    >
      <MenuJsonUrlField />
      <RadioButtonMode />

      <form onSubmit={formik.handleSubmit}>
        <FormControl pb="1rem">
          <FormLabel fontWeight="bold">
            Persist changes to the menu configuration to:
          </FormLabel>
          <RadioGroup
            id="displaymode"
            onChange={(e) => {
              // currently RadioGroup needs this to work
              formik.setFieldValue("displaymode", e);
              formik.handleSubmit();
            }}
            value={formik?.values?.displaymode || "default"}
          >
            <Stack
              pl="30px"
              pr="30px"
              spacing={5}
              direction="column"
              borderWidth="1px"
              borderRadius="lg"
            >
              <Radio value="default" defaultChecked>
                Default display, show markdown as a scrollable page
              </Radio>
              <Radio value="slide">
                All markdown content fits on a single page
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        {Object.keys(validationSchema.fields as any)
          .filter(
            (fieldName) =>
              (validationSchema.fields as any)[fieldName].type === "boolean"
          )
          .map((fieldName) => (
            <FormControl pb="1rem" key={fieldName}>
              <FormLabel fontWeight="bold" htmlFor={fieldName}>
                {OptionDescription[fieldName]}
              </FormLabel>
              <Checkbox
                name={fieldName}
                size="lg"
                bg="gray.100"
                spacing="1rem"
                onChange={(e) => {
                  // currently checkbox needs this to work
                  formik.setFieldValue(fieldName, e.target.checked);
                  formik.handleSubmit();
                }}
                isChecked={(formik.values as any)[fieldName]}
              />
            </FormControl>
          ))}

        <Button type="submit" display="none">
          submit
        </Button>
      </form>
    </VStack>
  );
};
