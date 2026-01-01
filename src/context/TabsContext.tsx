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

const tabsReducer = (state: TabsState, action: TabAction): TabsState => {
  switch (action.type) {
    case "change": {
      return {
        activeTab: action.newTab,
        // todo - need to calculate this
        isPrevDisabled: false,
        isNextDisabled: false,
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
