import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../theme";
//import Link from "@mui/material";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            JKYOG
          </Typography>
          <div>
            JKYog is a part of the worldwide mission envisioned by
            Jagadguru Kripaluji Shree Maharaj, the 5th authentic 'Jagadguru',
            spiritual master of the world. Shree Maharajji as he is lovingly
            referred to by all his devotees, was one of the most endearing
            divine personalities of the last 90 years who dedicated his entire
            life for the service of humanity, especially for the spiritual
            upliftment of the society.
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
          Email: secretary@jkyog.org
          </Typography>
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
          Plano, Tx 75025 U.S
          </Typography>
          <Typography mb="30px">+1 (469) 795-9135</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
