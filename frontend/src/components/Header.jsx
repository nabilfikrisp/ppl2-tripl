import {
  Flex,
  Button,
  HStack,
  Text,
  Box,
  useBoolean,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import Logout from "./Logout";
import MyButton from "./MyButton";

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
  const [isDrawerOpen, setIsDrawerOpen] = useBoolean(false);
  const { user } = useAuth();

  return (
    <Box as="nav" id="header" position="sticky" top="0" left="0" zIndex="99">
      <Flex
        w="100%"
        px="6"
        py="5"
        minHeight="100px"
        align="center"
        justify="space-between"
        backgroundColor="tripl-new.light"
        textColor="tripl.dark"
        boxShadow="lg"
      >
        <Link to="/">
          <Text
            fontWeight="1000"
            color="tripl-new.orange"
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

        <HStack as="nav" spacing="5" display={{ base: "none", md: "flex" }}>
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
          {user === null && (
            <>
              <Link to={"/sign-in"}>
                <MyButton>Sign In</MyButton>
              </Link>

              <Link to={"/sign-up"}>
                <MyButton variant="outline">Sign Up</MyButton>
              </Link>
            </>
          )}
          {user !== null && (
            <>
              <Text fontWeight="700">Hi, {user.name}!</Text>
              <Logout />
            </>
          )}
        </HStack>
        <Box
          display={{ base: "block", md: "none" }}
          height="full"
          position="relative"
        >
          <Box
            _hover={{ cursor: "pointer" }}
            onClick={setIsDrawerOpen.toggle}
            position="relative"
            width={6}
            height={6}
          >
            <HamburgerIcon
              boxSize={6}
              style={{
                position: "absolute",
                zIndex: 1,
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                opacity: isDrawerOpen ? "0" : "1",
                transition: "all .2s",
                visibility: isDrawerOpen ? "hidden" : "visible",
              }}
            />
            <CloseIcon
              boxSize={5}
              style={{
                position: "absolute",
                zIndex: 1,
                top: "0",
                right: "0",
                bottom: "0",
                left: "0",
                opacity: !isDrawerOpen ? "0" : "1",
                transition: "all .2s",
                visibility: !isDrawerOpen ? "hidden" : "visible",
              }}
            />
          </Box>
          <VStack
            style={{
              position: "absolute",
              right: "0",
              top: isDrawerOpen ? "60px" : "-1000px",
              transition: "all .2s",
            }}
            bgColor="tripl-new.light"
            pt={5}
            pb={3}
            px={8}
            width="200px"
            borderBottomRadius={10}
            boxShadow="xl"
            divider={<StackDivider borderColor="tripl.dark" />}
          >
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
            <Link to={"/sign-in"}>
              <Button
                variant="nav"
                transitionDuration="0.2s"
                fontWeight="700"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Login
              </Button>
            </Link>
            <Link to={"/sign-up"}>
              <Button
                variant="nav"
                transitionDuration="0.2s"
                fontWeight="700"
                transitionTimingFunction="ease-in-out"
                _hover={{
                  transform: "translateY(10%)",
                  transitionDuration: "0.2s",
                  transitionTimingFunction: "ease-in-out",
                }}
              >
                Sign Up
              </Button>
            </Link>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
