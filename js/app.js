/**
 * Calistung Bunda Azzahirra - Interactive Script
 * Clean, robust vanilla JS for high-converting educational experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. WhatsApp Configuration
  const WA_PHONE_NUMBER = '6281298985304'; // From banner: 0812 9898 5304

  // Helper: Open WhatsApp with encoded message
  window.openWhatsApp = function (customMessage) {
    const defaultMsg = 'Halo Bunda Azzahirra, saya ingin bertanya tentang Program Belajar Calistung untuk anak saya. Boleh minta info jadwal dan pendaftarannya?';
    const text = encodeURIComponent(customMessage || defaultMsg);
    const waUrl = `https://wa.me/${WA_PHONE_NUMBER}?text=${text}`;
    window.open(waUrl, '_blank');
  };

  // 2. Sticky Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const isExpanded = navLinks.classList.contains('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 4. Curriculum Age Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      // Update button states
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panel display
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // 5. Interactive Calistung Mini-Quiz
  const quizData = {
    huruf: [
      {
        prompt: 'Huruf depan dari kata "APEL" 🍎 adalah huruf apa ya?',
        options: ['B', 'A', 'M', 'K'],
        correct: 'A',
        explanation: 'Hebat! A untuk Apel 🍎'
      },
      {
        prompt: 'Huruf depan dari kata "BUKU" 📖 adalah huruf apa ya?',
        options: ['S', 'P', 'B', 'D'],
        correct: 'B',
        explanation: 'Pintar sekali! B untuk Buku 📖'
      },
      {
        prompt: 'Huruf depan dari kata "PENSIL" ✏️ adalah huruf apa ya?',
        options: ['P', 'T', 'L', 'N'],
        correct: 'P',
        explanation: 'Luar biasa! P untuk Pensil ✏️'
      }
    ],
    kata: [
      {
        prompt: 'Ayo sambung suku kata: "BU" + "KU" dibaca apa?',
        options: ['BOLA', 'BUKU', 'BUSA', 'BATU'],
        correct: 'BUKU',
        explanation: 'Benar! B-U = BU, K-U = KU jadi BUKU 📖'
      },
      {
        prompt: 'Ayo sambung suku kata: "MA" + "MA" dibaca apa?',
        options: ['MAMA', 'MATA', 'MADU', 'MALAM'],
        correct: 'MAMA',
        explanation: 'Pintar! M-A = MA, M-A = MA jadi MAMA ❤️'
      },
      {
        prompt: 'Ayo sambung suku kata: "SA" + "PI" dibaca apa?',
        options: ['SAPU', 'SAPI', 'SATU', 'SARI'],
        correct: 'SAPI',
        explanation: 'Wah jago banget! S-A = SA, P-I = PI jadi SAPI 🐄'
      }
    ],
    angka: [
      {
        prompt: 'Ada berapa buah jeruk di keranjang? 🍊 🍊 🍊',
        options: ['2', '3', '4', '5'],
        correct: '3',
        explanation: 'Tepat sekali! Ada 3 buah jeruk manis 🍊'
      },
      {
        prompt: 'Berapakah hasil dari 2 bintang ⭐ ⭐ ditambah 2 bintang ⭐ ⭐ ?',
        options: ['3', '4', '5', '6'],
        correct: '4',
        explanation: 'Hebat! 2 + 2 = 4 Bintang ceria ⭐'
      },
      {
        prompt: 'Ada berapa pensil warna di sini? ✏️ ✏️ ✏️ ✏️ ✏️',
        options: ['4', '5', '6', '7'],
        correct: '5',
        explanation: 'Keren! Ada 5 pensil warna-warni ✏️'
      }
    ]
  };

  let currentCategory = 'huruf';
  let currentIndex = 0;
  let score = 0;

  const promptEl = document.getElementById('quiz-prompt');
  const optionsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const scoreEl = document.getElementById('quiz-score');
  const modeBtns = document.querySelectorAll('.game-mode-btn');

  function renderQuizQuestion() {
    const list = quizData[currentCategory];
    const item = list[currentIndex % list.length];

    if (!promptEl || !optionsEl) return;

    promptEl.textContent = item.prompt;
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'game-feedback';

    item.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => handleQuizAnswer(opt, item.correct, item.explanation, btn));
      optionsEl.appendChild(btn);
    });
  }

  function handleQuizAnswer(selected, correct, explanation, clickedBtn) {
    const allBtns = optionsEl.querySelectorAll('.quiz-btn');
    allBtns.forEach(b => b.disabled = true);

    if (selected === correct) {
      clickedBtn.classList.add('correct');
      feedbackEl.textContent = `🌟 ${explanation}`;
      feedbackEl.style.color = '#059669';
      score += 10;
      if (scoreEl) scoreEl.textContent = `Skor Kamu: ${score} Poin ⭐`;

      // Next question after 1.8 seconds
      setTimeout(() => {
        currentIndex++;
        renderQuizQuestion();
      }, 1800);
    } else {
      clickedBtn.classList.add('wrong');
      allBtns.forEach(b => {
        if (b.textContent === correct) b.classList.add('correct');
      });
      feedbackEl.textContent = `Yuk coba lagi ya! Jawaban yang tepat adalah: ${correct}`;
      feedbackEl.style.color = '#e11d48';

      setTimeout(() => {
        currentIndex++;
        renderQuizQuestion();
      }, 2000);
    }
  }

  // Quiz mode buttons
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-mode');
      currentIndex = 0;
      renderQuizQuestion();
    });
  });

  // Initial render
  if (promptEl) {
    renderQuizQuestion();
  }

  // 6. Free Trial Form Submission to WhatsApp
  const trialForm = document.getElementById('trial-form');
  if (trialForm) {
    trialForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const parentName = document.getElementById('parent-name').value.trim();
      const childName = document.getElementById('child-name').value.trim();
      const childAge = document.getElementById('child-age').value;
      const sessionTime = document.getElementById('session-time').value;
      const notes = document.getElementById('notes').value.trim();

      if (!parentName || !childName || !childAge) {
        alert('Mohon lengkapi Nama Bunda/Ayah, Nama Anak, dan Usia Anak terlebih dahulu.');
        return;
      }

      const message = `*FORMULIR PENDAFTARAN FREE TRIAL / KONSULTASI CALISTUNG*
---------------------------------------
Nama Orang Tua : ${parentName}
Nama Anak      : ${childName}
Usia Anak      : ${childAge}
Waktu Pilihan  : ${sessionTime || 'Fleksibel'}
Catatan/Keluhan: ${notes || 'Ingin mulai belajar calistung dengan Bunda Azzahirra'}
---------------------------------------
Halo Bunda Azzahirra, saya ingin mengonfirmasi pendaftaran jadwal Uji Coba Gratis (Free Trial) di Jl. Lumbu Utara Raya. Mohon info ketersediaan kelasnya. Terima kasih!`;

      window.openWhatsApp(message);
    });
  }

  // 7. FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other open faqs
      faqItems.forEach(other => other.classList.remove('active'));
      // Toggle clicked faq
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 8. Instagram Modal Dialog Logic
  const igModal = document.getElementById('ig-modal');
  const openIgBtns = document.querySelectorAll('.btn-open-ig');
  const closeIgBtn = document.getElementById('close-ig-modal');

  openIgBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (igModal) igModal.classList.add('active');
    });
  });

  if (closeIgBtn && igModal) {
    closeIgBtn.addEventListener('click', () => {
      igModal.classList.remove('active');
    });

    igModal.addEventListener('click', (e) => {
      if (e.target === igModal) {
        igModal.classList.remove('active');
      }
    });
  }
});
