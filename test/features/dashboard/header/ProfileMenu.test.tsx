/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ProfileMenu } from '@/features/dashboard/components/header/components/ProfileMenu';

jest.mock('@/shared/services/redux/hooks/useTranslation', () => ({
  useTranslation: (key: string) => {
    if (key === 'dropDownHeaderBar') {
      return {
        group: {
          profile: 'Profile',
          settings: 'Settings',
          logout: 'Logout',
        },
      } as any;
    }
    return { text: '' } as any;
  },
}));

const openModal = jest.fn();
jest.mock('@/shared/services/redux/hooks/useModalState', () => ({
  useModalState: () => ({ openModal }),
}));

// Mock Dropdown primitives to render minimal clickable structure
jest.mock('@/shared/components/ui/menu/DropDownMenu', () => ({
  DropdownMenu: ({ children }: any) => React.createElement('div', {}, children),
  DropdownMenuTrigger: ({ children }: any) => React.createElement('div', {}, children),
  DropdownMenuContent: ({ children }: any) => React.createElement('div', {}, children),
  DropdownMenuGroup: ({ children }: any) => React.createElement('div', {}, children),
  DropdownMenuSeparator: () => React.createElement('div', {}),
  DropdownMenuItem: ({ onSelect, children }: any) =>
    React.createElement('button', { onClick: onSelect }, children),
}));

describe('ProfileMenu (AAA)', () => {
  beforeEach(() => {
    openModal.mockClear();
  });

  it('opens appropriate modals for each menu item (AAA)', async () => {
    // Arrange
    render(React.createElement(ProfileMenu));

    // Act
    await userEvent.click(screen.getByText('Profile'));
    await userEvent.click(screen.getByText('Settings'));
    await userEvent.click(screen.getByText('Logout'));

    // Assert
    expect(openModal).toHaveBeenCalledWith('profile');
    expect(openModal).toHaveBeenCalledWith('settings');
    expect(openModal).toHaveBeenCalledWith('logout', { title: 'Confirm Logout' });
  });
});


