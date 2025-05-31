import React, { useState, type ReactNode } from "react";
import { data, type Rules, type SizeList, type Variety } from "./Data";
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
  Checkbox,
  Chip,
  Container,
  Divider,
  Drawer,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemText,
  Menu,
  Modal,
  Snackbar,
  SnackbarContent,
  Stack,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import MenuIcon from "@mui/icons-material/Menu";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { AddIcCallOutlined, MenuOpen } from "@mui/icons-material";

// import MiniCard from "./MiniCard";

const defaultRules = {
  sizes: data.controls.sizes,
  isLocal: true,
};

const drawerWidth = 240;

const CARDS_PER_PAGE = 10;

function logAndReturn(value) {
  console.trace(value);
  return value;
}

type Variety = string;
type Quantity = number;
type Weight = number;
type Label = {
  [name: Variety]: {
    [weight: Weight]: Quantity;
  };
};
type VarietyTally = { [name: Variety]: Quantity };
type TallyCollection = { tally: Quantity; tallies: VarietyTally };

export default function App() {
  const [quantity, setQuantity] = useState<Label>({});
  const [activeVarieties, setActiveVarieties] = useState<string[]>([]);
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
  const remainder = tally % CARDS_PER_PAGE;
  const blankCardsCount = tally
    ? remainder && CARDS_PER_PAGE - remainder
    : CARDS_PER_PAGE;
  const totalPages = Math.ceil(tally / CARDS_PER_PAGE);

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
              <Grid sx={{ margingRight: 0, marginLeft: "auto" }}>
                <Controls
                  groups={activeVarieties}
                  setGroups={(varieties: string[]) => {
                    setActiveVarieties(varieties);
                    setQuantity(copyTheseProperties(varieties));
                  }}
                />
              </Grid>
            </Grid>
            <br />
            <Divider />
            <br />
            {activeVarieties.map((name) => {
              // (group, groupIndex) => {
              const options = data.varieties[name];
              return (
                <Box key={name}>
                  <Typography variant="h6">
                    {name} - {tallies[name]}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {quantity[name] &&
                      Object.entries(quantity[name]).map(
                        ([weight, count]) =>
                          !!count && (
                            <Chip
                              key={`${name}-${weight}-chip`}
                              label={`${data.controls.sizes[weight]}: ${count}`}
                              onDelete={() => {
                                updateQuantity(name, weight, 0);
                              }}
                            />
                          )
                      )}
                    <Chip sx={{ visibility: "hidden" }} />
                  </Stack>

                  <Box sx={{ height: 15 }} />

                  <Grid container spacing={5}>
                    {Object.entries(options?.sizes || data.controls.sizes).map(
                      ([weight, size]) => {
                        return (
                          <Stack key={`${name}-${weight}`}>
                            <Container
                              sx={{
                                boxShadow: (theme) => theme.shadows[3],
                              }}
                            >
                              <br />
                              <Typography>{size}</Typography>
                              <br />
                              <Stack>
                                <TextField
                                  size="small"
                                  label="How many?"
                                  value={quantity[name]?.[weight] || 0}
                                  onChange={(
                                    event: React.ChangeEvent<HTMLInputElement>
                                  ) => {
                                    setQuantity((currentQuantity) => ({
                                      ...currentQuantity,
                                      [name]: {
                                        ...currentQuantity[name],
                                        [weight]: +event.target.value,
                                      },
                                    }));
                                  }}
                                  type="number"
                                  aria-valuemin={0}
                                  slotProps={{
                                    htmlInput: {
                                      min: 0,
                                    },
                                  }}
                                />
                              </Stack>
                              <br />
                            </Container>
                          </Stack>
                        );
                      }
                    )}
                  </Grid>
                  <br />
                  <Divider />
                  <br />
                </Box>
              );
            })}
            <br />
            <br />
            <br />
            <br />
          </Container>
        </Box>
      </div>
    </div>
  );

  function updateQuantity(name: Variety, weight: Weight, quantity: Quantity) {
    setQuantity((current) => {
      return { ...current, [name]: { ...current[name], [weight]: quantity } };
    });
  }
}

function copyTheseProperties(varieties: string[]) {
  return function copyThesePropertiesFn(currents: Label) {
    return Object.keys(currents).reduce(copyIncludedProperties, {});
    function copyIncludedProperties(acc: Label, current: string) {
      if (varieties.includes(current)) {
        acc[current] = currents[current];
      }
      return acc;
    }
  };
}

function Controls({ groups, setGroups }) {
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
        onChange={(event: SelectChangeEvent) => {
          // localStorage.setItem("groups", event.target.value);
          if (event.target.value.includes("")) {
            setGroups([]);
          } else if (event.target.value.includes("all")) {
            setGroups(keys);
          } else {
            setGroups(event.target.value);
          }
        }}
      >
        <MenuItem value="">NONE</MenuItem>
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
