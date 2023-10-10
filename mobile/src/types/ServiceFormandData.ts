import { z } from "zod";

// SERVICE CALL FORM

const numericQuestions = z.object({
  alkalinity: z.coerce.number({
    required_error: "Alkalinity reading is required*",
  }),
  calcium: z.coerce.number({
    required_error: "Calcium reading is required*",
  }),
  nitrate: z.coerce.number({
    required_error: "Nitrate reading is required*",
  }),
  phosphate: z.coerce.number({
    required_error: "Phosphate reading is required*",
  }),
});

const booleanQuestions = z.object({
  ATOOperational: z.boolean().default(false),
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
  waterTestedRecordedDated: z.boolean(),
  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean(),
});

const textQuestions = z.object({
  customerRequest: z.string(),
  employeeNotes: z.string(),
});

export const serviceFormSchema = numericQuestions.merge(
  booleanQuestions.merge(textQuestions),
);

type NumericQuestions = z.infer<typeof numericQuestions>;
type BooleanQuestions = z.infer<typeof booleanQuestions>;
type TextQuestions = z.infer<typeof textQuestions>;

export type ServiceFormData = NumericQuestions &
  BooleanQuestions &
  TextQuestions;

export const defaultServiceFormValues: Partial<ServiceFormData> = {
  ATOOperational: false,
  ATOReservoirFilled: false,
  chemFilterAdjusted: false,
  doserAdjustementOrManualDosing: false,
  dosingReservoirsFull: false,
  floorsCheckedForSpillsOrDirt: false,
  glassCleanedInside: false,
  glassCleanedOutside: false,
  mechFilterChanged: false,
  pumpsClearedOfDebris: false,
  saltCreepCleaned: false,
  skimmerCleanedAndOperational: false,
  waterChanged: false,
  waterTestedRecordedDated: false,
  pestAPresent: false,
  pestBPresent: false,
  pestCPresent: false,
  pestDPresent: false,
  customerRequest: "",
  employeeNotes: "",
};

type ServiceFormFieldId =
  | "alkalinity"
  | "calcium"
  | "nitrate"
  | "phosphate"
  | "ATOOperational"
  | "ATOReservoirFilled"
  | "chemFilterAdjusted"
  | "doserAdjustementOrManualDosing"
  | "dosingReservoirsFull"
  | "floorsCheckedForSpillsOrDirt"
  | "glassCleanedInside"
  | "glassCleanedOutside"
  | "mechFilterChanged"
  | "pumpsClearedOfDebris"
  | "saltCreepCleaned"
  | "skimmerCleanedAndOperational"
  | "waterChanged"
  | "waterTestedRecordedDated"
  | "pestAPresent"
  | "pestBPresent"
  | "pestCPresent"
  | "pestDPresent"
  | "customerRequest"
  | "employeeNotes";

type ServiceFormFieldQuestion = {
  id: ServiceFormFieldId;
  label: string;
};

export const serviceFormFieldQuestionsText: ServiceFormFieldQuestion[] = [
  {
    id: "employeeNotes",
    label: "Notes",
  },
  {
    id: "customerRequest",
    label: "Customer Request",
  },
];

export const serviceFormFieldQuestionsNumeric: ServiceFormFieldQuestion[] = [
  {
    id: "nitrate",
    label: "Nitrate",
  },
  {
    id: "phosphate",
    label: "Phosphate",
  },
  {
    id: "calcium",
    label: "Calcium",
  },
  {
    id: "alkalinity",
    label: "Alkalinity",
  },
];

export const serviceFormFieldQuestionsBoolean: ServiceFormFieldQuestion[] = [
  {
    id: "waterTestedRecordedDated",
    label: "Water Tested, Recorded, and Dated",
  },
  {
    id: "glassCleanedInside",
    label: "Inside of Glass Cleaned",
  },
  {
    id: "mechFilterChanged",
    label: "Mechanical Filtration Changed",
  },
  {
    id: "chemFilterAdjusted",
    label: "Chemical Filtration Adjusted",
  },
  {
    id: "waterChanged",
    label: "Water Changed",
  },
  {
    id: "skimmerCleanedAndOperational",
    label: "Skimmer Cleaned And Operating",
  },
  {
    id: "ATOReservoirFilled",
    label: "ATO Reservoir Filled",
  },
  {
    id: "ATOOperational",
    label: "ATO Operating",
  },
  {
    id: "pumpsClearedOfDebris",
    label: "Pumps Clear Of Debris",
  },
  {
    id: "doserAdjustementOrManualDosing",
    label: "Doser Adjusted Or Manual Dosing",
  },
  {
    id: "dosingReservoirsFull",
    label: "Dosing Reservoirs Full",
  },
  {
    id: "glassCleanedOutside",
    label: "Outside of Glass Cleaned",
  },
  {
    id: "saltCreepCleaned",
    label: "Salt Creep Cleaned",
  },
  {
    id: "floorsCheckedForSpillsOrDirt",
    label: "Floors Checked For Spills Or Dirt",
  },
  {
    id: "pestAPresent",
    label: "Pest A Present",
  },
  {
    id: "pestBPresent",
    label: "Pest B Present",
  },
  {
    id: "pestCPresent",
    label: "Pest C Present",
  },
  {
    id: "pestDPresent",
    label: "Pest D Present",
  },
];
