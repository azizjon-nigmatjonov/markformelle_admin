import { useMemo } from "react";

interface UseTableHeadersProps {
  bodyColumns: any[];
  predefinedColumns?: any[];
}

export const useTableHeaders = ({
  bodyColumns,
  predefinedColumns = [],
}: UseTableHeadersProps) => {
  const newHeadColumns = useMemo(() => {
    if (!bodyColumns?.length) return [];
    const obj = { ...bodyColumns?.[0] };
    const keys = Object.keys(obj);
    const newColumns: any = [...predefinedColumns];

    keys.forEach((key: string) => {
      const found = newColumns.find((item: any) => item.id === key);
      if (!found?.id) {
        newColumns.push({ title: key, id: key });
      }
    });

    return newColumns;
  }, [bodyColumns, predefinedColumns]);

  return { newHeadColumns };
};
