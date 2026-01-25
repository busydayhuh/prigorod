import { z } from "zod";

const searchSchema = z.object({
  from: z.string().min(1, {
    required_error: "выберите станцию",
    message: "выберите станцию",
  }),
  to: z.string().min(1, {
    required_error: "выберите станцию ",
    message: "выберите станцию",
  }),
  date: z.date({
    required_error: "выберите дату",
    message: "выберите дату",
  }),
  fromLabel: z.string(),
  toLabel: z.string(),
});

export default searchSchema;
