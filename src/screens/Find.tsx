import { useState } from "react";
import { Heading, Text, VStack, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { api } from "../services/api";

import { Header } from "../components/Header";
import Logo from "../assets/logo-copa.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function Find() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const { navigate } = useNavigation();
  const toast = useToast();

  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: "O código do seu bolão não pode ser vazio.",
          placement: "top",
          bgColor: "red.500",
        });
      }
      setCode("");

      await api.post("/pools/join", { code });
      navigate('pools');

      return toast.show({
        title: "Parabéns! Você entrou para o bolão.",
        placement: "top",
        bgColor: "green.500"
      });

    } catch (err) {
      console.log(err);
      setIsLoading(false);

      if (err.response?.data?.message == "Bolão não encontrado.") {
        return toast.show({
          title: "O Bolão não foi encontrado!",
          placement: "top",
          bgColor: "red.500",
        });
      }

      if (
        err.response?.data?.message == "Você já está participando deste bolão."
      ) {
        return toast.show({
          title: "Você já faz parte deste bolão.",
          placement: "top",
          bgColor: "red.500",
        });
      }
      return toast.show({
        title: "Erro ao tentar encontrar o bolão.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      
    }
  }
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton />

      <VStack mt={5} mx={5} alignItems="center">
        <Logo width={150} height={150} />
        <Heading
          fontFamily="heading"
          color="gray.200"
          fontSize="xl"
          textAlign="center"
        >
          Encontre um bolão através do {"\n"}
          seu código
        </Heading>
        <Input
          mb={2}
          mt={8}
          placeholder="Qual o código do seu bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />
        <Button
          title="BUSCAR BOLÃO"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />
      </VStack>
    </VStack>
  );
}
