/* eslint-disable react/prop-types */
import searchSchema from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router";

const FormLabelsContext = createContext();
const FormLabelsUpdater = createContext();

export function useFormLabels() {
  return useContext(FormLabelsContext);
}

export function useFormLabelsUpdater() {
  return useContext(FormLabelsUpdater);
}

function FormContextProvider({ children }) {
  const [urlParams] = useSearchParams();

  const [formLabels, setFormLabels] = useState({
    fromLabel: urlParams?.get("fromLabel") || "",
    toLabel: urlParams?.get("toLabel") || "",
  });

  const initialDate = useMemo(
    () =>
      urlParams.get("date") ? new Date(urlParams.get("date")) : new Date(),
    [urlParams]
  );

  const formMethods = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: urlParams?.get("from") || "",
      to: urlParams?.get("to") || "",
      date: initialDate,
    },
  });

  useEffect(() => {
    if (initialDate) formMethods.setValue("date", initialDate);
  }, [initialDate, formMethods]);

  return (
    <FormProvider {...formMethods}>
      <FormLabelsContext.Provider value={formLabels}>
        <FormLabelsUpdater.Provider value={setFormLabels}>
          {children}
        </FormLabelsUpdater.Provider>
      </FormLabelsContext.Provider>
    </FormProvider>
  );
}

export default FormContextProvider;
