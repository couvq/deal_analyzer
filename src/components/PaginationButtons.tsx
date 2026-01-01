import { useTabs, useTabsDispatch } from "@/context/TabsContext";
import { Button } from "./ui/button";

const PaginationButtons = () => {
  const { isPrevDisabled, isNextDisabled } = useTabs();
  const dispatch = useTabsDispatch();

  return (
    <>
      <Button disabled={isPrevDisabled}>Previous</Button>
      <Button disabled={isNextDisabled}>Next</Button>
    </>
  );
};

export default PaginationButtons;
