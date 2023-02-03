import { FC, useState, SVGProps, CSSProperties } from 'react';
import { regionsPathArray } from './regionsArray';

interface RegionsMapProps extends SVGProps<any> {
  defaultFillColor?: string; // color for not selected region
  selectedFillColor?: string; // color for selected region
  selectedStyle?: CSSProperties | string; // string for class name or object for inline style
  handleClick?: (regionId: string) => void // callback for click on region
}

export const RegionsMap: FC<RegionsMapProps> = ({
  defaultFillColor = '#FFFFFF',
  selectedFillColor = '#000000',
  selectedStyle,
  handleClick,
  ...props
}) => {
    // state for default selected region 
  const [curRegion, setCurRegion] = useState(regionsPathArray[regionsPathArray.length - 1]);

  const isClass = typeof selectedStyle === 'string'; // check if selectedStyle is string for class name

  return (
    <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
      {regionsPathArray.map((region) => (
        <path
          d={region.path}
          className={curRegion.id === region.id ? (isClass ? selectedStyle : "") : ""}
          key={region.id}
          name={region.name}
          onClick={() => {
            setCurRegion(region);
            if(handleClick) handleClick(region.id);
          }}
          fill={curRegion.id === region.id ? selectedFillColor : defaultFillColor}
          style={curRegion.id === region.id ? (!isClass ? selectedStyle : {}) : {}}
        />
      ))}
    </svg>
  );
};
