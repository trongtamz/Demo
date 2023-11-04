export const isEmptyFilterValues = (...filterValuesList: (string[] | null | undefined)[]) => {
  return filterValuesList.some((filterValues) => filterValues && filterValues.length === 0);
};
