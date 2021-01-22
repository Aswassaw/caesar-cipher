document.getElementsByClassName('container')[1].addEventListener('click', function (e) {
    if (e.target.classList.contains('submit')) {
        if (e.target.parentElement.classList.contains('encrypt')) {
            // Mengambil input yang dibutuhkan
            const inputEncrypt = document.getElementById('input_encrypt').value
            let inputEncryptKey = document.getElementById('input_encrypt_key').value
            // Jika user tidak menginput key maka default key adalah 0
            inputEncryptKey === '' ? inputEncryptKey = 0 : inputEncryptKey = parseInt(inputEncryptKey)

            // Memanggil fungsi encrypt
            let encryptResult = encrypt(inputEncrypt, inputEncryptKey)

            // Menampilkan hasil encrypt
            document.getElementById('hasil_encrypt').value = encryptResult
        } else if (e.target.parentElement.classList.contains('decrypt')) {
            // Mengambil input yang dibutuhkan
            const inputDecrypt = document.getElementById('input_decrypt').value
            let inputDecryptKey = document.getElementById('input_decrypt_key').value
            // Jika user tidak menginput key maka default key adalah 0
            inputDecryptKey === '' ? inputDecryptKey = 0 : inputDecryptKey = parseInt(inputDecryptKey)
            console.log(inputDecryptKey)

            // Jika user menginput angka positif, ubah menjadi negatif dan sebaliknya
            inputDecryptKey < 0 ? inputDecryptKey = Math.abs(inputDecryptKey) : inputDecryptKey = -Math.abs(inputDecryptKey)
            // Memanggil fungsi decrypt
            let decryptResult = encrypt(inputDecrypt, inputDecryptKey)

            // Menampilkan hasil decrypt
            document.getElementById('hasil_decrypt').value = decryptResult
        }
    } else if (e.target.classList.contains('contoh-lain')) {
        if (e.target.parentElement.classList.contains('encrypt')) {
            document.getElementById('contoh_lain_title').innerHTML = 'Contoh lain hasil encrypt'
            document.getElementById('contoh_lain_body').innerHTML = ''
            let contohLain = []

            for (let i = 0; i < 3; i++) {
                let inputEncrypt = document.getElementById('input_encrypt').value
                // Jika user belum input string
                if (inputEncrypt === '') {
                    inputEncrypt = 'Contoh Encrypt!'
                }
                const key = Math.ceil(Math.random() * 200)
                const encryptResult = encrypt(inputEncrypt, key)

                // Darkmode
                let darkMode = '';
                if (localStorage.getItem('tema') === 'dark') {
                    darkMode = 'card-dark'
                }

                // Menambahkan elemen ke array
                contohLain.push(`
                <div class="card my-2 ${darkMode}">
                    <div class="card-header">
                        Key: <strong>${key}</strong>
                    </div>
                    <div class="card-body">
                        String asli: <div class="card card-body ${darkMode}"><strong>${inputEncrypt}</strong></div>
                        <div class="mt-2"></div>
                        Hasil encrypt: <div class="card card-body ${darkMode}"><strong>${encryptResult}</strong></div>
                    </div>
                </div>`)
            }

            // Menambahkan semua elemen dalam array ke dalam modal-body
            contohLain.forEach((contohL) => {
                document.getElementById('contoh_lain_body').insertAdjacentHTML('beforeend', contohL);
            })
        } else if (e.target.parentElement.classList.contains('decrypt')) {
            document.getElementById('contoh_lain_title').innerHTML = 'Contoh lain hasil decrypt'
            document.getElementById('contoh_lain_body').innerHTML = ''
            let contohLain = []

            for (let i = 0; i < 3; i++) {
                let inputDecrypt = document.getElementById('input_decrypt').value
                // Jika user belum input string
                if (inputDecrypt === '') {
                    inputDecrypt = 'Contoh Decrypt!'
                }
                let key = Math.ceil(Math.random() * 200)
                if (key === 0) {
                    key += 1
                }
                const decryptResult = encrypt(inputDecrypt, -Math.abs(key))

                // Darkmode
                let darkMode = '';
                if (localStorage.getItem('tema') === 'dark') {
                    darkMode = 'card-dark'
                }

                // Menambahkan elemen ke array
                contohLain.push(`
                <div class="card my-2 ${darkMode}">
                    <div class="card-header">
                        Key: <strong>${key}</strong>
                    </div>
                    <div class="card-body">
                        String asli: <div class="card card-body ${darkMode}"><strong>${inputDecrypt}</strong></div>
                        <div class="mt-2"></div>
                        Hasil decrypt: <div class="card card-body ${darkMode}"><strong>${decryptResult}</strong></div>
                    </div>
                </div>`)
            }

            // Menambahkan semua elemen dalam array ke dalam modal-body
            contohLain.forEach((contohL) => {
                document.getElementById('contoh_lain_body').insertAdjacentHTML('beforeend', contohL);
            })
        }
    }
})

