import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/logo-copa.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";


export function New() {
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Criar novo bolão" showBackButton />

            <VStack mt={5} mx={5} alignItems="center">
                <Logo width={150} height={150}/>
                <Heading fontFamily="heading" color="gray.200" fontSize="xl" textAlign="center">
                    Crie seu próprio bolão da copa {'\n'}
                    e compartilhe entre amigos!
                </Heading>
                <Input 
                    mb={2}
                    mt={8}
                    placeholder="Insira o nome do seu bolão"
                />
                <Button 
                    title="CRIAR MEU BOLÃO" 
                />
                <Text
                   color="gray.300" fontSize="sm" textAlign="center" px={10} mt={4}
                >
                    Após criar o seu bolão, você receberá um código único 
                    que você poderá usar para convidar outras pessoas.
                </Text>


            </VStack>

        </VStack>
    );
}