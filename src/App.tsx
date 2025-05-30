import React, { useState, type FC, type ReactNode } from "react";
import { data, type Rules, type SizeList } from "./Data";
import Card from "./Card";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import {
  Alert,
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Fab,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Snackbar,
  SnackbarContent,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  Toolbar,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";

// import MiniCard from "./MiniCard";

const defaultRules = {
  sizes: data.controls.sizes,
  isLocal: true,
};

const drawerWidth = 240;
const DEFAULT_QUANTITY = 1;

interface CardData {
  name: string;
  size: string;
  isLocal: boolean;
  quantity: number;
}
interface CardDataOverwrite {
  name?: string;
  size?: string;
  isLocal?: boolean;
  quantity?: number;
}

function getCard(params: CardDataOverwrite = {}): CardData {
  return {
    name: "",
    size: "",
    isLocal: true,
    quantity: 1,
    ...params,
  };
}

type CardState = null | CardData;
const defaultCards: CardData[] = [
  /* this should remain */
];
const otherCards = [
  {
    name: "Blueberry",
    size: "2 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Orange Blossom",
    size: "1 lb",
    isLocal: true,
    quantity: 7,
  },
  {
    name: "Blueberry",
    size: "2.5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Blueberry",
    size: "5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Blueberry",
    size: "12 oz",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Orange Blossom",
    size: "2 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Blueberry",
    size: "1 lb",
    isLocal: true,
    quantity: 7,
  },
  {
    name: "Blueberry",
    size: "2.5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Orange Blossom",
    size: "5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Tupelo",
    size: "8 oz",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Blueberry",
    size: "2 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Orange Blossom",
    size: "1 lb",
    isLocal: true,
    quantity: 7,
  },
  {
    name: "Blueberry",
    size: "2.5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Blueberry",
    size: "5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Blueberry",
    size: "12 oz",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Orange Blossom",
    size: "2 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Blueberry",
    size: "1 lb",
    isLocal: true,
    quantity: 7,
  },
  {
    name: "Blueberry",
    size: "2.5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Orange Blossom",
    size: "5 lb",
    isLocal: true,
    quantity: 5,
  },
  {
    name: "Tupelo",
    size: "1 lb",
    isLocal: true,
    quantity: 5,
  },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
};

function getAddThingToListFn<T>(thing: T) {
  return function addThingToList(list: T[]) {
    return [...list, thing];
  };
}

type Tally = {
  [key: string]: number;
};

const CARDS_PER_PAGE = 10;

export default function App() {
  const [cards, setCards] = useState(defaultCards);
  const [lastRemovedCard, setLastRemovedCard] = useState<null | CardData>(null);
  const [editorError, setEditorError] = useState<null | {
    message: string;
    action: ReactNode;
  }>(null);
  const [isEditing, setIsEditing] = React.useState<null | undefined | number>(
    null
  );
  const editCard =
    isEditing === null
      ? null
      : typeof isEditing === "undefined"
      ? getCard({})
      : cards[isEditing];
  // const addCard = (card: CardData) => {
  //   const addingCards = [card];
  //   const addCardToList = getAddThingToListFn(card);
  //   setCards((currentCards) => {
  //     const result = currentCards.map((currentCard) =>
  //       currentCard.name === card.name && currentCard.size === card.size
  //         ? {
  //             ...currentCard,
  //             quantity: currentCard.quantity + addingCards!.pop()!.quantity,
  //           }
  //         : currentCard
  //     );
  //     if (addingCards.length) {
  //       return addCardToList(currentCards);
  //     }
  //     return result;
  //   });
  // };
  // const replaceCard = (card: CardData) => {
  //   setCards((currentCards) =>
  //     currentCards.map((currentCard, index) =>
  //       index === isEditing ? card : currentCard
  //     )
  //   );
  // };

  const saveCard = (card: CardData) => {
    const result = { error: null, success: null };
    const isExistingCard = typeof isEditing === "number";
    if (!isExistingCard) {
      const propertyMatch = cards.find(
        (currentCard) =>
          currentCard.name === card.name && currentCard.size === card.size
      );
      if (propertyMatch) {
        setEditorError({
          message: `${card.name} - ${card.size} already has ${propertyMatch.quantity} labels saved. Would you like to add ${card.quantity} more?`,
          action: (
            <Button
              onClick={() => {
                setEditorError(null);
              }}
            >
              Add {card.quantity} More
            </Button>
          ),
        });
        // onError();
        result.error = "Card exists";
        return results;
      }
    }
    setCards((existingCards) =>
      isExistingCard
        ? existingCards.map((existingCard, index) =>
            isEditing === index ? card : existingCard
          )
        : [...existingCards, card]
    );
    setIsEditing(null);
    return results;

    function results(resultHandler) {
      resultHandler(result.error, result.success);
    }
  };

  const cardTally: Tally = cards.reduce(
    (totals: Tally, card: CardData) => {
      if (!totals[`${card.name} - ${card.size}`]) {
        totals[`${card.name} - ${card.size}`] = 0;
      }
      totals[`${card.name} - ${card.size}`] += card.quantity;
      totals.count += card.quantity;
      return totals;
    },
    { count: 0 }
  );
  const remainder = cardTally.count % CARDS_PER_PAGE;
  const blankCardsCount = cardTally.count
    ? remainder && CARDS_PER_PAGE - remainder
    : CARDS_PER_PAGE;
  const totalPages = Math.ceil(cardTally.count / CARDS_PER_PAGE);
  return (
    <div>
      <div className="other-stuff">Hello print content</div>
      <div className="admin-controls">
        <Box sx={{ display: "flex" }}>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <Toolbar>
              <Typography variant="h6" component="h1">
                WOH Admin
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Toolbar />
            <Box sx={{ overflow: "auto" }}>
              <List>
                <ListItem>
                  <ListItemText>Label Maker</ListItemText>
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Container>
            <Toolbar />

            <Container>
              <Grid container spacing={5} direction="row">
                <Grid>
                  <Stack>
                    <Typography>Total Labels:</Typography>
                    <Box>{cardTally.count}</Box>
                  </Stack>
                </Grid>
                <Grid>
                  <Stack>
                    <Box>Total pages:</Box>
                    <Box>{totalPages}</Box>
                  </Stack>
                </Grid>
                <Grid>
                  <Stack>
                    <Box>Blank spots:</Box>
                    <Box>{blankCardsCount}</Box>
                  </Stack>
                </Grid>
                <Grid>
                  {/* <Stack direction="row" spacing={4}> */}
                  <FormControlLabel
                    labelPlacement="top"
                    control={<Switch defaultChecked />}
                    label="Group labels"
                    onChange={(_, checked) => {
                      console.log(checked);
                    }}
                  />
                </Grid>
                <Grid sx={{ marginRight: 0, marginLeft: "auto" }}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIsEditing(undefined);
                    }}
                  >
                    Create Label
                  </Button>
                  {/* </Stack> */}
                </Grid>
              </Grid>
              <br />
              <Divider />
              <br />
            </Container>
            <Container>
              {/* <Fab
                sx={{ position: "fixed", bottom: "10vh", right: "10vw" }}
                >
                <AddIcon />
                </Fab> */}
              <Grid container spacing={5}>
                {/* <Grid>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIsEditing(undefined);
                    }}
                  >
                    <div>Create Label</div>
                  </Button>
                </Grid> */}
                {cards.map((card, index) => (
                  <Grid key={index}>
                    <Stack>
                      <Badge
                        badgeContent={card.quantity}
                        color="primary"
                        anchorOrigin={{
                          vertical: "bottom",
                        }}
                      >
                        <Grid
                          sx={{
                            lineHeight: 0,
                            boxShadow: (theme) => theme.shadows[3],
                          }}
                        >
                          <Button
                            onClick={() => {
                              setIsEditing(index);
                            }}
                          >
                            {card.name}
                            <br />
                            {card.size}
                          </Button>
                        </Grid>
                      </Badge>
                      <Button
                        onClick={() => {
                          setCards((currentCards) =>
                            currentCards.filter(
                              (currentCard) => currentCard !== card
                            )
                          );
                          setLastRemovedCard(card);
                        }}
                      >
                        Remove
                      </Button>
                    </Stack>
                  </Grid>
                ))}
              </Grid>
              <br />
              <Modal
                open={!!editCard}
                onClose={() => {
                  setIsEditing(null);
                }}
              >
                <Editor
                  error={editorError}
                  editCard={editCard}
                  blankCardsCount={blankCardsCount}
                  onSave={saveCard}
                  onCancel={
                    !cards.length
                      ? null
                      : () => {
                          setIsEditing(null);
                        }
                  }
                />
              </Modal>
              <Drawer anchor="bottom" variant="permanent">
                <RemovedCards
                  removedCard={lastRemovedCard}
                  restoreCard={(card) => {
                    setLastRemovedCard(null);
                    saveCard(card);
                  }}
                />
              </Drawer>
            </Container>
          </Container>
        </Box>
      </div>
    </div>
  );
}

