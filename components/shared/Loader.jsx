import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SkPostCard() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton
        animation="wave"
        variant="circular"
        width={40}
        height={40}
        sx={{ backgroundColor: "red" }}
      />
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={210}
        height={60}
      />
      <Skeleton animation="wave" variant="rounded" width={210} height={60} />
    </Stack>
  );
}
