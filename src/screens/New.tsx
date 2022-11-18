import { useState } from "react";
import { Heading, Text, useToast, VStack } from "native-base";

import { Header } from "../components/Header";
import Logo from "../assets/logo-copa.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api } from "../services/api";

export function New() {
  const [title, setTitle] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "O nome do bolão é obrigatório!",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);
      
      await api.post('/pools', { title })

      return toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      setTitle('');

    } catch (err) {
      console.log(err);

      return toast.show({
        title: "Não foi possível criar o bolão",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Criar novo bolão" showBackButton />

      <VStack mt={5} mx={5} alignItems="center">
        <Logo width={150} height={150} />
        <Heading
          fontFamily="heading"
          color="gray.200"
          fontSize="xl"
          textAlign="center"
        >
          Crie seu próprio bolão da copa {"\n"}e compartilhe entre amigos!
        </Heading>
        <Input
          mb={2}
          mt={8}
          placeholder="Insira o nome do seu bolão"
          onChangeText={setTitle}
          value={title}
        />
        <Button
          title="CRIAR MEU BOLÃO"
          onPress={handlePoolCreate}
          isLoading={isLoading}
        />
        <Text color="gray.300" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar o seu bolão, você receberá um código único que você poderá
          usar para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
