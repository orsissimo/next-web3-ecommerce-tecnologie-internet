import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  VStack,
  Box,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';
import { useMoralis } from 'react-moralis';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectModal = ({ isOpen, onClose }: ConnectModalProps) => {
  const {
    enableWeb3,
    isWeb3Enabled,
    web3EnableError,
    isWeb3EnableLoading,
    deactivateWeb3,
    account,
    chainId,
    connectorType,
    network,
  } = useMoralis();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Connected Network</ModalHeader>
        <ModalCloseButton border='0px'/>
        <ModalBody>
          <VStack alignItems="stretch">
            {isWeb3Enabled && (
              <Box>
                Current Connection:
                <UnorderedList>
                  <ListItem>Account: {account}</ListItem>
                  <ListItem>Chain: {chainId}</ListItem>
                  <ListItem>ConnectorType: {connectorType}</ListItem>
                  <ListItem>Network: {network}</ListItem>
                </UnorderedList>
                <br></br>
              </Box>
            )}
            {web3EnableError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Error: {web3EnableError.name}</AlertTitle>
                <AlertDescription>{web3EnableError.message}</AlertDescription>
              </Alert>
            )}
            <Button onClick={() => enableWeb3({ provider: 'metamask' }).then(onClose)} disabled={isWeb3EnableLoading} border='0px'>
              Metamask
            </Button>
            {isWeb3Enabled && (
              <Button onClick={deactivateWeb3} color="red" disabled={isWeb3EnableLoading} border='0px'>
                Disconnect
              </Button>
            )}
            <br/>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
