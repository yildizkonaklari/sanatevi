import fs from 'fs';
import path from 'path';

// Bu script, HTML dosyasındaki yer tutucuları Netlify ortam değişkenleriyle değiştirir.
// Böylece API anahtarlarınız GitHub'da görünmez.

const sourcePath = 'sanat-evi-yonetim.html';
const distDir = 'dist';
const distPath = path.join(distDir, 'index.html');

// 'dist' klasörü yoksa oluştur
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir);
}

// Kaynak HTML dosyasını oku
let content = fs.readFileSync(sourcePath, 'utf8');

// Yer tutucuları ortam değişkenleriyle değiştir
// Bu değişkenleri Netlify arayüzünden ayarlamanız gerekmektedir.
content = content.replace(/__FIREBASE_API_KEY__/g, process.env.FIREBASE_API_KEY);
content = content.replace(/__FIREBASE_AUTH_DOMAIN__/g, process.env.FIREBASE_AUTH_DOMAIN);
content = content.replace(/__FIREBASE_PROJECT_ID__/g, process.env.FIREBASE_PROJECT_ID);
content = content.replace(/__FIREBASE_STORAGE_BUCKET__/g, process.env.FIREBASE_STORAGE_BUCKET);
content = content.replace(/__FIREBASE_MESSAGING_SENDER_ID__/g, process.env.FIREBASE_MESSAGING_SENDER_ID);
content = content.replace(/__FIREBASE_APP_ID__/g, process.env.FIREBASE_APP_ID);

// Yeni içeriği 'dist' klasöründeki index.html dosyasına yaz
fs.writeFileSync(distPath, content);

console.log('Build başarılı! Dosya şu adrese yazıldı:', distPath);
