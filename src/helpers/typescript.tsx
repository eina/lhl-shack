import React from "react";

// context: https://github.com/typescript-cheatsheets/react-typescript-cheatsheet#context
export function createCtx<A>(defaultValue: A) {
  type UpdateType = React.Dispatch<React.SetStateAction<typeof defaultValue>>;
  const defaultUpdate: UpdateType = () => defaultValue;
  const ctx = React.createContext({
    state: defaultValue,
    updateState: defaultUpdate
  });
  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, updateState] = React.useState(defaultValue);
    return <ctx.Provider value={{ state, updateState }} {...props} />;
  }
  return [ctx, Provider] as const; // alternatively, [typeof ctx, typeof Provider]
}
