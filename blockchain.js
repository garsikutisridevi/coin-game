import { Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { connectWallet } from './wallet.js';

// Initialize the connection to the Solana devnet
const connection = new Connection("https://api.devnet.solana.com", 'confirmed');

export async function executeFlip(betAmount, selectedToken, isWin) {
    try {
        const wallet = await connectWallet();
        const userPublicKey = wallet.publicKey;
        const gameWalletPublicKey = new PublicKey('GameWalletAddressHere'); // Replace with your game wallet address

        // Create the transaction
        let transaction = new Transaction();

        // Handle SOL transfers for win/loss
        if (selectedToken === "SOL") {
            const lamports = betAmount * LAMPORTS_PER_SOL;

            if (isWin) {
                // Double the bet amount back to the user
                transaction.add(
                    SystemProgram.transfer({
                        fromPubkey: gameWalletPublicKey,
                        toPubkey: userPublicKey,
                        lamports: lamports,
                    })
                );
            } else {
                // Deduct the bet amount from the user
                transaction.add(
                    SystemProgram.transfer({
                        fromPubkey: userPublicKey,
                        toPubkey: gameWalletPublicKey,
                        lamports: lamports,
                    })
                );
            }
        }

        // Add more logic for other tokens (ETH, BTC) as needed

        // Send the transaction
        const signature = await connection.sendTransaction(transaction, [wallet]);
        console.log('Transaction signature:', signature);

    } catch (error) {
        console.error('Error executing flip:', error);
    }
}