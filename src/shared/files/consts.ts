import type { Flag, Icons, UI } from '@/stories/components/Icon/types';

export const PROJECT_DOMAIN = 'design-system';

export const UIIcons: UI[] = [
  'ArrowDown',
  'Calendar',
  'CheckCircle',
  'Close',
  'Eye',
  'EyeClosed',
  'Home',
  'Info',
  'Key',
  'Loading',
  'Telephone',
  'Warning',
];

export const FlagIcons: Flag[] = ['Brazil', 'Portugal', 'UnitedStates'];

export const ICONS: Icons[] = [...UIIcons, ...FlagIcons];