function encrypt(str, key) {
    let alphaLow = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let alphaHigh = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    // Merubah string menjadi pecahan array (Langkah 1)
    let strArr = str.split('')

    // Mendapatkan key dari huruf (Langkah 2)
    let strMap = strArr.map((strA) => {
        // Jika input adalah huruf
        if (/[a-zA-Z]/.test(strA)) {
            // Jika input adalah huruf kecil
            if (/[a-z]/.test(strA)) {
                let strMap = alphaLow.findIndex((alp) => {
                    return alp == strA
                })
                return [
                    strMap,
                    'low',
                ]
            }

            // Jika input adalah huruf besar
            else {
                let strMap = alphaHigh.findIndex((alp) => {
                    return alp == strA
                })
                return [
                    strMap,
                    'high',
                ]
            }
        }

        // Jika input bukanlah huruf
        else {
            return [
                26,
                strA
            ]
        }
    })

    // Merangkai enkripsi (Langkah 3)
    let strFinal = strMap.map((strM) => {
        if (strM[0] == 26) {
            return strM[1]
        }

        // Mengurangi index huruf dengan key
        strM[0] -= key

        // Jika saat pengurangan dengan key menjadi negatif
        if (strM[0] < 0) {
            if (strM[0] < -26) {
                // Mencari modulus
                strM[0] = Math.abs(strM[0] % 26)
                // Jika modulus adalah 0
                if (strM[0] === 0) {
                    strM[0] = -26
                } else {
                    strM[0] = -Math.abs(strM[0])
                }
            }

            if (strM[1] == 'low') {
                return strM[0] === -1 ? alphaLow.slice(strM[0]) : alphaLow.slice(strM[0], strM[0] + 1)
            } else {
                return strM[0] === -1 ? alphaHigh.slice(strM[0]) : alphaHigh.slice(strM[0], strM[0] + 1)
            }
        }

        // Jika saat pengurangan dengan key tetap positif
        else {
            if (strM[0] > 25) {
                if (strM[1] == 'low') {
                    return alphaLow[strM[0] % 26]
                } else {
                    return alphaHigh[strM[0] % 26]
                }
            } else {
                if (strM[1] == 'low') {
                    return alphaLow[strM[0]]
                } else {
                    return alphaHigh[strM[0]]
                }
            }
        }
    })

    // console.log(strArr)
    // console.log(strMap)

    return strFinal.join('')
}

// Darkmode
let tema_mode = document.getElementById('tema-mode');

// Jika pada local storage telah terdapat sebuah item dengan nama tema yang isinya adalah dark
if (localStorage.getItem('tema') === 'dark') {
    document.body.classList.toggle('dark')
    tema_mode.setAttribute('checked', 'checked')
    tema_mode.nextElementSibling.innerText = "Dark"
    // Toggle untuk menambahkan class bernama bg-dark pada elemen dengan class card-content
    document.querySelectorAll('.card-content').forEach(index => index.classList.toggle('card-dark'))
    // Modal content
    document.getElementById('contoh_lain_content').classList.toggle('modal-content-dark')
}

// Ketika terdapat perubahan pada tema-mode, maka jalankan fungsi setDarkMode
tema_mode.addEventListener('change', setDarkMode)

// Fungsi untuk darkmode
function setDarkMode() {
    // Jika pada local storage telah terdapat sebuah item dengan nama tema yang isinya adalah dark
    if (localStorage.getItem('tema') === 'dark') {
        // Hapus item dengan nama tema
        localStorage.removeItem('tema')
        tema_mode.nextElementSibling.innerText = "Light"
    }

    // Jika tidak ada
    else {
        // Tambahkan item bernama tema dengan isi dark
        localStorage.setItem('tema', 'dark')
        tema_mode.nextElementSibling.innerText = "Dark"
    }
    // Toggle untuk menambahkan class bernama dark pada body
    document.body.classList.toggle('dark')
    // Toggle untuk menambahkan class bernama bg-dark pada elemen dengan class card-content
    document.querySelectorAll('.card-content').forEach(index => index.classList.toggle('card-dark'))
    // Modal content
    document.getElementById('contoh_lain_content').classList.toggle('modal-content-dark')
}