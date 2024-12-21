import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'

const theme = createTheme({
  cssVariables: true,
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0 100px white inset",
            WebkitTextFillColor: "inherit",
          },
        },
      },
    },
  },
  // breakpoints: {
  //   values: {
  //     laptop: 1024,
  //     tablet: 640,
  //     mobile: 0,
  //     desktop: 1280,
  //   },
  // },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
})

export default theme
