import { Heading, Text, VStack } from "native-base";
import { Header } from "../components/Header";
import Logo from '../assets/logo-copa.svg';
import { Input } from "../components/Input";
import { Button } from "../components/Button";


export function Find() {
    return(
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={5} mx={5} alignItems="center">
                <Logo width={150} height={150}/>
                <Heading fontFamily="heading" color="gray.200" fontSize="xl" textAlign="center">
                Encontre um bolão através do {'\n'}
                seu código
                </Heading>
                <Input 
                    mb={2}
                    mt={8}
                    placeholder="Qual o código do seu bolão?"
                />
                <Button 
                    title="BUSCAR BOLÃO" 
                />
        
            </VStack>

        </VStack>
    );
}