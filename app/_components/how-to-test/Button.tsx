import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  onClick: () => void;
}
export const Button: FC<Props> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
};
