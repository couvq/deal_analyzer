import { useTabs, useTabsDispatch } from "@/context/TabsContext";
import { Button } from "./ui/button";

const PaginationButtons = () => {
  const { isPrevDisabled, isNextDisabled } = useTabs();
  const dispatch = useTabsDispatch();

  return (
    <>
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
    </>
  );
};

export default PaginationButtons;
