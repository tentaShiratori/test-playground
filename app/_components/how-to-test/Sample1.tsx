import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

export const Context = createContext<[number, (v: number) => void]>([
  0,
  (v) => {
    throw new Error("not implemented");
  },
]);
export const Provider: FC<PropsWithChildren> = ({ children }) => {
  const [counter, setCounter] = useState(0);
  return (
    <Context.Provider value={[counter, setCounter]}>
      {children}
    </Context.Provider>
  );
};

export const Counter: FC<PropsWithChildren> = ({ children }) => {
  const [counter, setCounter] = useContext(Context);
  return (
    <button onClick={() => setCounter(counter + 1)} type="button">
      {children}
    </button>
  );
};
