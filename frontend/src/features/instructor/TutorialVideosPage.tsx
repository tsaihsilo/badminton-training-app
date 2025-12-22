import { useDrills } from "./hooks/drills/useDrills";

import { Typography } from "@mui/material";
import { colors } from "../../shared/constants";

interface Drill {
  id: number,
  title: string,
  video_url: string,
  is_active: boolean,
}

export const TutorialVideosPage = () => {
  const { data, isLoading, error } = useDrills();

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>Error loading drills.</div>

  return (
    <div style={{ padding: "10px 10px 10px 90px" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          rowGap: "40px", 
        }}
      >
        {data.map((drill: Drill) => (
          <div key={drill.id}>
            <Typography
              sx={{ 
                color: colors.inPageText,
                fontSize: 15,
                fontWeight: 800,
                mb: 2,
                mt: 2
              }}
            >
              {drill.title}
            </Typography>
            <iframe src={drill.video_url}
              title={drill.title}
              width="400"
              height="225"
              style={{ borderRadius: "8px" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </div>
  );
};