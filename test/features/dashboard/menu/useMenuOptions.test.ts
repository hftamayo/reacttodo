/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';

import { useMenuOptions } from '@/features/dashboard/components/menu/hooks/useMenuOptions';
import { MenuItemProps } from '@/shared/types/dashboard/menu.type';

// Test component to consume the hook output without testing-library hooks
const HookConsumer: React.FC<{ role: string }>
  = ({ role }) => {
  const { dropdownItems, mainMenuItems } = useMenuOptions(role);
  return React.createElement('pre', {}, JSON.stringify({ dropdownItems, mainMenuItems }));
};

// Mocks
const mockDropdownItems: MenuItemProps[] = [
  { path: '/a', label: 'roles', iconName: 'FaRegFileAlt', roles: ['admin'], isDropDownItem: true },
  { path: '/b', label: 'users', iconName: 'FaRegFileAlt', roles: ['admin', 'user'], isDropDownItem: true },
];

const mockMainItems: MenuItemProps[] = [
  { path: '/', label: 'home', iconName: 'FaHome', roles: ['admin', 'user'] },
  { path: '/inbox', label: 'inbox', iconName: 'FaRegEnvelope', roles: ['user'] },
];

jest.mock('@/shared/services/redux/hooks/useAppSelector', () => ({
  useAppSelector: (selector: any) => {
    // Simulate combined items the selectors will filter
    const items = [...mockDropdownItems, ...mockMainItems];
    return selector({ menu: { items } });
  },
}));

jest.mock('@/shared/services/redux/hooks/useTranslation', () => ({
  useTranslation: (key: string) => {
    if (key === 'sideBarDashboard') {
      return {
        group: {
          roles: 'Roles',
          users: 'Users',
          home: 'Home',
          inbox: 'Inbox',
        },
      } as any;
    }
    return { text: '' } as any;
  },
}));

jest.mock('@/features/dashboard/components/menu/services/menuService', () => ({
  menuService: {
    filterItemsByRole: (items: MenuItemProps[], role: string) =>
      items.filter((i) => i.roles.includes(role)),
  },
}));

describe('useMenuOptions (AAA)', () => {
  it('returns translated and role-filtered dropdown and main items (AAA)', () => {
    // Arrange
    const role = 'user';

    // Act
    render(React.createElement(HookConsumer, { role }));

    // Assert
    const payload = JSON.parse(screen.getByText(/\{/).textContent || '{}');
    expect(payload.dropdownItems.map((i: any) => i.label)).toEqual(['Users']);
    expect(payload.mainMenuItems.map((i: any) => i.label)).toEqual(['Home', 'Inbox']);
  });

  it.skip('returns empty arrays when translation group is missing (AAA)', () => {
    // Arrange
    jest.resetModules();
    jest.doMock('@/shared/services/redux/hooks/useTranslation', () => ({
      useTranslation: () => ({ group: undefined }),
    }));
    jest.doMock('@/shared/services/redux/hooks/useAppSelector', () => ({
      useAppSelector: (selector: any) => selector({ menu: { items: [...mockDropdownItems, ...mockMainItems] } }),
    }));

    let Test: React.FC;
    jest.isolateModules(() => {
      const { useMenuOptions: useMenuOptionsReloaded } = require('@/features/dashboard/components/menu/hooks/useMenuOptions');
      Test = () => {
        const { dropdownItems, mainMenuItems } = useMenuOptionsReloaded('user');
        return React.createElement('pre', {}, JSON.stringify({ dropdownItems, mainMenuItems }));
      };
    });

    // Act
    render(React.createElement(Test!));

    // Assert
    const payload = JSON.parse(screen.getByText(/\{/).textContent || '{}');
    expect(payload.dropdownItems).toEqual([]);
    expect(payload.mainMenuItems).toEqual([]);
  });
});


