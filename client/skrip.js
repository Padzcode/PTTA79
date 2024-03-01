import QrScanner from '/node_modules/qr-scanner/qr-scanner.min.js';
const video = document.getElementById("video");

function rand(min, max) {
    return Math.floor((Math.random() * (max-min+1)) + min);
}
console.log(rand(0,9999))
let qrcodeContainer = document.getElementById("qrcode");

const makeCode = (text) => {
    new QRCode(qrcodeContainer, text.toString());
} 
let angka = rand(0,99)
for (let i = 0; i < 10; i++) {
    angka = rand(0,999)
    makeCode(angka)
};
const qrScanner = new QrScanner(
    video,
    result => {
        alert(result.data);
        qrScanner.stop();
        video.remove();
    },
    {highlightScanRegion: true}
    );
qrScanner.start();