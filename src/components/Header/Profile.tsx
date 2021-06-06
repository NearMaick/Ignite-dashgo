import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      { showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Maick Souza</Text>
          <Text color="gray.300" fontSize="small">
            maick_a_s@msn.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Maick Souza" src="https://github.com/NearMaick.png" />
    </Flex>
  )
}