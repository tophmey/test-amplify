import { useState } from "react";
import { data, type Rules, type SizeList } from "./Data";
import Card from "./Card";

const defaultRules = {
  sizes: data.controls.sizes,
  isLocal: true,
};

function App() {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const controls: null | Rules = name ? data.varieties[name] : null;
  const isDefault = controls === "default";
  const rules = isDefault ? defaultRules : controls;
  const sizes: SizeList = rules?.sizes ?? defaultRules.sizes;
  return (
    <div>
      Create a card
      <form>
        <select
          title="Selector"
          onChange={({ target }) => {
            setName(target.value);
          }}
        >
          <option></option>
          {Object.entries(data.varieties).map(([name]) => (
            <option value={name} key={name}>
              {name}
            </option>
          ))}
        </select>
        {controls && (
          <>
            <select
              title={`${name} sizes`}
              onChange={({ target }) => {
                setSize(target.value);
              }}
            >
              <option></option>
              {Object.entries(sizes).map(([weight, size]) => (
                <option key={weight}>{size}</option>
              ))}
            </select>
            <br />
            <label>
              Labels to print:
              <input type="number" min="1" defaultValue={1} />
            </label>
          </>
        )}
        {rules?.isLocal && <input type="hidden" value="isLocal" />}
      </form>
      {controls && size && <Card name="" size="" />}
    </div>
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

export default App;

// const { Magick } = await ImageMagick;

// console.log({ Magick });

/*
  magick \
    woh-logo.png -gravity Center -extent 1050x600 -background Transparent \
    \( -page +24+24 -pointsize 30 -interline-spacing 24 -font Times-New-Roman-Bold label:"Raw {Local} Honey\n{flavor}" \) \
    \( -page +24+439 -pointsize 24 -interline-spacing 12 -font Times-New-Roman \
        -gravity Southwest label:"World O' Honey, Inc.\nBox 177\nSilverdale, PA 18962\nworldohoney.com" \) \
    \( -page +0+12 -size 1050x30 -gravity Center -pointsize 24 -interline-spacing 12 -font Times-New-Roman \
        label:"Packaged By" \) \
    \( -page -24+564 -size 1050x24 -pointsize 24 -font Times-New-Roman \
        -gravity Southeast label:"Licensed by PA Dept of Ag." \) \
    \( -page -24+30 -pointsize 24 -interline-spacing 12 -font Times-New-Roman-Bold \
        -gravity Northeast label:"Net Wt. {size}" \) \
    -layers flatten new.png

*/