// editCard={isEditing}
// onSave={onSave}
// hasCancel={!!cards.length}
// onCancel={!!cards.length && () => {
//     nameState[1]("");
//     sizeState[1]("");
//     quantityState[1](1);
//     setIsEditing(null);
// }}

type CallB = () => void;
type ResultFn = (callback: CallB) => void;

function Editor({
  editCard,
  onSave,
  onCancel,
  blankCardsCount,
  error = null,
}: {
  editCard: CardState;
  onSave: (card: CardData) => ResultFn;
  onCancel?: null | (() => void);
  blankCardsCount: number;
  error: null | { message: string; action: ReactNode };
}) {
  const [name, setName] = useState(editCard?.name ?? "");
  const [size, setSize] = useState(editCard?.size ?? "");
  const [quantity, setQuantity] = useState(
    editCard?.quantity ?? DEFAULT_QUANTITY
  );
  const controls: null | Rules = name ? data.varieties[name] : null;
  const isDefault = controls === "default";
  const rules = isDefault ? defaultRules : controls;
  const sizes: SizeList = rules?.sizes ?? defaultRules.sizes;
  return (
    <Box sx={modalStyle}>
      <Grid container spacing={2}>
        <Grid
          sx={{
            zoom: 0.5,
            lineHeight: 0,
            boxShadow: (theme) => theme.shadows[3],
          }}
        >
          <Card name={name} size={size} isLocal={rules?.isLocal} />
        </Grid>
      </Grid>
      <br />
      <form>
        <Grid container spacing={2}>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Variety</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={name}
                label="Variety"
                onChange={(event: SelectChangeEvent) => {
                  setName(event.target.value as string);
                }}
              >
                {Object.entries(data.varieties).map(([name]) => (
                  <MenuItem value={name} key={name}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                label="Size"
                onChange={(event: SelectChangeEvent) => {
                  setSize(event.target.value as string);
                }}
              >
                {sizes &&
                  Object.entries(sizes).map(([weight, size]) => (
                    <MenuItem value={size} key={weight}>
                      {size}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <TextField
              label="How many?"
              value={quantity}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setQuantity(+event.target.value);
              }}
              type="number"
              aria-valuemin={1}
              slotProps={{
                htmlInput: {
                  min: 1,
                },
              }}
            />
            <Typography>{blankCardsCount} left on this sheet.</Typography>
          </Grid>
          <Grid size={12} justifyContent={"flex-end"} container>
            {onCancel && (
              <React.Fragment>
                <Button variant="outlined" onClick={onCancel}>
                  Cancel
                </Button>
                <Divider />
              </React.Fragment>
            )}
            <Button
              variant="contained"
              disabled={!name || !size}
              onClick={() => {
                const result = onSave({
                  name,
                  isLocal: !!rules!.isLocal,
                  size,
                  quantity,
                });
                result((error, success) => {
                  if (error) {
                    console.error({ error });
                  } else {
                    setName("");
                    setSize("");
                    setQuantity(1);
                  }
                });
              }}
            >
              Save
            </Button>
            {error && (
              <Alert severity="warning" action={error?.action}>
                {error?.message}
              </Alert>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

// type ControlsProps = {
//   name: string;
//   sizes: SizeList;
// };

// function Controls({ name, sizes }: ControlsProps): ReactElement {
//   return (
//     <>
//       {/* {Object.entries(theseRules).map(([rule, options]) => typeof options === 'boolean' ? <label>{rule}<input id={rule} type="checkbox" readonly/></label> : <select title={`${name} ${rule}`} key={`${name}${rule}`}>
//       {Object.entries(options).map(([option, _display]) => <option key={option}>a</option>)}
//     </select>)} */}
//     </>
//   );
// }

// type Afn = (x: <T>) => <T>[]
function removeCardFromListFn(card: RemovedCard) {
  return function removeCardFromList(list: RemovedCard[]): RemovedCard[] {
    return list.filter((listCard) => listCard !== card);
  };
}
type Timer = null | ReturnType<typeof setTimeout>;
type RestoreCardFn = (card: CardData) => void;
type RemovedCard = {
  timer: Timer;
  card: CardData;
};

function RemovedCards({
  removedCard,
  restoreCard,
}: {
  removedCard: null | CardData;
  restoreCard: RestoreCardFn;
}) {
  const [removedCards, setRemovedCards] = React.useState<RemovedCard[]>([]);
  const [snackCards, setSnackCards] = React.useState<RemovedCard[]>([]);
  const removedRef = React.useRef<CardData | null>(removedCard);

  const removeSnackCard = (card: RemovedCard) => {
    if (card.timer) {
      clearTimeout(card.timer);
    }
    setSnackCards((currentSnackCards) =>
      currentSnackCards.filter((currentSnackCard) => currentSnackCard !== card)
    );
  };

  if (removedCard !== removedRef.current) {
    if (
      removedCard &&
      !removedCards.find(
        (currentRemovedCard) => currentRemovedCard.card === removedCard
      )
    ) {
      const removerCard: RemovedCard = { card: removedCard, timer: null };
      const timer = setTimeout(() => {
        removerCard.timer = null;
        removeSnackCard(removerCard);
      }, 6000);
      removerCard.timer = timer;
      const addCardToListFn = getAddThingToListFn(removerCard);
      setRemovedCards(addCardToListFn);
      setSnackCards(addCardToListFn);
    }
  }
  removedRef.current = removedCard;

  function undeleteCard(removedCard: RemovedCard) {
    restoreCard(removedCard.card);
    setRemovedCards(removeCardFromListFn(removedCard));
    removeSnackCard(removedCard);
  }

  return (
    !!removedCards.length && (
      <>
        {/* <Drawer anchor="bottom" variant="permanent"> */}
        <Stack direction="row" whiteSpace="nowrap" spacing={6} padding={3}>
          {removedCards.map((removedCard, index) => (
            <Box key={index}>
              <Stack>
                <Badge
                  badgeContent={removedCard.card.quantity}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "bottom",
                  }}
                >
                  <Button
                    color="secondary"
                    onClick={() => {
                      undeleteCard(removedCard);
                    }}
                    sx={{
                      boxShadow: (theme) => theme.shadows[3],
                    }}
                  >
                    {removedCard.card.name}
                    <br />
                    {removedCard.card.size}
                  </Button>
                </Badge>
              </Stack>
            </Box>
          ))}
        </Stack>
        <Snackbar
          open={!!removedCards.length}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Stack spacing={2} direction="row" sx={{ marginTop: "-17vh" }}>
            {snackCards.map((removedCard, index) => (
              <SnackbarContent
                key={index}
                message={`${removedCard.card.name} - ${removedCard.card.size} was removed.`}
                action={
                  <Button
                    onClick={() => {
                      undeleteCard(removedCard);
                    }}
                  >
                    Undo
                  </Button>
                }
              />
            ))}
          </Stack>
        </Snackbar>
      </>
    )
  );
}
