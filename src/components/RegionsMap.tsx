import { FC, useState, SVGProps, CSSProperties } from 'react';
import { IRegion, regionsPathArray } from './regionsArray';

interface RegionsMapProps extends SVGProps<any> {
  defaultFillColor?: string; // color for not selected region
  selectedFillColor?: string; // color for selected region
  selectedStyle?: CSSProperties// string for class name or object for inline style
  handleClick?: (regionId: string) => void // callback for click on region
}

export const RegionsMap: FC<RegionsMapProps> = ({
  defaultFillColor = '#FFFFFF',
  selectedFillColor = '#000000',
  selectedStyle = {},
  handleClick,
  ...props
}) => {
  // state for default selected region 
  const [curRegion, setCurRegion] = useState(regionsPathArray[regionsPathArray.length - 1]);

  const handleClickRegion = (region: IRegion) => {
    setCurRegion(region);
    if(handleClick) handleClick(region.id);
  }

  const renderRegion = (region: IRegion) => {
    const { id, name, path } = region;
    const isCurrentRegion = curRegion.id === region.id;

    return (
        <path
          d={path}
          key={id}
          name={name}
          onClick={ () => handleClickRegion(region) }
          style={ isCurrentRegion ? selectedStyle : {}}
          fill={ isCurrentRegion ? selectedFillColor : defaultFillColor}
        />
    )
  }

  return (
    <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
      {regionsPathArray.map( renderRegion )}
    </svg>
  );
};
