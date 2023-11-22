import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import Logout from "./Logout";

const MyProfileMenu = ({ username }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight="700"
        bg="transparent"
        _active={{ bg: "transparent" }}
        _hover={{ bg: "transparent" }}
      >
        Hi, {username}!
      </MenuButton>
      <MenuList>
        <MenuItem>My Profile</MenuItem>
        <MenuDivider />
        <MenuItem>
          <Logout />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MyProfileMenu;
