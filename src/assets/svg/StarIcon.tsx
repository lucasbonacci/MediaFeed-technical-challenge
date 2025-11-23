import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/theme';

interface StarIconProps {
  width?: number;
  height?: number;
  isFilled?: boolean;
  filledColor?: string;
  outlineColor?: string;
}

const StarIcon: React.FC<StarIconProps> = ({
  width = 24,
  height = 24,
  isFilled = false,
  filledColor = colors.favorite,
  outlineColor = colors.tabInactive,
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        stroke={isFilled ? filledColor : outlineColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={isFilled ? filledColor : 'none'}
      />
    </Svg>
  );
};

export default StarIcon;
