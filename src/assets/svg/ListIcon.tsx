import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ListIconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ListIcon: React.FC<ListIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ListIcon;

