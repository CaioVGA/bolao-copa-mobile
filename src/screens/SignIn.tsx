// import { StatusBar } from "expo-status-bar";
import { Center, Text, Icon } from "native-base";
import { Fontisto } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';

import Logo from '../assets/logo-copa.svg';

import { Button } from '../components/Button';

export function SignIn() {
    
  const { signIn, user } = useAuth();

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={200} height={200} />

      <Button 
        title="ENTRAR COM GOOGLE" 
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        type="SECONDARY"
        mt={6}
        onPress={signIn}
      />
      <Text color="gray.200" textAlign="center" mt={4}>
        Não utilizamos nenhuma informação além {'\n'}
        do seu e-mail para criação de sua conta.
      </Text>
    </Center>
  )
} 