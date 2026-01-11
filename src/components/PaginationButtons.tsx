import { useStep, useStepDispatch } from "@/context/TabsContext";
import { Button } from "./ui/button";

const PaginationButtons = () => {
  const { isPrevDisabled, isNextDisabled } = useStep();
  const dispatch = useStepDispatch();

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <Button
        disabled={isPrevDisabled}
        onClick={() => dispatch({ type: "previous" })}
      >
        Previous
      </Button>
      <Button
        disabled={isNextDisabled}
        onClick={() => dispatch({ type: "next" })}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationButtons;
