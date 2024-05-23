export interface Invoice {
  id: number;
  clientNumber: string;
  referenceMonth: string;
  createdAt: string;
  electricEnergyId: number;
  sceeEnergyId: number;
  compensatedEnergyId: number;
  municipalPublicLightingContributionId: number;
  electricEnergy: {
    id: number;
    quantity: number;
    value: number;
    createdAt: string;
  };
  sceeEnergy: {
    id: number;
    quantity: number;
    value: number;
    createdAt: string;
  };
  compensatedEnergy: {
    id: number;
    quantity: number;
    value: number;
    createdAt: string;
  };
  municipalPublicLightingContribution: {
    id: number;
    value: number;
    createdAt: string;
  };
}
