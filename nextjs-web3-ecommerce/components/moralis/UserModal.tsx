import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Divider,
  VStack,
} from '@chakra-ui/react';
import Moralis from 'moralis-v1/types';
import React, { useState } from 'react';
import { useMoralis } from 'react-moralis';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: Moralis.User;
}

const UserModal = ({ isOpen, onClose, user }: UserModalProps) => {
  const { logout, isLoggingOut, setUserData, isUserUpdating } = useMoralis();

  const [newUserName, setNewUsername] = useState(user.getUsername());
  const [newEmail, setNewEmail] = useState(user.getEmail());

  const handleSaveUserData = async (event: React.FormEvent) => {
    event.preventDefault();
    await setUserData({
      username: newUserName,
      email: newEmail,
    });
  };

  if (!user) {
    // TODO: handle edge-case if this ever happens
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{user.getUsername()}</ModalHeader>
        <ModalCloseButton border='0px'/>
        <ModalBody>
          <VStack divider={<Divider />}>
            <form style={{ width: '100%' }} onSubmit={handleSaveUserData}>
              <VStack>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" value={newUserName} onChange={(event) => setNewUsername(event.target.value)} />
                </FormControl>
                <Button isLoading={isUserUpdating} type="submit" width="full" colorScheme="green"  border='0px'>
                  Update profile data
                </Button>
              </VStack>
            </form>

            <Button onClick={() => logout().then(onClose)} disabled={isLoggingOut} colorScheme="red" width="full"  border='0px'>
              Logout
            </Button>

            <ButtonGroup alignSelf="flex-end">
              <Button onClick={onClose} disabled={isLoggingOut} border='0px'>
                Close
              </Button>
            </ButtonGroup>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
