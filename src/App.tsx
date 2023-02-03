import { useState } from "react";
import { RegionsMap } from "./components/RegionsMap";
import { IRegion, regionsPathArray } from "./components/regionsArray";

function App() {
  const [region, setRegion] = useState<IRegion>()

  const handleClickRegion = (regionId: string) => {
    // any action with selected region
    const selectedRegion = regionsPathArray.filter((region) => region.id === regionId)[0];
    setRegion(selectedRegion)
  }

  return (
    <div className="App">
      <div className="mapBox">
        <RegionsMap 
          width={'100%'}
          selectedFillColor="#3B6CF8"
          strokeLinecap="round"
          strokeWidth="2"
          viewBox="0 0 1000 700"
          stroke="#CFCFCF"
          selectedStyle={{
            filter: 'drop-shadow(0px 34px 22px rgba(35, 67, 116, 0.25))',
            transition: '400ms linear',
          }}
          handleClick={handleClickRegion}
        />
        <div>
          <p>{ region && region.name }</p>
        </div>
      </div>
    </div>
  );
}

export default App;
