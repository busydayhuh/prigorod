import { DatePicker } from "@/components/DatePicker";
import { FiltersGroup } from "@/components/ui/TableFilters";
import { useApi } from "@/hooks/useApi";
import { getAPIParams } from "@/lib/getAPIParams";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import ThreadRow from "./ThreadRow";

import { ErrorMessage, Loader, PageHead } from "@/components/ui";

function Thread() {
  const [searchParams] = useSearchParams();
  const apiParams = getAPIParams(["uid", "date"], searchParams);
  const { data, isLoading, error } = useApi("thread", apiParams);

  const isExpress = data?.express_type;
  const subtypeName = data?.transport_subtype?.title;

  return (
    <div className="w-narrow">
      <PageHead
        number={searchParams.get("number")}
        title={searchParams.get("name")}
        isExpress={isExpress}
        days={data?.days}
        exception={data?.except_days}
        date={searchParams.get("date")}
        subtypeName={subtypeName}
      />

      <FiltersGroup>
        <DatePicker variant="asFilter" />
      </FiltersGroup>

      <div className="relative min-h-120">
        {isLoading && <Loader />}
        <div className="table-headers thread-grid mx-8 md:mx-12">
          <div></div>
          <div>прибытие</div>
          <div className="hidden md:block">стоянка</div>
          <div>отправление</div>
        </div>
        <div
          className={cn(
            "table-body w-narrow transition-opacity",
            isLoading && "opacity-20",
          )}
        >
          <ThreadResults data={data} error={error} />
        </div>
      </div>
    </div>
  );
}

function ThreadResults({ data, error }) {
  const errorMessage = (error) => {
    if (error.status_code === 404)
      return (
        <ErrorMessage
          variant="exceptionDay"
          days={data?.days}
          exception={data?.except_days}
        />
      );

    return <ErrorMessage variant="general" />;
  };

  if (error) return errorMessage(error);
  if (data)
    return data.stops.map((segment) => {
      return <ThreadRow key={uuidv4()} date={data.start_date} {...segment} />;
    });
}

export default Thread;
