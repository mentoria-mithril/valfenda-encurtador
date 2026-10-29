import { Box, Divider, Stack, Typography } from "@mui/material";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

export function SectionLogin({ texto }: { texto: string }) {
    return (
        <Box
        sx={{
          display: { xs: "none", lg: "flex" },
          width: "42%",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 6,
          bgcolor: "background.paper",
          borderRight: "1px solid",
          borderColor: "divider",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <LinkRoundedIcon sx={{ color: "primary.main", fontSize: 22 }} />
          <Typography
            sx={{ fontFamily: "monospace", letterSpacing: -0.5 }}
            variant="h6"
          >
            encurtador
          </Typography>
        </Stack>

        <Stack spacing={4} sx={{ maxWidth: 320 }}>
          <Stack spacing={1.5}>
            <Typography
              noWrap
              sx={{ fontFamily: "monospace", fontSize: 13, color: "text.secondary" }}
            >
              https://minha-loja.com.br/promocoes/black-friday/2026?ref=email&utm=outubro
            </Typography>

            <Stack direction="row" spacing={1.5} alignItems="center">
              <Divider sx={{ flex: 1 }} />
              <Typography
                sx={{ fontFamily: "monospace", fontSize: 12, color: "text.secondary" }}
              >
                vira
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Stack>

            <Typography
              sx={{ fontFamily: "monospace", fontWeight: 500, color: "primary.main" }}
              variant="h5"
            >
              encurta.do/bf26
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {texto}
          </Typography>
        </Stack>

        <Typography variant="caption" color="text.secondary">
          © 2026 Encurtador
        </Typography>
      </Box>
    )
}