import { z } from "zod";

const searchSchema = z.object({
  from: z.string().min(1, {
    required_error: "Выберите станцию отправления",
  }),
  to: z.string().min(1, {
    required_error: "Выберите станцию прибытия",
  }),
  //   date: z.date({
  //     required_error: "Выберите дату",
  //   }),
});

export default searchSchema;
