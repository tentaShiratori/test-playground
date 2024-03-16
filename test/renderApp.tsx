import { RenderOptions, render as baseRender } from "@testing-library/react";
import { Provider as JotaiProvider, WritableAtom, createStore } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { FC, PropsWithChildren, ReactNode } from "react";

// biome-ignore lint/suspicious/noExplicitAny:
type InitialValues = [WritableAtom<unknown, any[], any>, unknown][];
const HydrateAtoms: FC<PropsWithChildren<{ initialValues: InitialValues }>> = ({
  initialValues,
  children,
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

export function renderApp(
  ui: ReactNode,
  options: RenderOptions & { initialValues?: InitialValues } = {},
) {
  const store = createStore();
  const Wrapper =
    options.wrapper ?? (({ children }: PropsWithChildren) => <>{children}</>);
  const result = baseRender(ui, {
    ...options,
    wrapper: ({ children }) => (
      <JotaiProvider store={store}>
        <HydrateAtoms initialValues={options.initialValues ?? []}>
          <Wrapper>{children}</Wrapper>
        </HydrateAtoms>
      </JotaiProvider>
    ),
  });
  return { ...result, store };
}
