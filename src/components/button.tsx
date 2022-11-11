import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base';


interface Props extends IButtonProps {
    title: string;
    type?: 'PRIMARY' | 'SECONDARY';
}


export function Button({ title, type='PRIMARY', ...rest }: Props) {
    return (
        <ButtonNativeBase 
            w="full"
            h={14}
            rounded="sm"
            fontSize="md"
            textTransform="uppercase"
            bg={type === 'SECONDARY' ? 'red.500' : 'red.300'}
            _pressed={{
                bg:type === 'SECONDARY' ? 'red.600' : 'red.700'
            }}
            _loading={{
                _spinner: { color:'white' }
            }}

            {...rest}
        >
            <Text
                fontSize="sm"
                fontFamily="heading"
                color={type === 'SECONDARY' ? 'white' : 'gray.100'}

            >
                {title}
            </Text>
        </ButtonNativeBase>
    );
}