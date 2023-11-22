import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

const useAlert = () => {
  const toast = useToast();

  const handleSuccess = useCallback(
    (desc) => {
      toast({
        title: "Success",
        status: "success",
        position: "top",
        isClosable: true,
        description: desc,
        duration: 5000,
      });
    },
    [toast]
  );

  const handleError = useCallback(
    (error) => {
      toast({
        title: "Error",
        status: "error",
        position: "top",
        isClosable: true,
        description: error,
        duration: 5000,
      });
    },
    [toast]
  );

  return { handleSuccess, handleError };
};

export default useAlert;
