import { z } from 'zod';

// employeeId: number;
// tankId: number;

export interface ServiceFormData {
  alkalinity: number;
  calcium: number;
  nitrate: number;
  phosphate: number;
  ATOOperational: boolean;
  ATOReservoirFilled: boolean;
  chemFilterAdjusted: boolean;
  doserAdjustementOrManualDosing: boolean;
  dosingReservoirsFull: boolean;
  floorsCheckedForSpillsOrDirt: boolean;
  glassCleanedInside: boolean;
  glassCleanedOutside: boolean;
  mechFilterChanged: boolean;
  pumpsClearedOfDebris: boolean;
  saltCreepCleaned: boolean;
  skimmerCleanedAndOperational: boolean;
  waterChanged: boolean;
  pestAPresent: boolean;
  pestBPresent: boolean;
  pestCPresent: boolean;
  pestDPresent: boolean;
  customerRequest: string;
  employeeNotes: string;
}

export const serviceFormSchema = z.object({
  alkalinity: z.number({
    required_error: 'Alkalinity is required'
  }),
  calcium: z.number({ required_error: 'Calcium is required' }),
  nitrate: z.number({
    required_error: 'Nitrate is required'
  }),
  phosphate: z.number({
    required_error: 'Phosphate is required'
  }),
  ATOOperational: z.boolean(),
  ATOReservoirFilled: z.boolean(),
  chemFilterAdjusted: z.boolean(),
  doserAdjustementOrManualDosing: z.boolean(),
  dosingReservoirsFull: z.boolean(),
  floorsCheckedForSpillsOrDirt: z.boolean(),
  glassCleanedInside: z.boolean(),
  glassCleanedOutside: z.boolean(),
  mechFilterChanged: z.boolean(),
  pumpsClearedOfDebris: z.boolean(),
  saltCreepCleaned: z.boolean(),
  skimmerCleanedAndOperational: z.boolean(),
  waterChanged: z.boolean(),
  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean(),
  customerRequest: z.string(),
  employeeNotes: z.string()
});

type ServiceFormFieldId =
  | 'alkalinity'
  | 'calcium'
  | 'nitrate'
  | 'phosphate'
  | 'ATOOperational'
  | 'ATOReservoirFilled'
  | 'chemFilterAdjusted'
  | 'doserAdjustementOrManualDosing'
  | 'dosingReservoirsFull'
  | 'floorsCheckedForSpillsOrDirt'
  | 'glassCleanedInside'
  | 'glassCleanedOutside'
  | 'mechFilterChanged'
  | 'pumpsClearedOfDebris'
  | 'saltCreepCleaned'
  | 'skimmerCleanedAndOperational'
  | 'waterChanged'
  | 'pestAPresent'
  | 'pestBPresent'
  | 'pestCPresent'
  | 'pestDPresent'
  | 'customerRequest'
  | 'employeeNotes';

interface ServiceFormFieldQuestion {
  id: ServiceFormFieldId;
  label: string;
}

export const serviceFormFieldQuestionsText: ServiceFormFieldQuestion[] = [
  {
    id: 'customerRequest',
    label: 'Customer Request'
  },
  {
    id: 'employeeNotes',
    label: 'Employee Notes'
  }
];

export const serviceFormFieldQuestionsNumeric: ServiceFormFieldQuestion[] = [
  {
    id: 'alkalinity',
    label: 'Alkalinity'
  },
  {
    id: 'calcium',
    label: 'Calcium'
  },
  {
    id: 'nitrate',
    label: 'Nitrate'
  },
  {
    id: 'phosphate',
    label: 'Phosphate'
  }
];

export const serviceFormFieldQuestionsBoolean: ServiceFormFieldQuestion[] = [
  {
    id: 'ATOOperational',
    label: 'ATO Operational'
  },
  {
    id: 'ATOReservoirFilled',
    label: 'ATO Reservoir Filled'
  },
  {
    id: 'chemFilterAdjusted',
    label: 'Chem Filter Adjusted'
  },
  {
    id: 'doserAdjustementOrManualDosing',
    label: 'Doser Adjustement Or Manual Dosing'
  },
  {
    id: 'dosingReservoirsFull',
    label: 'Dosing Reservoirs Full'
  },
  {
    id: 'floorsCheckedForSpillsOrDirt',
    label: 'Floors Checked For Spills Or Dirt'
  },
  {
    id: 'glassCleanedInside',
    label: 'Glass Cleaned Inside'
  },
  {
    id: 'glassCleanedOutside',
    label: 'Glass Cleaned Outside'
  },

  {
    id: 'mechFilterChanged',
    label: 'Mech Filter Changed'
  },
  {
    id: 'pumpsClearedOfDebris',
    label: 'Pumps Cleared Of Debris'
  },
  {
    id: 'saltCreepCleaned',
    label: 'Salt Creep Cleaned'
  },
  {
    id: 'skimmerCleanedAndOperational',
    label: 'Skimmer Cleaned And Operational'
  },
  {
    id: 'waterChanged',
    label: 'Water Changed'
  },
  {
    id: 'pestAPresent',
    label: 'Pest A Present'
  },
  {
    id: 'pestBPresent',
    label: 'Pest B Present'
  },
  {
    id: 'pestCPresent',
    label: 'Pest C Present'
  },
  {
    id: 'pestDPresent',
    label: 'Pest D Present'
  }
];
