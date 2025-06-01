import React, { useState } from "react";
import { data, type Rules, type Variety } from "./Data";
// import Card from "./Card";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Container,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { ExpandMore, Print, Send } from "@mui/icons-material";
import CardFront from "./Card";
import CardBack from "./CardBack";
import EmptyCards from "./CardEmpty";

// import MiniCard from "./MiniCard";

const drawerWidth = 240;

const CARDS_PER_PAGE = 10;

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
function logAndReturn(value: any) {
  console.trace(value);
  return value;
}

type Quantity = number;
type Weight = number;
type Count = Record<Weight, Quantity>;
type Label = Record<string, never> | Record<Variety, Count>;
// type Label = {
//   [name: Variety]: {
//     [weight: Weight]: Quantity;
//   };
// };
// type VarietyTally = Record<Variety, Quantity>;
type VarietyTally = { [name: string]: Quantity };
type TallyCollection = { tally: Quantity; tallies: VarietyTally };
const ALL_VARIETIES = "all";

const DEFAULT_QUANTITY =
  (localStorage.getItem("saved") &&
    JSON.parse(localStorage.getItem("saved"))) ||
  {};

export default function App() {
  const [activeName, setActiveName] = useState<Variety | "">("");
  const [quantity, setQuantity] = useState<Label>(DEFAULT_QUANTITY);
  const [enabledVarieties] = useState<string[]>([ALL_VARIETIES]);
  const { tally, tallies } = React.useMemo(
    (): TallyCollection =>
      Object.entries(quantity).reduce(
        (acc: TallyCollection, [name, weights]) => {
          const varTotal = Object.values(weights).reduce(
            (acc, quantity) => acc + quantity,
            0
          );
          acc.tally += varTotal;
          acc.tallies[name] = varTotal;
          return acc;
        },
        {
          tally: 0,
          tallies: {},
        }
      ),
    [quantity]
  );
  const accordions = React.useMemo(getAccordions, [enabledVarieties]);
  const remainder = tally % CARDS_PER_PAGE;
  const blankCardsCount = tally
    ? remainder && CARDS_PER_PAGE - remainder
    : CARDS_PER_PAGE;
  const totalPages = Math.ceil(tally / CARDS_PER_PAGE);

  return (
    <div>
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
            <br />
            <Grid container spacing={2} direction="row">
              <Grid size={1.5} sx={{ minWidth: 120 }}>
                <TextField
                  size="small"
                  id="total-select"
                  value={`${tally}`}
                  label="Total labels"
                  slotProps={{
                    input: {
                      readOnly: true,
                      disabled: true,
                    },
                  }}
                  aria-readonly
                />
              </Grid>
              <Grid size={1.5} sx={{ minWidth: 120 }}>
                <TextField
                  size="small"
                  id="total-select"
                  value={`${totalPages}`}
                  label="Total pages"
                  slotProps={{
                    input: {
                      readOnly: true,
                      disabled: true,
                    },
                  }}
                  aria-readonly
                />
              </Grid>
              <Grid size={1.5} sx={{ minWidth: 120 }}>
                <TextField
                  size="small"
                  id="total-select"
                  value={`${blankCardsCount}`}
                  label="Blank spots"
                  slotProps={{
                    input: {
                      readOnly: true,
                      disabled: true,
                    },
                  }}
                  aria-readonly
                />
              </Grid>
              <Grid>
                <Divider orientation="vertical" />
              </Grid>
              <Grid>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setQuantity({});
                  }}
                >
                  Clear
                </Button>
              </Grid>
              {/* <Grid sx={{ margingRight: 0, marginLeft: "auto" }}>
                <Controls
                  groups={enabledVarieties}
                  setGroups={updateEnabledVarieties}
                />
              </Grid> */}
              <Grid sx={{ margingRight: 0, marginLeft: "auto" }}>
                <ButtonGroup>
                  {/* <Button
                    variant="outlined"
                    onClick={() => {}}
                    endIcon={<Send />}
                  >
                    Send
                  </Button> */}
                  <Button
                    variant="outlined"
                    onClick={() => {
                      localStorage.setItem("saved", JSON.stringify(quantity));
                    }}
                  >
                    Save for later
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      window.print();
                    }}
                    endIcon={<Print />}
                  >
                    Print
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            {accordions.map((name) => {
              const options = data.varieties[name];
              return (
                <Box key={name}>
                  <Accordion
                    expanded={activeName === name}
                    onChange={() => {
                      setActiveName((activeName) =>
                        activeName === name ? "" : name
                      );
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{ flexDirection: "row-reverse" }}
                    >
                      <Grid container spacing={1}>
                        <Grid>
                          <Typography
                            variant="h6"
                            sx={{ whiteSpace: "nowrap" }}
                          >
                            {name}
                            {!!Number(tallies[name]) && ` - ${tallies[name]}`}
                          </Typography>
                        </Grid>
                        {quantity[name] &&
                          Object.entries(quantity[name]).map(
                            ([weight, count]) =>
                              !!count && (
                                <Grid key={`${name}-${weight}-chip`}>
                                  <Chip
                                    label={`${
                                      data.controls.sizes[+weight]
                                    }: ${count}`}
                                    onDelete={() => {
                                      updateQuantity(name, +weight, 0);
                                    }}
                                  />
                                </Grid>
                              )
                          )}
                      </Grid>
                    </AccordionSummary>
                    <AccordionDetails>
                      {activeName === name && (
                        <React.Fragment>
                          <br />
                          <Editor
                            options={options}
                            name={activeName}
                            quantity={quantity}
                            setQuantity={updateQuantity}
                          />
                        </React.Fragment>
                      )}
                    </AccordionDetails>
                  </Accordion>
                  <br />
                </Box>
              );
            })}
          </Container>
        </Box>
      </div>
      <div className="print-labels">
        {!tally && (
          <div className="error-message">
            No labels were selected to print.
            <br />
            Try again?
          </div>
        )}
        {!!tally && (
          <React.Fragment>
            {Object.entries(quantity).map(([name, props]) =>
              Object.entries(props).map(([weight, count]) =>
                Array(count)
                  .fill(1)
                  .map((_, index) => (
                    <CardFront
                      key={`${name}${weight}${index}`}
                      name={name}
                      size={weight}
                    />
                  ))
              )
            )}
            <EmptyCards count={blankCardsCount} />
            {Object.values(quantity).map((props) =>
              Object.values(props).map((count) =>
                Array(count)
                  .fill(1)
                  .map((_, index) => <CardBack key={index} />)
              )
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );

  function updateQuantity(name: Variety, weight: Weight, quantity: Quantity) {
    setQuantity((current) => {
      return { ...current, [name]: { ...current[name], [weight]: quantity } };
    });
  }

  function getAccordions() {
    return enabledVarieties[0] === "all"
      ? Object.keys(data.varieties)
      : enabledVarieties[0] === "none"
      ? []
      : enabledVarieties;
  }

  //   function updateEnabledVarieties(varieties: string[]) {
  //     setEnabledVarieties((current) => {
  //       if (varieties.includes("all") && !current.includes("all")) {
  //         return ["all"];
  //       }
  //       if (varieties.includes("none") && !current.includes("none")) {
  //         return ["none"];
  //       }
  //       return logAndReturn(varieties)
  //         .filter((variety) => variety !== "all")
  //         .filter((variety) => variety !== "none");
  //     });
  //     setQuantity(copyTheseProperties(varieties));
  //   }
}

// function copyTheseProperties(varieties: string[]) {
//   return function copyThesePropertiesFn(currents: Label) {
//     return Object.keys(currents).reduce(copyIncludedProperties, {});
//     function copyIncludedProperties(acc: Label, current: string) {
//       if (varieties.includes(current)) {
//         acc[current] = currents[current];
//       }
//       return acc;
//     }
//   };
// }

function Editor({
  options,
  quantity,
  setQuantity,
  name,
}: {
  options: Rules;
  name: Variety;
  quantity: Label;
  setQuantity: (name: Variety, weight: Weight, quantity: Quantity) => void;
}) {
  return (
    name && (
      <Grid container spacing={5}>
        {Object.entries(
          options === "default"
            ? data.controls.sizes
            : options.sizes || data.controls.sizes
        ).map(([weight, size]) => {
          return (
            <TextField
              key={`${name}-${weight}`}
              size="small"
              label={`${size} - labels`}
              value={quantity[name]?.[+weight] || 0}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setQuantity(name, +weight, +event.target.value);
              }}
              type="number"
              aria-valuemin={0}
              slotProps={{
                htmlInput: {
                  min: 0,
                },
              }}
            />
          );
        })}
      </Grid>
    )
  );
}

type GroupSetter = (group: string | Variety[]) => void;

/* eslint-disable-next-line  @typescript-eslint/no-unused-vars */
function Controls({
  groups,
  setGroups,
}: {
  groups: string | Variety[];
  setGroups: GroupSetter;
}) {
  //   const [anchorEl, setAnchorEl] = React.useState(null);
  //   const open = Boolean(anchorEl);
  const keys = Object.keys(data.varieties);
  return (
    <FormControl size="small" fullWidth sx={{ minWidth: 200 }}>
      <InputLabel id="groupby-label">Varieties</InputLabel>
      <Select
        multiple={true}
        labelId="groupby-label"
        id="groupby-select"
        value={groups}
        label="Group By"
        onChange={(event) => {
          // localStorage.setItem("groups", event.target.value);
          setGroups(event.target.value);
        }}
      >
        <MenuItem value="none">NONE</MenuItem>
        <MenuItem value="all">ALL</MenuItem>
        {keys.map((key: string) => (
          <MenuItem value={key} key={key}>
            {key[0].toLocaleUpperCase()}
            {key.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
