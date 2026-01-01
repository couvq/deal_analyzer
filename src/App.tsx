import MultiStepForm from "@/components/MultiStepForm";
import { TabsProvider } from "./context/TabsContext";

const App = () => {
  return (
    <>
      <h1 className="text-4xl">Deal analyzer</h1>
      <p>Analyze investment properties in seconds.</p>
      <TabsProvider>
        <MultiStepForm />
      </TabsProvider>
    </>
  );
};

export default App;
