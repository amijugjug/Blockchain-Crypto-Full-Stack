import EC from "elliptic/ec";

const ec = new EC();

/**
 * This library is used to generate public and private keys, it also has methods to sign the data and verify the signature over data.
 */
export const generateKeys = () => {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic("hex");
  const privateKey = key.getPrivate("hex");

  return {
    publicKey,
    privateKey,
  };
};
