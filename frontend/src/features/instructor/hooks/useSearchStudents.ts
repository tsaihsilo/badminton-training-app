import { useQuery } from "@tanstack/react-query";
import { searchStudents } from "../api/searchStudents";

export const useSearchStudents = (query: string) => {
  return useQuery({
    queryKey: ["students-search", query],
    queryFn: () => searchStudents(query),
    enabled: !!query,
  });
};