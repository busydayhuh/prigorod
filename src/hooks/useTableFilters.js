import { useCallback, useState } from "react";

export function useTableFilters() {
  const [tableFilters, setTableFilters] = useState({
    departed: false,
    express: false,
  });

  const filterTime = useCallback((results, route) => {
    return {
      departed: results.departed || results[route].departed,
      future: results.future || results[route].future,
    };
  }, []);

  const filterExpress = useCallback((results, express) => {
    if (!express) return results;

    return {
      departed: results.departed.filter((result) => result.thread.express_type),
      future: results.future.filter((result) => result.thread.express_type),
    };
  }, []);

  const getFilteredResults = useCallback(
    (results, route, express) => {
      const normalizedResults = filterTime(results, route);
      return filterExpress(normalizedResults, express);
    },
    [filterExpress, filterTime],
  );

  return { tableFilters, setTableFilters, getFilteredResults };
}
