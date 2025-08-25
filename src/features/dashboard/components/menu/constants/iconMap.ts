import {
  FaHome,
  FaRegFileAlt,
  FaRegEnvelope,
  FaDeezer,
  FaDatabase,
  FaCog,
} from 'react-icons/fa';

export const iconMap = {
  FaHome,
  FaRegFileAlt,
  FaRegEnvelope,
  FaDeezer,
  FaDatabase,
  FaCog,
} as const;

export type IconName = keyof typeof iconMap;
