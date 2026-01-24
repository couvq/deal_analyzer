import {
  createContext,
  useContext,
  useReducer,
  type ActionDispatch,
  type ReactNode,
} from "react";

interface StepProviderProps {
  children: ReactNode;
}

export type StepType =
  | "propertyInfo"
  | "financing"
  | "income"
  | "expenses"
  | 'growthAssumptions'
  | "analysis";

interface StepState {
  activeStep: StepType;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

type ChangeAction = {
  type: "change";
  newStep: StepType;
};

type PreviousAction = {
  type: "previous";
};

type NextAction = {
  type: "next";
};

type StepAction = ChangeAction | PreviousAction | NextAction;

const initialStepState: StepState = {
  activeStep: "propertyInfo",
  isPrevDisabled: true,
  isNextDisabled: false,
};

const StepContext = createContext<StepState>(initialStepState);
const StepDispatchContext = createContext<ActionDispatch<[action: StepAction]>>(
  () => {}
);

// keep track of previous tab info for pagination
const backwardSteps: Record<StepType, StepType | null> = {
  propertyInfo: null,
  financing: 'propertyInfo',
  income: 'financing',
  expenses: 'income',
  growthAssumptions: 'expenses',
  analysis: 'growthAssumptions'
};

// keep track of next tab info for pagination
const forwardSteps: Record<StepType, StepType | null> = {
  propertyInfo: "financing",
  financing: "income",
  income: "expenses",
  expenses: "growthAssumptions",
  growthAssumptions: 'analysis',
  analysis: null,
};

const stepReducer = (state: StepState, action: StepAction): StepState => {
  switch (action.type) {
    case "change": {
      const isPrevDisabled = backwardSteps[action.newStep] === null;
      const isNextDisabled = forwardSteps[action.newStep] == null;
      return {
        activeStep: action.newStep,
        isPrevDisabled,
        isNextDisabled,
      };
    }
    case "previous": {
      const nextStep = backwardSteps[state.activeStep] ?? state.activeStep;
      const isPrevDisabled = backwardSteps[nextStep] === null;
      const isNextDisabled = forwardSteps[nextStep] === null;
      return {
        activeStep: nextStep,
        isPrevDisabled,
        isNextDisabled,
      };
    }
    case "next": {
      const nextStep = forwardSteps[state.activeStep] ?? state.activeStep;
      const isPrevDisabled = backwardSteps[nextStep] === null;
      const isNextDisabled = forwardSteps[nextStep] === null;
      return {
        activeStep: nextStep,
        isPrevDisabled,
        isNextDisabled,
      };
    }
    default: {
      throw Error("Unknown action: " + JSON.stringify(action));
    }
  }
};

export const StepProvider = ({ children }: StepProviderProps) => {
  const [state, dispatch] = useReducer(stepReducer, initialStepState);

  return (
    <StepContext value={state}>
      <StepDispatchContext value={dispatch}>{children}</StepDispatchContext>
    </StepContext>
  );
};

export const useStep = () => {
  return useContext(StepContext);
};

export const useStepDispatch = () => {
  return useContext(StepDispatchContext);
};
