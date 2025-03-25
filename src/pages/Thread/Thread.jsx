import { useSearchParams } from "react-router";
import { useApi } from "@/services";

import { DatePickerSchedule } from "@/components/DatePicker";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

import { FiltersGroup } from "@/components/ui/TableFilters";
import ThreadRow from "./ThreadRow";

import { PageHead, Loader, ErrorMessage } from "@/components/ui";

function ThreadTable() {
  const [searchParams] = useSearchParams();
  const { data, isLoading, error } = useApi("thread", searchParams);

  return (
    <div className="w-narrow">
      <PageHead
        number={searchParams.get("number")}
        title={searchParams.get("name")}
        isExpress={data?.transport_subtype?.title}
        days={data?.days}
        exception={data?.except_days}
        date={searchParams.get("date")}
      />

      <FiltersGroup>
        <DatePickerSchedule />
      </FiltersGroup>

      {error ? (
        error.status_code === 404 ? (
          <ErrorMessage
            variant="exceptionDay"
            days={data?.days}
            exception={data?.except_days}
          />
        ) : (
          <ErrorMessage variant="general" />
        )
      ) : (
        <div className="relative min-h-[30rem]">
          {isLoading && <Loader />}
          <div className="thread-grid table-headers">
            <div></div>
            <div>прибытие</div>
            <div>отправление</div>
            <div className="md:block hidden">стоянка</div>
          </div>
          <div
            className={cn(
              "table-body transition-opacity w-narrow",
              isLoading && "opacity-20"
            )}
          >
            {data &&
              data.stops.map((segment) => {
                return (
                  <ThreadRow
                    key={uuidv4()}
                    date={data.start_date}
                    {...segment}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ThreadTable;
