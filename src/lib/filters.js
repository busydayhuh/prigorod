export const filterExpress = (results, expressOnly) => {
  if (expressOnly) {
    const expressOnlyResults = results.filter((result) => {
      return result.thread.express_type;
    });

    return expressOnlyResults;
  }

  return results;
};

export const filterDirecton = (results, dir) => {
  return results.filter((result) => {
    return result.direction === dir;
  });
};
