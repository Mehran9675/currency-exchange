import { ChangeEvent, useCallback, useState } from "react";

type Event =
  | ChangeEvent<HTMLInputElement>
  | ChangeEvent<HTMLTextAreaElement>
  | string
  | number;

const useControl = <T = Record<any, any>>(
  defaultValue: T
): {
  state: T;
  updateState: (key: keyof T) => (event: Event) => void;
} => {
  const [state, setState] = <any>useState(defaultValue);

  const updateState = useCallback(
    (key: keyof T) => {
      return (event: Event) => {
        const newState = { ...state };
        if (typeof event !== "string" && typeof event !== "number")
          newState[key] = event?.target?.value;
        else newState[key] = String(event);
        setState(newState);
      };
    },
    [state, defaultValue]
  );

  return { state, updateState };
};
export default useControl;
