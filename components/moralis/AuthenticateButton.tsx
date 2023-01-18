import { Button } from '@chakra-ui/react';
import React from 'react';
import { useMoralis } from 'react-moralis';

interface AuthenticateButtonProps {
  onClick: () => void;
}

export const AuthenticateButton = ({ onClick }: AuthenticateButtonProps) => {
  const { user, isAuthenticated } = useMoralis();

  return (
    <Button colorScheme={isAuthenticated ? 'blue' : 'red'} onClick={onClick} border='0px' height='42px' width='90px'>
      {user ? user.getUsername().substring(0, 5)+"..." : 'Auth'}
    </Button>
  );
};
