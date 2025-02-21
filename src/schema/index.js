import { z } from "zod";

const searchSchema = z.object({
  from: z.string().min(1, {
    required_error: "Выберите станцию отправления",
    message: "Выберите станцию отправления",
  }),
  to: z.string().min(1, {
    required_error: "Выберите станцию прибытия",
    message: "Выберите станцию прибытия",
  }),
  date: z.date({
    required_error: "Выберите дату",
    message: "Выберите дату",
  }),
});

export default searchSchema;
