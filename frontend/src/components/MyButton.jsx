import { Button } from "@chakra-ui/react";
import React from "react";

const MyButton = ({
  variant,
  children,
  onClick,
  mt,
  width = "full",
  isDisabled = false,
  size = "md",
  isLoading = false,
  type = "button",
}) => {
  const isOutline = variant === "outline";

  return (
    <Button
      border={isOutline ? "1px solid" : ""}
      bgColor={isOutline ? "tripl-new.light" : "tripl-new.orange"}
      color={isOutline ? "tripl-new.orange" : "tripl-new.light"}
      transitionDuration="0.2s"
      boxShadow="lg"
      mt={mt ? mt : ""}
      width={width}
      transitionTimingFunction="ease-in-out"
      _hover={{
        transform: "translateY(10%)",
        transitionDuration: "0.2s",
        transitionTimingFunction: "ease-in-out",
      }}
      onClick={onClick}
      isDisabled={isDisabled}
      size={size}
      type={type}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
};

export default MyButton;
