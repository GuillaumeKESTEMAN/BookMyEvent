import * as Crypto from 'expo-crypto';

export const hash = async (text) =>
	await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA512, text);
