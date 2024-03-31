import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function Loaders() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
      <Skeleton variant="rounded" width={"100%"} height={100} />
    </Stack>
  );
}
