import { cloneDeep } from 'lodash' ;

export const trimObjectStrings = (input) => {
  const trimmedInput = cloneDeep(input);
  if (typeof input !== "object") {
    throw new Error("Input has to be an object");
  }

  Object.keys(trimmedInput).forEach((key) => {
    if (typeof trimmedInput[key] !== "string") {
      return;
    }

    trimmedInput[key] = input[key].trim();
  });

  return trimmedInput;
};
