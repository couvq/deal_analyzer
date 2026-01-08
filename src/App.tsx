import MultiStepForm from "@/components/MultiStepForm";
import { TabsProvider } from "./context/TabsContext";

const App = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-4xl mb-2">Deal analyzer</h1>
        <p>Analyze investment properties in seconds.</p>
      </div>
      <TabsProvider>
        <MultiStepForm />
      </TabsProvider>
    </div>
  );
};

export default App;
