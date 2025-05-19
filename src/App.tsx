import { useState, type ReactElement } from 'react'
import { data, type Rules, type SizeList } from './Data'



const defaultRules = {
  sizes: data.controls.sizes,
  isLocal: true
}

function App() {
  const [name , setName] = useState("")
  const controls: null | Rules = name ? data.varieties[name] : null
  const isDefault = controls === 'default'
  const rules = isDefault ? defaultRules : controls;
  const sizes: SizeList = rules?.sizes ?? defaultRules.sizes;
  return (
    <div>
      Create a card
      <form>
      <select title="Selector" onChange={({target}) => {setName(target.value)}}>
        <option></option>
        {Object.entries(data.varieties).map(([ name ]) => <option value={name} key={name}>{name}</option> )}
      </select>
      {controls && <Controls sizes={sizes} name={name} />}
      {rules?.isLocal && <input type="hidden" value="isLocal" />}
      </form>
    </div>
  )
}

type ControlsProps = {
  name: string;
  sizes: SizeList;
}

function Controls({ name, sizes }: ControlsProps): ReactElement {
  return <>
    {/* {Object.entries(theseRules).map(([rule, options]) => typeof options === 'boolean' ? <label>{rule}<input id={rule} type="checkbox" readonly/></label> : <select title={`${name} ${rule}`} key={`${name}${rule}`}>
      {Object.entries(options).map(([option, _display]) => <option key={option}>a</option>)}
    </select>)} */}
    <select title={`${name} sizes`}>
      {Object.entries(sizes).map(([weight, size]) => <option key={weight}>{size}</option>)}
    </select>
    <br/>
    <label>Labels to print:<input type="number" min="1" defaultValue={1}/></label>
  </>
}

export default App
