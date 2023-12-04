import {
  Flex,
  Button,
  HStack,
  Text,
  Box,
  useBoolean,
  VStack,
  StackDivider,
  Divider,
} from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import React from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../hooks/useAuth";
import MyButton from "./MyButton";
import MyProfileMenu from "./MyProfileMenu";
import Logout from "./Logout";

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
        textColor="tripl-new.gray-200"
        // boxShadow="lg"
        borderBottom="2px solid"
        borderColor="tripl.white"
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
                <MyButton variant="outline">Sign In</MyButton>
              </Link>

              <Link to={"/sign-up"}>
                <MyButton>Sign Up</MyButton>
              </Link>
            </>
          )}
          {user !== null && (
            <>
              <MyProfileMenu username={user.name} />
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
          <MobileNav isDrawerOpen={isDrawerOpen} user={user} />
        </Box>
      </Flex>
    </Box>
  );
}

const MobileNav = ({ isDrawerOpen, user }) => {
  return (
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
      alignItems="start"
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
      {user === null ? (
        <>
          <Box as={Link} to={"/sign-in"} w="full" py="10px">
            <MyButton variant="outline">Sign In</MyButton>
          </Box>
          <Divider borderColor="tripl.dark" />
          <Box as={Link} to={"/sign-up"} w="full" py="10px">
            <MyButton>Sign Up</MyButton>
          </Box>
        </>
      ) : (
        <>
          <Link to={"/my-profile"}>
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
              My Profile
            </Button>
          </Link>
          <Divider borderColor="tripl.dark" />
          <Box w="full" pt="10px" pb="5px">
            <Logout />
          </Box>
        </>
      )}
    </VStack>
  );
};
