import {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
} from "react";

import useRouterURL from "@/hooks/useRouterURL";

interface ContextProps {
  transitioning: boolean;
  startTransitioning: () => void;
  loading: boolean;
  finishLoading: () => void;
}

interface ProviderProps {
  children?: ReactNode;
}

const ApplicationStateContext = createContext<ContextProps>({} as ContextProps);

const TRANSITION_DURATION = 1000; // ms

const ApplicationStateProvider = ({ children }: ProviderProps) => {
  const url = useRouterURL();
  const [loading, setLoading] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const finishLoading = () => setLoading(false);
  const startTransitioning = () => setTransitioning(true);

  // watch URL for changes, and begin timer for finishing load
  useEffect(() => {
    const loadedTimeout = setTimeout(() => {
      if (transitioning) setTransitioning(false);
    }, TRANSITION_DURATION);

    return () => {
      clearTimeout(loadedTimeout);
    };
  }, [url, transitioning]);

  const contextProps: ContextProps = useMemo(
    () => ({
      transitioning,
      startTransitioning,
      loading,
      finishLoading,
    }),
    [loading, transitioning]
  );

  return (
    <ApplicationStateContext.Provider value={contextProps}>
      {children}
    </ApplicationStateContext.Provider>
  );
};

/** Provides details about the overall website state
 * @returns transitioning: boolean */
const useApplicationState = () => useContext(ApplicationStateContext);

export { ApplicationStateProvider, useApplicationState };
