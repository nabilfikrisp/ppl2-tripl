import { useToast } from "@chakra-ui/react";

const useAlert = () => {
  const toast = useToast();

  const handleSuccess = (desc) => {
    toast({
      title: `Success`,
      status: "success",
      position: "top",
      isClosable: true,
      description: desc,
      duration: 5000,
    });
  };

  const handleError = (error) => {
    toast({
      title: `Error`,
      status: "error",
      position: "top",
      isClosable: true,
      description: error,
      duration: 5000,
    });
  };
  return { handleSuccess, handleError };
};

export default useAlert;
