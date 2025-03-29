import React from 'react';
import styled from 'styled-components/native';
import {
  Activity, 
  // Sire, 
  CheckCircle, 
  Check, 
  AlertTriangle, 
  MinusCircle, 
  // Flame,
  Droplet, 
  Image, 
  Plus, 
  PlusCircle, 
  BarChart2, 
  // Component, 
  // SatelliteDish, 
  // Timer,
  User, 
  // BarChart3, 
  Radio, 
  Disc, 
  // HeartPulse, 
  // Hourglass, 
  ArrowLeft, 
  // Waves,
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  // Pen, 
  Trash, 
  Save, 
  X, 
  Eye, 
  CheckSquare
} from 'react-native-feather';

import Siren from '../../assets/icons/siren.svg';

const iconMap = {
  activity: Activity,
  siren: Siren,
  'check-circled': CheckCircle,
  'check-icon': Check,
  'alert-triangle': AlertTriangle,
  'minus-circled': MinusCircle,
  // flame: Flame,
  droplet: Droplet,
  image: Image,
  plus: Plus,
  'plus-circled': PlusCircle,
  'bar-chart': BarChart2,
  // component: Component,
  // 'satellite-dish': SatelliteDish,
  // timer: Timer,
  user: User,
  // 'bar-chart-big': BarChart3,
  radio: Radio,
  'disc-3': Disc,
  // 'heart-pulse': HeartPulse,
  // hourglass: Hourglass,
  'arrow-left': ArrowLeft,
  // waves: Waves,
  banda: Filter,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  // pen: Pen,
  trash: Trash,
  save: Save,
  close: X,
  eye: Eye,
  checkbox: CheckSquare,
};

const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

const DynamicIcon = ({ iconName, size = 24, color = '#000' }) => {
  const IconComponent = iconMap[iconName];
  return (
    <IconWrapper>
      {IconComponent ? <IconComponent width={size} height={size} color={color} /> : null}
    </IconWrapper>
  );
};

export const getAvailableIcons = () => Object.keys(iconMap);

export default DynamicIcon;