import { useHashParamJson } from '@metapages/hash-query';

export type DisplayMode = "default" | "slide";

export type Options = {
  dm?: DisplayMode | undefined;
};

const HashKeyOptions = "options";

export const useOptions = (defaultOptions?:Options|undefined): [Options, (o: Options) => void] => {
  const [options, setOptions] = useHashParamJson<Options>(HashKeyOptions, defaultOptions);
  return [options, setOptions];
};
