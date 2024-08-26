import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection, clusterApiUrl } from '@solana/web3.js';

const network = WalletAdapterNetwork.Devnet; // Specify the network as Devnet
const wallets = [new PhantomWalletAdapter()];

// Create a connection to the Solana Devnet
const connection = new Connection(clusterApiUrl(network));

export async function connectWallet() {
    const wallet = wallets[0];
    try {
        await wallet.connect();
        console.log('Wallet connected:', wallet.publicKey.toString());
        document.getElementById("walletAddress").textContent = wallet.publicKey.toString();
        return wallet;
    } catch (error) {
        console.error('Failed to connect wallet:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}
