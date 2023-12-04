import React from "react";
import { Flex, Box, Image, Text } from "@chakra-ui/react";


const MemberDescription = ({ imageUrl, name, role }) => {
    return (
      <Flex direction="column" align="center" mb="100">
        <Box
          width="150px"
          height="150px"
          borderRadius="50%"
          overflow="hidden"
          mb="3"
          boxShadow="lg"
        >
          <Image src={imageUrl} alt="Circle Image" w="100%" h="100%" objectFit="cover" />
        </Box>
        <Text>{name}</Text>
        <Text>{role}</Text>
      </Flex>
    );
  };

const AboutUs = () => {
    return (
    <Flex width="full" flexDir="column" minHeight="65vh" height="full" textColor="tripl-new.black">
    <Flex
      justifyContent="center"
      flexDir="column"
      alignItems="center"
      py="50px"
      px={{ base: "20px", md: "50px", xl: "200px" }}
      gap="50px"
    >
    <Text fontSize="50px" fontWeight="bold" color="tripl-new.orange">Tentang Kami</Text>
    <Text 
    fontSize="20px"  textAlign="justify" textColor="tripl-new.black">
    TRIPL  adalah platform yang berkomitmen untuk membantu Anda merencanakan perjalanan tak terlupakan. Dengan kecanggihan teknologi, kami menyediakan beragam informasi tentang destinasi wisata, termasuk restoran, objek wisata, hotel, dan banyak lagi. Selain itu terdapat pula fitur pembuat planner yang inovatif. Dengan planner kami, Anda dapat dengan mudah membuat itinerary perjalanan yang sesuai dengan keinginan Anda. Rangkaian alur perjalanan yang disesuaikan ini akan memastikan bahwa setiap momen perjalanan Anda menjadi pengalaman yang tak terlupakan. Selamat menjelajahi seluruh pelosok Indonesia bersama kami!
    </Text>
    <Text fontSize="50px" fontWeight="bold" color="tripl-new.orange">TRIPL Team Member</Text>
    </Flex>
    <Flex justify="space-around" px={{ base: "20px", md: "50px", xl: "200px" }}>
      <MemberDescription
        imageUrl="/laura.jpg"
        name="Laura Azra Aprilyanti"
        role="QA Engineer"
      />
      <MemberDescription
        imageUrl="nabil.jpg"
        name="M. Nabil Fikri S. Putra"
        role="Backend Developer"
      />
      <MemberDescription
        imageUrl="aulia.jpg"
        name="Aulia Rahmanita"
        role="Frontend Developer"
      />
      <MemberDescription
        imageUrl="anna.jpg"
        name="Anna Safira Dila"
        role="UI/UX Designer"
      />
    </Flex>
    </Flex>
    );
  };
  
  export default AboutUs;
  