import MultiStepForm from "@/components/MultiStepForm";
import { StepProvider } from "./context/StepContext";

const App = () => {
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-4xl mb-2">Deal analyzer</h1>
        <p>Analyze investment properties in seconds.</p>
      </div>
      <StepProvider>
        <MultiStepForm />
      </StepProvider>
    </div>
  );
};

export default App;
