import { useStep, useStepDispatch } from "@/context/TabsContext";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationButtons = () => {
  const { isPrevDisabled, isNextDisabled } = useStep();
  const dispatch = useStepDispatch();

  return (
    <div className="w-full flex flex-row justify-between items-center">
      <Button
        disabled={isPrevDisabled}
        onClick={() => dispatch({ type: "previous" })}
      >
        <ChevronLeft />
        Previous
      </Button>
      <Button
        disabled={isNextDisabled}
        onClick={() => dispatch({ type: "next" })}
      >
        Next
        <ChevronRight />
      </Button>
    </div>
  );
};

export default PaginationButtons;
