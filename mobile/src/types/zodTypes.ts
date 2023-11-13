import { z } from 'zod';

// USER

export const userSchema = z.object({
  id: z.number().int(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),

  isEmployee: z.boolean()
});

// AUTH

export const loginSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  password: z.string(),
  role: z.enum(['ADMIN', 'EMPLOYEE', 'CUSTOMER']),
  userId: z.number()
});

export const authLogin = loginSchema.omit({
  id: true,
  role: true,
  userId: true
});

export type AuthLogin = z.infer<typeof authLogin>;

// LOGIN ERROR RESPONSE

export const errorSchema = z.object({
  status: z.number().optional(),
  data: z.object({ message: z.string().default('') }).optional()
});

// SERVICE CALL FORM

// Invalid type error for now
// FIXME: required_error is not working for some reason
// invalid_type_error is executed due to possible improper coercion
// within the value passed to the textinput
const numericQuestions = z.object({
  alkalinity: z.coerce.number({
    // required_error: "Alkalinity reading is required*",
    invalid_type_error: 'Alkalinity reading is required*'
  }),
  calcium: z.coerce.number({
    // required_error: "Calcium reading is required*",
    invalid_type_error: 'Calcium reading is required*'
  }),
  nitrate: z.coerce.number({
    // required_error: "Nitrate reading is required*",
    invalid_type_error: 'Nitrate reading is required*'
  }),
  phosphate: z.coerce.number({
    // required_error: "Phosphate reading is required*",
    invalid_type_error: 'Phosphate reading is required*'
  })
});

const booleanQuestions = z.object({
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
  waterTestedRecordedDated: z.boolean(),
  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean()
});

const textQuestions = z.object({
  customerRequest: z.string(),
  employeeNotes: z.string()
});

export const serviceFormSchema = numericQuestions.merge(
  booleanQuestions.merge(textQuestions)
);
export type ServiceFormData = z.infer<typeof serviceFormSchema>;

const serviceCall = serviceFormSchema.extend({
  employeeId: z.number().int(),
  tankId: z.number().int(),
  createdOn: z.coerce.date()
});

// SERVICECALL

export const serviceCallSchema = z.object({
  id: z.number().int(),
  isApproved: z.boolean(),
  createdOn: z.coerce.date(),

  customerRequest: z.string().optional().default(''),
  employeeNotes: z.string().optional().default(''),
  // server use only for not-approved notes
  notApprovedNotes: z.string().optional().default(''),
  notesUpdated: z.coerce.date().optional().nullable().default(null),

  /*
    ! Temp fix:
  * coerce on mobile to work around parseFloat behavior with TextInput from react native library 
  * invalid type error from having an undefined default value which will proxy the required behavior
   */
  alkalinity: z.coerce.number({
    invalid_type_error: 'Alkalinity reading is required*'
  }),
  calcium: z.coerce.number({
    invalid_type_error: 'Calcium reading is required*'
  }),
  nitrate: z.coerce.number({
    invalid_type_error: 'Nitrate reading is required*'
  }),
  phosphate: z.coerce.number({
    invalid_type_error: 'Phosphate reading is required*'
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
  waterTestedRecordedDated: z.boolean(),

  pestAPresent: z.boolean(),
  pestBPresent: z.boolean(),
  pestCPresent: z.boolean(),
  pestDPresent: z.boolean(),

  employeeId: z.number().int(),
  tankId: z.number().int()
});

export type ServiceCall = z.infer<typeof serviceCall>;
export const mobileServiceCall = serviceCallSchema.omit({
  id: true,
  isApproved: true,
  notApprovedNotes: true
});
export const mobileServiceCallQuestions = serviceCallSchema.omit({
  id: true,
  isApproved: true,
  notApprovedNotes: true,
  employeeId: true,
  tankId: true
});

export type CreateServiceCall = z.infer<typeof mobileServiceCall>;
export type MobileServiceCallQuestions = z.infer<
  typeof mobileServiceCallQuestions
>;
