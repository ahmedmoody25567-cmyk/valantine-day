/* تشغيل الأغنية وموقع الحب عند الضغط على القلب النابض AB */
function startWebsite() {
  const audio = document.getElementById('loveSong');
  audio.play().catch(e => console.log("Audio play blocked", e));
  
  document.getElementById('welcomeScreen').style.opacity = '0';
  setTimeout(() => {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('mainContainer').style.display = 'block';
  }, 500);

  confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 }, colors: ['#ff1744', '#ffd700'] });
}

/* عداد الحب من 24 أبريل 2024 */
const startDate = new Date('2024-04-24T00:00:00');
function updateTimer() {
  const diff = new Date() - startDate;
  document.getElementById('days').innerText = Math.floor(diff / 86400000);
  document.getElementById('hours').innerText = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('minutes').innerText = Math.floor((diff % 3600000) / 60000);
  document.getElementById('seconds').innerText = Math.floor((diff % 60000) / 1000);
}
setInterval(updateTimer, 1000); updateTimer();

/* قلوب ونجوم متحركة في الخلفية */
const canvas = document.getElementById('fx-canvas'), ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth, height = canvas.height = window.innerHeight;
const items = ['❤️', '💖', '✨', '🌸', '🌹'];
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * width; this.y = -20;
    this.size = Math.random() * 20 + 12; this.speedY = Math.random() * 1.5 + 0.5;
    this.char = items[Math.floor(Math.random() * items.length)]; this.opacity = Math.random() * 0.7 + 0.3;
  }
  update() { this.y += this.speedY; if (this.y > height + 20) this.reset(); }
  draw() { ctx.globalAlpha = this.opacity; ctx.font = `${this.size}px serif`; ctx.fillText(this.char, this.x, this.y); }
}
const particles = Array.from({length: 35}, () => new Particle());
function animate() { ctx.clearRect(0, 0, width, height); particles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
animate();

/* ألبوم الصور وتظبيط صورة الدم مع جملة "اسمك بيجري في دمي" */
const memories = [
  { img: 'image.png', msg: 'أول لقطة عشق في الجنينة ❤️' },
  { img: 'image_2.png', msg: 'ضحكتك وسندك.. دنيتي كلها' },
  { img: 'image_3.png', msg: 'أجمل مراية وأحلى بنوتة' },
  { img: 'image_4.png', msg: 'كاريزما وأناقة ملهاش مثيل' },
  { img: 'image_5.png', msg: 'أحلى لوك مع بعض بالنظارات 😎' },
  { img: 'image_6.png', msg: 'تفاصيلك اليومية اللي بعشقها' },
  { img: 'image_7.png', msg: 'سيلفي الكيوت والجمال كله' },
  { img: 'image_8.png', msg: 'إيد في إيد.. وعد حب للأبد' },
  { img: 'image_9.png', msg: 'ضحكتك الصافية اللي بتنور أيامي' },
  { img: 'image_10.png', msg: 'أحلى سيلفي جنب بعض يا بسبوسة' },
  { img: 'image_11.png', msg: 'أحلى عصير وأحلى قعدة سوا' },
  { img: 'image_12.png', msg: 'شهادة التقدير لأغلى دكتورة في قلبي' },
  { img: 'image_13.png', msg: 'يا ملكة روحي وقلبي' },
  { img: 'image_14.png', msg: 'وسط الورد وأحلى إنسانة' },
  { img: 'image_15.png', msg: 'رقة ونعومة مالهاش حدود' },
  { img: 'image_16.png', msg: 'البرنسيسة المودرن بتاعتي' },
  { img: 'image_17.png', msg: 'ملامحك الهادية اللي بتخطف قلبي' },
  { img: 'image_18.png', msg: 'سبايدر مان وبسبوسة في كل مكان' },
  { img: 'image_19.png', msg: 'أحلى تفوق ونجاح سوا' },
  { img: 'image_20.png', msg: 'اسمك بيجري في دمي ❤️' }
];

const deck = document.getElementById('memoryDeck');
let currentCardIndex = memories.length - 1;
function renderDeck() {
  memories.forEach((m, i) => {
    const card = document.createElement('div');
    card.className = `memory-card`;
    card.style.zIndex = i;
    card.style.transform = `rotate(${(i - currentCardIndex) * 3}deg) translateZ(${(i - currentCardIndex) * 4}px)`;
    card.innerHTML = `<img src="${m.img}" alt="Basmala Memory"><div style="position:absolute; bottom:0; width:100%; background:rgba(0,0,0,0.75); color:white; padding:12px; font-weight:700; text-align:center; font-size:0.95rem;">${m.msg}</div>`;
    card.onclick = flipCard; deck.appendChild(card);
  });
}
function flipCard() {
  const cards = deck.getElementsByClassName('memory-card');
  if (currentCardIndex < 0) return;
  const card = cards[currentCardIndex];
  card.style.transform = `translateX(-150%) rotate(-60deg)`; card.style.opacity = '0';
  currentCardIndex--;
  if (currentCardIndex < -1) { deck.innerHTML = ''; currentCardIndex = memories.length - 1; renderDeck(); }
  confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 }, colors: ['#ff1744', '#ffd700'] });
}
renderDeck();

/* اختبار بصمة الحب */
function scanLove() {
  const res = document.getElementById('scanResult'), percent = document.getElementById('percentText'), msg = document.getElementById('resultMsg');
  res.style.display = 'block'; msg.innerText = "جاري الكشف وتطابق القلوب...";
  let current = 0;
  const interval = setInterval(() => {
    current += 25; percent.innerText = current + "%";
    if (current >= 1000) {
      clearInterval(interval); percent.innerText = "1000%";
      msg.innerText = "عشق لا ينتهي! بسبوسة هي عشقك الأبدي والوحيد ❤️";
      confetti({ particleCount: 100, spread: 100, origin: { y: 0.6 }, colors: ['#ff1744', '#ffd700'] });
    }
  }, 100);
}
