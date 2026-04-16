
/* =========================
   CHATBOT HAM BAKERY (AI STYLE)
========================= */

const faq = [
  {
    keywords: ["halo", "hai", "hi"],
    answer: [
      "Halo! Selamat datang di Ham Bakery 🍞 Ada yang bisa aku bantu?",
      "Hai 😊 Mau cari roti enak atau promo hari ini?"
    ]
  },

  {
    keywords: ["harga", "berapa", "price"],
    answer: [
      "Harga roti mulai dari Rp10.000 - Rp50.000 🍞\n👉 Roti biasa: 10–20k\n👉 Croissant: 25–40k\n👉 Cake: 35–50k",
      "Range harga kita terjangkau 👍 mulai 10rb sudah bisa nikmati roti fresh setiap hari"
    ]
  },

  {
    keywords: ["menu", "roti", "produk"],
    answer: [
      "Menu kami 🍞:\n• Croissant butter\n• Artisan bread\n• Roti gandum\n• Cake premium 🎂",
      "Banyak pilihan fresh bread setiap hari 😍 terutama croissant & artisan bread"
    ]
  },

  {
    keywords: ["rekomendasi", "enak", "best"],
    answer: [
      "Rekomendasi kami 👉 Croissant butter 🤤",
      "Best seller: Croissant & Artisan Bread 🍞"
    ]
  },

  {
    keywords: ["lokasi", "dimana", "alamat"],
    answer: [
      "Kami ada di Ambarawa 📍",
      "Lokasi kami di Ambarawa, silakan datang ya 😊"
    ]
  },

  {
    keywords: ["jam", "buka", "operasional"],
    answer: [
      "Buka setiap hari jam 08.00 - 20.00 ⏰",
      "Kami siap melayani dari pagi sampai malam 😍"
    ]
  }
];

/* ===== RANDOM ===== */
function randomReply(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* =========================
   AI FALLBACK BRAIN
========================= */
function generateAIResponse(text) {

  if (text.includes("murah") || text.includes("hemat")) {
    return "Tenang 😊 kami punya roti mulai 10rb, cocok semua kalangan 🍞";
  }

  if (text.includes("sehat") || text.includes("diet")) {
    return "Kami juga punya roti gandum & low sugar 🌿";
  }

  if (text.includes("owner") || text.includes("siapa")) {
    return "Ham Bakery dibuat dengan cinta untuk roti fresh setiap hari ❤️";
  }

  if (text.includes("enak")) {
    return "Kami pakai bahan premium, jadi rasanya fresh dan lembut 😍";
  }

  return "Hmm aku belum paham 😅 coba tanya menu, harga, lokasi, atau rekomendasi ya 🍞";
}

/* =========================
   SEND MESSAGE
========================= */

function sendMessage() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  if (!input || !chat) return;

  const text = input.value.toLowerCase().trim();
  if (!text) return;

  chat.innerHTML += `<p><b>Kamu:</b> ${text}</p>`;

  let replies = [];

  faq.forEach(f => {
    if (f.keywords.some(k => text.includes(k))) {
      replies.push(randomReply(f.answer));
    }
  });

  let reply;

  if (replies.length > 0) {
    reply = [...new Set(replies)].join("<br>");
  } else {
    reply = generateAIResponse(text);
  }

  chat.innerHTML += `<p><b>HamBot:</b> ${reply}</p>`;

  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}

/* =========================
   ENTER SUPPORT
========================= */

document.getElementById("input")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

/* =========================
   MUSIC PLAYER
========================= */

const music = document.getElementById("music");
const disc = document.getElementById("disc");

function toggleMusic() {
  if (!music || !disc) return;

  if (music.paused) {
    music.play();
    disc.classList.add("beat");
  } else {
    music.pause();
    disc.classList.remove("beat");
  }
}

/* =========================
   SLIDER (DRAG + TOUCH + WHEEL)
========================= */

const slider = document.querySelector(".slider");

if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseup", () => isDown = false);
  slider.addEventListener("mouseleave", () => isDown = false);

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    slider.scrollLeft = scrollLeft - (x - startX) * 2;
  });

  // touch
  let touchStartX = 0;
  let touchScroll = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].pageX;
    touchScroll = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    slider.scrollLeft = touchScroll - (x - touchStartX) * 2;
  });

  // wheel horizontal fix
  slider.addEventListener("wheel", (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY;
  }, { passive: false });
}