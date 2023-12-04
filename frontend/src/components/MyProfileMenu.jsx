import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const MyProfileMenu = ({ username }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        fontWeight="700"
        textColor="tripl-new.gray-200"
        bg="transparent"
        _active={{ bg: "transparent" }}
        _hover={{ bg: "transparent" }}
      >
        Hi, {username}!
      </MenuButton>
      <MenuList>
        <MenuItem fontWeight="600" as={Link} to="/my-profile">
          My Profile
        </MenuItem>
        <MenuDivider />
        <MenuItem as={Box}>
          <Logout />
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default MyProfileMenu;
