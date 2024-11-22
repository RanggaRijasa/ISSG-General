const fs = require('fs');
const https = require('https');
const crypto = require('crypto');

// Target MD5 hash
const targetHash = '578ed5a4eecf5a15803abdc49f6152d6';

// Function to perform dictionary attack
function dictionaryAttack(wordlist) {
    for (const password of wordlist) {
        // Generate MD5 hash for the current password
        const hash = crypto.createHash('md5').update(password).digest('hex');

        // Check if the hash matches the target hash
        if (hash === targetHash) {
            console.log(`Bob's password is: ${password}`);
            return password;
        }
    }

    console.log('Password not found.');
    return null;
}

// Function to download the wordlist and perform the attack
function downloadAndAttack(url) {
    https.get(url, (res) => {
        let data = '';

        // Receive data in chunks
        res.on('data', (chunk) => {
            data += chunk;
        });

        // Process data once fully received
        res.on('end', () => {
            const wordlist = data.split('\n').map((line) => line.trim());
            dictionaryAttack(wordlist);
        });
    }).on('error', (err) => {
        console.error('Error downloading wordlist:', err.message);
    });
}

// GitHub raw URL of the wordlist
const wordlistURL = 'https://raw.githubusercontent.com/danielmiessler/SecLists/master/Passwords/500-worst-passwords.txt';

// Start the attack
downloadAndAttack(wordlistURL);
