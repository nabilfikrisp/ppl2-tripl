import { Flex, Button, HStack, chakra, Text } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import React from "react";

const data = [
  {
    label: "Explore",
    href: "/explore",
  },
  {
    label: "Planner",
    href: "/planner",
  },
];

export default function Header() {
  return (
    <chakra.header id="header">
      <Flex
        w="100%"
        px="6"
        py="5"
        minHeight="100px"
        align="center"
        justify="space-between"
        backgroundColor="tripl.green-200"
        textColor="tripl.dark"
        boxShadow="lg"
      >
        <Link to="/">
          <Text
            fontWeight="1000"
            color="tripl.dark"
            fontSize="32px"
            transitionDuration="0.2s"
            transitionTimingFunction="ease-in-out"
            _hover={{
              transform: "translateY(10%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            TRIPL
          </Text>
        </Link>

        <HStack as="nav" spacing="5">
          {data.map((item, i) => (
            <NavLink key={i} to={item.href}>
              <Button
                variant="nav"
                fontWeight="700"
                transitionDuration="0.2s"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                {item.label}
              </Button>
            </NavLink>
          ))}
          <Button
            bgColor="tripl.dark"
            color="tripl.light"
            transitionDuration="0.2s"
            boxShadow="lg"
            transitionTimingFunction="ease-in-out"
            _hover={{
              transform: "translateY(10%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            Sign In
          </Button>
          <Button
            bgColor="tripl.green-100"
            color="tripl.dark"
            boxShadow="lg"
            transitionDuration="0.2s"
            transitionTimingFunction="ease-in-out"
            _hover={{
              transform: "translateY(10%)",
              transitionDuration: "0.2s",
              transitionTimingFunction: "ease-in-out",
            }}
          >
            Sign Up
          </Button>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
