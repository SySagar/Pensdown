import { Stack, Typography } from "@mui/material";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Stack
      direction={"column"}
      gap={1}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"row"} gap={1}>
        <Typography fontSize={"13px"}>
          <a
            style={{
              paddingInline: "5px",
            }}
            className="footer-link"
            href="/about"
          >
            About
          </a>
          •
          <a
            style={{
              paddingInline: "5px",
            }}
            className="footer-link"
            href="/contact"
          >
            Contact
          </a>
          •
          <a
            style={{
              paddingInline: "5px",
            }}
            className="footer-link"
            href="/"
          >
            Writer
          </a>
          •
          <a
            style={{
              paddingInline: "5px",
            }}
            className="footer-link"
            href="/"
          >
            Status
          </a>
        </Typography>
      </Stack>
      <Typography variant="caption">Pensdown © {year}</Typography>
    </Stack>
  );
}
