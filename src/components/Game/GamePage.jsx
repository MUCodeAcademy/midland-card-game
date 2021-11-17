import { useContext } from "react";
import { GameContext } from "../../shared/context/GameContext";
import { UserContext } from "../../shared/context/UserContext";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useSocket from "../../shared/hooks/useSocket";
import { FormHelperText } from "@mui/material";
import { useParams } from "react-router-dom";

// the center of this page should have all of the usernames with their cards (face down)
// your cards face up with the draw and stay buttons, then check up to 3 boxes to select cards to draw/replace.
// most of the card functionality will come from seth

// further breakdown:
// display game code-displayed on the game page, but also need to pass this into the useSocket hook (not sure if done properly)
// show host's name - now shows in the top left
// card functionality? i believe seth will be taking care of most of this
// choose which cards to discard on your turn?
// set up a spot for chat to be implemented
// set up spot for cards and players (middle of page)
// show whos turn it currently is (top right of page)
// need to map through the players array that is given by Seth, should show the cards only for that player
// then, on turn let them select up to 3 of the 5 cards in their hand to exchange for the top card (draw function)

// for the players and cards map through the users, and generate players (pass in draw cards, player(mapped through players array) player index)
// Seth is looking for the "player" and playerIdx props to be passed in to his playercomponent.
// need to pull drawCards from the useSocket hook?
// ultimately i need to get Seth drawCards, player, playerIdx.
// use object deconstruction with the useSocket hook

// for Chat- I will need message, sendChat, as props,  maybe something else, probably not

const theme = createTheme();

function GamePage() {
  const { isHost, user } = useContext(UserContext);
  const { deck, cardsDealt, players, isActive, isTurn, createDeck } =
    useContext(GameContext);
  const gameCode = window.location.href.slice(-6);
  // the following needs to get route parameter, then pass that to useSocket hook
  // const socketGameCode = useSocket(window.location.href.slice(-6));

  // const socketGameCode = useSocket(":gameCode");

  const { id } = useParams();
  const socket = useSocket(id);

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box container sx={{ flexDirection: "column", alignItems: "start" }}>
          <Box item>
            Join code for this game:
            {gameCode}
          </Box>
          <Box item>
            <div>Hosted By:{isHost}</div>
          </Box>
          make the start game function only visible for the host, and show a
          little bit
          <Box item sx={{ maxWidth: 200 }}>
            <Button
              sx={{ width: 150, height: 40 }}
              disabled={!isHost}
              variant="contained"
              onClick={() => {
                createDeck();
              }}
            >
              Start Game
            </Button>
            <FormHelperText>&#8593; Host Only &#8593;</FormHelperText>
          </Box>
          <Box> </Box>
        </Box>
        <Grid height="20px"></Grid>
        <Container
          sx={{ flexDirection: "column", alignItems: "center" }}
          container
          spacing={2}
        >
          <Grid>Main Cards Element</Grid>
        </Container>
      </ThemeProvider>
    </Box>
  );
}

export default GamePage;
