import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input } from "@chakra-ui/react";
import React from "react";

const SearchInput = ({ onChange }) => {
  return (
    <Flex w="full" gap="20px">
      <Input
        placeholder="search for a place.."
        bgColor="tripl-new.gray-100"
        focusBorderColor="tripl-new.orange"
        _placeholder={{
          color: "tripl-new.gray-200",
          opacity: "0.7",
        }}
        color="tripl-new.black"
        height="60px"
        borderRadius="100px"
        px="30px"
        onChange={onChange}
        onKeyDown={() => {
          return;
        }}
      />
      <Flex
        justifyContent="center"
        alignItems="center"
        bg="tripl-new.orange"
        p="20px"
        minW="60px"
        borderRadius="full"
        color="tripl-new.light"
      >
        <SearchIcon />
      </Flex>
    </Flex>
  );
};

export default SearchInput;
