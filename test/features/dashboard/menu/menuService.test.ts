/**
 * @jest-environment jsdom
 */

import { menuService } from '@/features/dashboard/components/menu/services/menuService';
import { MenuItemProps } from '@/shared/types/dashboard/menu.type';

describe('menuService (AAA)', () => {
  const items: MenuItemProps[] = [
    { label: 'home', path: '/', iconName: 'FaHome', isDropDownItem: false, roles: ['user', 'admin'] },
    { label: 'settings', path: '/settings', iconName: 'FaCog', isDropDownItem: false, roles: ['admin'] },
    { label: 'profile', path: '/profile', iconName: 'FaRegFileAlt', isDropDownItem: true, roles: ['user', 'admin'] },
    { label: 'admin', path: '/admin', iconName: 'FaRegFileAlt', isDropDownItem: true, roles: ['admin'] },
  ];

  it('filterItemsByRole returns only items allowed for role (AAA)', () => {
    // Arrange
    const role = 'user';

    // Act
    const result = menuService.filterItemsByRole(items, role);

    // Assert
    expect(result.map((i) => i.label)).toEqual(['home', 'profile']);
  });

  it('getDropdownItems returns only dropdown items (AAA)', () => {
    // Arrange
    // Act
    const result = menuService.getDropdownItems(items);

    // Assert
    expect(result.map((i) => i.label)).toEqual(['profile', 'admin']);
  });

  it('getMainMenuItems returns only non-dropdown items (AAA)', () => {
    // Arrange
    // Act
    const result = menuService.getMainMenuItems(items);

    // Assert
    expect(result.map((i) => i.label)).toEqual(['home', 'settings']);
  });
});


