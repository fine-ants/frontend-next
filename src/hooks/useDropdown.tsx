import { Menu, MenuItem, MenuProps, SxProps } from "@mui/material";
import { ReactNode, SyntheticEvent, useMemo, useState } from "react";

type DropdownMenuProps = {
  sx?: SxProps;
  children: ReactNode;
} & Omit<MenuProps, "open" | "onClose">;

export type DropdownItemProps = {
  sx?: SxProps;
  onClick?: () => void;
  children: ReactNode;
};

export function useDropdown() {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const open = Boolean(anchorElement);

  const onOpen = (event: SyntheticEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const onClose = () => {
    setAnchorElement(null);
  };

  const DropdownMenu = useMemo(() => {
    return function DropdownMenuComponent({
      sx,
      children,
      ...menuProps
    }: DropdownMenuProps) {
      return (
        <Menu
          sx={sx}
          {...menuProps}
          anchorEl={anchorElement}
          open={open}
          onClose={onClose}>
          {children}
        </Menu>
      );
    };
  }, [anchorElement, open, onClose]);

  const DropdownItem = useMemo(() => {
    return function DropdownItemComponent({
      sx,
      onClick,
      children,
    }: DropdownItemProps) {
      const onClickHandler = () => {
        if (onClick) onClick();
        onClose();
      };

      return (
        <MenuItem sx={sx} onClick={onClickHandler}>
          {children}
        </MenuItem>
      );
    };
  }, [onClose]);

  return { isOpen: open, onOpen, onClose, DropdownMenu, DropdownItem };
}
