export type Unit = {
  name: string;
  monthlyRent: number;
};

export type FormValues = {
  address: string;
  purchasePrice: number;
  numBeds: number;
  numBaths: number;
  squareFootage: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  annualPropertyTax: number;
  annualInsurance: number;
  vacancyRate: number;
  maintenanceRate: number;
  capexRate: number;
  utilities: number;
  miscExpenses: number;
  units: Unit[];
  annualRentGrowth: number;
  annualAppreciation: number;
  annualOperatingExpenseIncrease: number;
};

export type CashflowLineChartMetadata = {
  income: number;
  expenses: number;
  cashFlow: number;
};
