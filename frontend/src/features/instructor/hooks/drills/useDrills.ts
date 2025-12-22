import { useQuery } from "@tanstack/react-query";
import { getDrills } from "../../api/drills/getDrills";

export const useDrills = () => {
  return useQuery({
    queryKey: ["drills"],
    queryFn: getDrills,
  });
};