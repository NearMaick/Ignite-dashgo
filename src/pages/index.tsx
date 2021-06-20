import { Text, Button, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from '../components/Form/Input'

type SignInFormData = {
  email: string;
  password: string
}

const signInFormData = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
})

export default function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormData)
  })

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(values)
  }

  const { errors } = formState

  return (
      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
      >
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >

          <Stack spacing="4">
            <Text >E-mail</Text>
            <Input 
              name="email" 
              type="email"
              error={errors.email}               
              {...register('email')} 
            />
            <Text >Senha</Text>
            <Input 
              name="password" 
              type="password"
              error={errors.password}               
              {...register('password')} 
            />
          </Stack>          

          <Button
            type="submit"
            mt="6"
            colorScheme="pink"
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
  )
}
