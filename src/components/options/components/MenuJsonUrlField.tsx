import {
  useCallback,
  useState,
} from 'react';

import {
  HashKeyMarkdown,
  HashKeyMarkdownLegacy,
  HashKeyUrl,
} from '/@/store';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { CheckIcon } from '@chakra-ui/icons';
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import {
  setHashParamInWindow} from '@metapages/hash-query';
import {
  useHashParam
} from '@metapages/hash-query/react-hooks';

/**
 * Set an external URL for the superslides config json
 */

const validationSchema = yup.object({
  url: yup.string(),
});
interface FormType extends yup.InferType<typeof validationSchema> {}

export const MenuJsonUrlField: React.FC = () => {
  const [url, setUrl] = useHashParam(
    HashKeyUrl
  );
  const [isTyping, setIsTyping] = useState<boolean>(true);

  const onSubmit = useCallback(
    (values: FormType) => {
      setIsTyping(false);
      setUrl(values.url);
      if (values.url) {
        // Remove conflicting hash params
        setHashParamInWindow(HashKeyMarkdownLegacy, undefined);
        setHashParamInWindow(HashKeyMarkdown, undefined);
      }
    },
    [setUrl]
  );

  const formik = useFormik({
    initialValues: {
      url: url,
    },
    onSubmit,
    validationSchema,
  });
  const handleChangeInteral = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      formik.handleChange(e);
      setIsTyping(true);
    },
    [formik.handleChange, setIsTyping]
  );

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl>
        <FormLabel fontWeight="bold">Markdown source URL </FormLabel>

        <InputGroup>
          <Input
            bg="gray.100"
            id="url"
            name="url"
            type="string"
            onChange={handleChangeInteral}
            value={formik.values.url}
          ></Input>
          {isTyping ? null : (
            <InputRightElement>
              <CheckIcon color="green.500" />
            </InputRightElement>
          )}
        </InputGroup>

        {/* <Button type="submit">Submit</Button> */}
      </FormControl>
    </form>
  );
};
