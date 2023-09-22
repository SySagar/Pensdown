import { Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Stack direction={'column'} gap={1} justifyContent={'center'} alignItems={'center'}>
      <Stack direction={'row'} gap={1}>
      <Typography variant="caption">
        <a style={{
          paddingInline: '5px',
        }} className="footer-link" href="/about" >
          About 
          </a>
          •
          <a style={{
          paddingInline: '5px',
        }} className="footer-link" href="/" >
          Contact
          </a>
          •
          <a style={{
          paddingInline: '5px',
        }} className="footer-link" href="/" >
          Writer 
          </a>
          •
          <a style={{
          paddingInline: '5px',
        }} className="footer-link" href="/" >
          Status
          </a>
      </Typography>
      </Stack>
      <Typography>
        Pensdown © 2023
      </Typography>
    </Stack>
  )
}
