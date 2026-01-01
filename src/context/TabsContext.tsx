import {
  createContext,
  useContext,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";

interface TabsProviderProps {
  children: ReactNode;
}

type TabType = "propertyInfo" | "analysis";

interface TabsState {
  activeTab: TabType;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

type ChangeAction = {
  type: "change";
  newTab: TabType;
};

type TabAction = ChangeAction;

const initialTabsState: TabsState = {
  activeTab: "propertyInfo",
  isPrevDisabled: true,
  isNextDisabled: true,
};

const TabsContext = createContext<TabsState>(initialTabsState);
const TabsDispatchContext = createContext<ActionDispatch<[action: TabAction]>>(
  () => {}
);

// keep track of next tab info for pagination
const forwardTabs: Record<TabType, TabType | null> = {
  propertyInfo: "analysis",
  analysis: null,
};

// keep track of previous tab info for pagination
const backwardTabs: Record<TabType, TabType | null> = {
  propertyInfo: null,
  analysis: "propertyInfo",
};

const tabsReducer = (state: TabsState, action: TabAction): TabsState => {
  switch (action.type) {
    case "change": {
      const isPrevDisabled = backwardTabs[action.newTab] === null;
      const isNextDisabled = forwardTabs[action.newTab] == null;
      console.log({
        newTab: action.newTab,
        isPrevDisabled,
        isNextDisabled,
      });
      return {
        activeTab: action.newTab,
        isPrevDisabled,
        isNextDisabled,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};

export const TabsProvider = ({ children }: TabsProviderProps) => {
  const [state, dispatch] = useReducer(tabsReducer, initialTabsState);

  return (
    <TabsContext value={state}>
      <TabsDispatchContext value={dispatch}>{children}</TabsDispatchContext>
    </TabsContext>
  );
};

export const useTabs = () => {
  return useContext(TabsContext);
};

export const useTabsDispatch = () => {
  return useContext(TabsDispatchContext);
};
