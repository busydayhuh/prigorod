import { useCallback, useState } from "react";

export function useTableFilters() {
  const [tableFilters, setTableFilters] = useState({
    departed: false,
    express: false,
  });

  const normalizeSchedule = useCallback((schedule, route) => {
    return {
      departed: schedule.departed || schedule[route].departed,
      future: schedule.future || schedule[route].future,
    };
  }, []);

  const filterExpress = useCallback((schedule, express) => {
    if (!express) return schedule;

    return {
      departed: schedule.departed.filter(
        (segment) => segment.thread.express_type,
      ),
      future: schedule.future.filter((segment) => segment.thread.express_type),
    };
  }, []);

  const getFilteredResults = useCallback(
    (schedule, route, express) => {
      const normalizedResults = normalizeSchedule(schedule, route);
      return filterExpress(normalizedResults, express);
    },
    [filterExpress, normalizeSchedule],
  );

  return { tableFilters, setTableFilters, getFilteredResults };
}
