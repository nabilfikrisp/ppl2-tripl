import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const FAQDescription = ({ question, answer }) => {
  return (
    <Flex direction="column" textColor="tripl-new.black">
      <Text fontSize="25px" fontWeight="bold" textAlign="justify">
        {question}
      </Text>
      <Text fontSize="20px" textAlign="justify">
        {answer}
      </Text>
    </Flex>
  );
};

const Faq = () => {
  return (
    <Flex width="full" flexDir="column" minHeight="65vh" height="full">
      <Flex
        justifyContent="center"
        flexDir="column"
        alignItems="center"
        py="50px"
        px={{ base: "20px", md: "50px", xl: "200px" }}
        gap="50px"
      >
        <Text fontSize="50px" fontWeight="bold" color="tripl-new.orange">
          Frequently Asked Question (FAQ)
        </Text>
        <FAQDescription
          question="1. Apa itu TRIPL?"
          answer="TRIPL adalah aplikasi website yang dirancang untuk membantu Anda merencanakan perjalanan Anda dengan mudah. Anda dapat menemukan informasi tentang destinasi wisata, akomodasi, kontak, dan aktivitas di satu tempat."
        />
        <FAQDescription
          question="2. Bagaimana cara menggunakan TRIPL?"
          answer="Cukup buka situs web kami dan masukkan detail perjalanan Anda, seperti tujuan, tanggal perjalanan, dan preferensi pribadi. Trip Planner akan menawarkan rekomendasi yang sesuai dengan kebutuhan Anda."
        />
        <FAQDescription
          question="3. Bisakah saya menyimpan rencana perjalanan saya?"
          answer="Ya, Anda dapat membuat akun di TRIPL kami dan menyimpan rencana perjalanan Anda. Ini memungkinkan Anda mengaksesnya kapan saja dan memodifikasinya."
        />
        <FAQDescription
          question="4. Apakah informasi harga sudah termasuk dalam TRIPL?"
          answer="Untuk saat ini kami tidak menyediakan informasi umum tentang harga, tetapi untuk harga yang akurat, kami merekomendasikan untuk mengunjungi situs web resmi penyedia layanan, seperti hotel atau rumah makan."
        />
        <FAQDescription
          question="5. Apakah TRIPL menyertakan rencana perjalanan lintas negara?"
          answer="Untuk saat ini kami tidak dapat membantu Anda merencanakan perjalanan lintas negara dengan menyediakan informasi tentang transportasi internasional, akomodasi, dan tempat wisata di berbagai negara."
        />
        <FAQDescription
          question="6. Apakah ada biaya untuk menggunakan TRIPL?"
          answer="Tidak, penggunaan TRIPL pada situs web kami bersifat gratis. Anda hanya perlu membayar langsung untuk layanan atau produk yang Anda pilih selama perjalanan Anda."
        />
        <FAQDescription
          question="7. Apakah TRIPL memiliki aplikasi seluler?"
          answer="Untuk saat ini kami belum memiliki aplikasi seluler resmi. Namun, situs web kami dirancang untuk responsif dan dapat diakses melalui perangkat seluler."
        />
      </Flex>
    </Flex>
  );
};

export default Faq;
