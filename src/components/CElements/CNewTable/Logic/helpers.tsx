export function toggleRowGroupSelection({
  selectedItems,
  currentGroup,
}: {
  selectedItems: number[];
  currentGroup: number[];
}): number[] {
  const isAllSelected = currentGroup.every((i) => selectedItems.includes(i));

  if (isAllSelected) {
    return selectedItems.filter((i) => !currentGroup.includes(i));
  } else {
    return Array.from(new Set([...selectedItems, ...currentGroup]));
  }
}

export const areAllRowsSelectedOnPage = (
  selectedItems: number[],
  dataSource: { index: number }[]
): boolean => {
  const pageIndexes = dataSource.map((item) => item.index - 1);

  return pageIndexes.every((i) => selectedItems.includes(i));
};
