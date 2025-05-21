import {
  FaHome,
  FaRegFileAlt,
  FaRegEnvelope,
  FaDeezer,
  FaDatabase,
} from 'react-icons/fa';

export const iconMap = {
  FaHome,
  FaRegFileAlt,
  FaRegEnvelope,
  FaDeezer,
  FaDatabase,
} as const;

export type IconName = keyof typeof iconMap; 