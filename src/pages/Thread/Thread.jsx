import { DatePicker } from "@/components/DatePicker";
import { FiltersGroup } from "@/components/ui/TableFilters";
import { getAPIParams } from "@/lib/getAPIParams";
import { cn } from "@/lib/utils";
import { useApi } from "@/services";
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import ThreadRow from "./ThreadRow";

import { ErrorMessage, Loader, PageHead } from "@/components/ui";

function ThreadTable() {
  const [searchParams] = useSearchParams();
  const apiParams = getAPIParams(["uid", "date"], searchParams);
  const { data, isLoading, error } = useApi("thread", apiParams);

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
        <DatePicker variant="asFilter" />
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
          <div className="table-headers thread-grid">
            <div></div>
            <div>прибытие</div>
            <div className="hidden md:block">стоянка</div>
            <div>отправление</div>
          </div>
          <div
            className={cn(
              "table-body w-narrow transition-opacity",
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
