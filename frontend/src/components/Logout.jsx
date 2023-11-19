import { Button } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const { logout } = useAuth();
  return (
    <Button
      bgColor="tripl-new.orange"
      color="tripl-new.light"
      transitionDuration="0.2s"
      boxShadow="lg"
      transitionTimingFunction="ease-in-out"
      _hover={{
        transform: "translateY(10%)",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      onClick={() => {
        logout();
      }}
    >
      Logout
    </Button>
  );
};

export default Logout;
