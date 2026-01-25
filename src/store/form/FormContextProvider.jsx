import searchSchema from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

function FormContextProvider({ children }) {
  const [urlParams] = useSearchParams();

  const initialDate = useMemo(
    () =>
      urlParams.get("date") ? new Date(urlParams.get("date")) : new Date(),
    [urlParams],
  );

  const searchForm = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: urlParams?.get("from") || "",
      to: urlParams?.get("to") || "",
      date: initialDate,
      fromLabel: urlParams?.get("fromLabel") || "",
      toLabel: urlParams?.get("toLabel") || "",
    },
  });

  useEffect(() => {
    if (initialDate) searchForm.setValue("date", initialDate);
  }, [initialDate, searchForm]);

  return <FormProvider {...searchForm}>{children}</FormProvider>;
}

export default FormContextProvider;
