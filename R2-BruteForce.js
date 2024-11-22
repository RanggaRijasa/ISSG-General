const crypto = require('crypto');

// Target MD5 hash
const targetHash = '5531a5834816222280f20d1ef9e95f69';

function bruteForcePIN() {
    for (let pin = 0; pin <= 9999; pin++) {
        // Format the PIN to ensure it is 4 digits (e.g., 0001)
        const pinString = pin.toString().padStart(4, '0');

        // Generate MD5 hash for the current PIN
        const hash = crypto.createHash('md5').update(pinString).digest('hex');

        // Check if the hash matches the target hash
        if (hash === targetHash) {
            console.log(`Alice's PIN is: ${pinString}`);
            return pinString;
        }
    }

    console.log('PIN not found.');
    return null;
}

// Run the brute force attack
bruteForcePIN();
