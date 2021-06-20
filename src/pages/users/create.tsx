import { Text, Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'

import { Input } from '../../components/Form/Input'
import { Header } from '../../components/Header'
import { Siderbar } from '../../components/Sidebar'

type CreateUserFormData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string
}

const CreateUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'as senhas precisam ser iguais')
})

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(CreateUserFormSchema)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Siderbar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Box>
                <Text mb="2">Nome Completo</Text>
                <Input
                  name="name"
                  error={errors.name}               
                  {...register('name')}  
                />
              </Box>
              <Box>
                <Text mb="2">E-mail</Text>
                <Input
                  name="email"
                  type="email"
                  error={errors.email}               
                  {...register('email')}  
                />
              </Box>
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Box>
                <Text mb="2">Senha</Text>
                <Input
                  name="password"
                  type="password"
                  error={errors.password}               
                  {...register('password')}  
                />
              </Box>
              <Box>
                <Text mb="2">Confirmação de senha</Text>
                <Input
                  name="password_confirmation"
                  type="password" 
                  error={errors.password_confirmation}               
                  {...register('password_confirmation')} 
                />
              </Box>
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>  
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>         
        </Box>
      </Flex> 
    </Box>
  )
}