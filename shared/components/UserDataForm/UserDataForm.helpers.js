import * as Crypto from 'expo-crypto';

export const getHashedPassword = async (password) =>
	await Crypto.digestStringAsync(
		Crypto.CryptoDigestAlgorithm.SHA256,
		password
	);
