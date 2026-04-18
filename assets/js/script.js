document.addEventListener('DOMContentLoaded', () => {
  const startPage = () => document.body.classList.remove('is-loading');
  if (document.body.classList.contains('page-home')) {
    requestAnimationFrame(() => setTimeout(startPage, 120));
  } else {
    requestAnimationFrame(startPage);
  }

  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }

  const stageImage = document.getElementById('spotlightImage');
  const stageTitle = document.getElementById('spotlightTitle');
  const stageSub = document.getElementById('spotlightSub');
  const stageMeta = document.getElementById('spotlightMeta');
  const items = document.querySelectorAll('.spotlight-item');

  const activateSpotlight = (button) => {
    items.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    if (stageImage) stageImage.src = button.dataset.image;
    if (stageTitle) stageTitle.textContent = button.dataset.title;
    if (stageSub) stageSub.textContent = button.dataset.sub;
    if (stageMeta) stageMeta.textContent = button.dataset.meta;
  };

  items.forEach((button) => {
    ['mouseenter', 'focus', 'click'].forEach((eventName) => {
      button.addEventListener(eventName, () => activateSpotlight(button));
    });
  });

  document.querySelectorAll('a[href$=".html"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href === window.location.pathname.split('/').pop()) return;
      event.preventDefault();
      const overlay = document.querySelector('.page-transition');
      if (overlay) {
        overlay.style.transition = 'transform 380ms cubic-bezier(.65,.05,.36,1)';
        overlay.style.transform = 'translateY(0)';
      }
      setTimeout(() => { window.location.href = href; }, 280);
    });
  });
});


const inquiryForm = document.getElementById("inquiryForm");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const config = window.FORM_CONFIG || {};
    const submitMode = config.submitMode || "mailto";
    const success = document.getElementById("formSuccess");
    const formData = new FormData(inquiryForm);
    const thankYouPage = config.thankYouPage || "thank-you.html";

    if (submitMode === "googleForm" && config.googleForm?.action && config.googleForm?.fields) {
      const hiddenForm = document.createElement("form");
      hiddenForm.method = "POST";
      hiddenForm.action = config.googleForm.action;
      hiddenForm.target = "hidden_iframe";
      hiddenForm.style.display = "none";

      Object.entries(config.googleForm.fields).forEach(([key, fieldName]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = fieldName;
        input.value = formData.get(key) || "";
        hiddenForm.appendChild(input);
      });

      let iframe = document.getElementById("hidden_iframe");
      if (!iframe) {
        iframe = document.createElement("iframe");
        iframe.name = "hidden_iframe";
        iframe.id = "hidden_iframe";
        iframe.style.display = "none";
        document.body.appendChild(iframe);
      }

      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      hiddenForm.remove();

      if (success) {
        success.hidden = false;
        success.textContent = "已送往 Google Form，將跳轉到成功頁。";
      }
    } else {
      const recipient = config.recipientEmail || "your@email.com";
      const subject = encodeURIComponent(`網站詢問｜${formData.get("service") || "新專案"}`);
      const body = encodeURIComponent(
        `姓名 / 品牌名：${formData.get("name") || ""}
` +
        `Email：${formData.get("email") || ""}
` +
        `服務類型：${formData.get("service") || ""}
` +
        `預算區間：${formData.get("budget") || ""}
` +
        `預計上線時間：${formData.get("timeline") || ""}
` +
        `參考網站或 IG：${formData.get("reference") || ""}

` +
        `專案需求：
${formData.get("message") || ""}`
      );

      if (success) {
        success.hidden = false;
        success.textContent = "將開啟預設信箱並帶入詢問內容。";
      }

      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }

    setTimeout(() => {
      window.location.href = thankYouPage;
    }, 900);
  });
}


const revealTargets = document.querySelectorAll(
  '.section-intro, .result-card, .service-card, .pricing-card, .spotlight-card, .flow-card, .visual-story-card, .contact-card, .faq-panel article, .process-card, .thank-you-grid article, .case-detail-main, .detail-meta-card, .cta-panel, .opening-intro-panel, .about-narrative-card, .about-editorial-card, .about-editorial-media, .story-copy, .about-story-grid figure, .surface-panel article, .feature-card'
);

revealTargets.forEach((el, index) => {
  el.classList.add('reveal-up');
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealTargets.forEach((el) => revealObserver.observe(el));


const scrollMotionTargets = document.querySelectorAll(
  '.hero-shell, .hero-frame, .hero-note-card, .opening-intro-panel, .about-editorial-media, .about-editorial-card, .about-narrative-card, .feature-card, .service-card, .result-card, .spotlight-card, .flow-card, .contact-card, .process-card, .case-detail-main, .detail-meta-card, .cta-panel'
);

scrollMotionTargets.forEach((element, index) => {
  element.classList.add('scroll-motion', 'scroll-fade');
  const depth = element.classList.contains('hero-shell') ? 26 : element.classList.contains('hero-frame') ? 22 : element.classList.contains('hero-note-card') ? 18 : 14 + (index % 4) * 2;
  element.dataset.scrollDepth = String(depth);
});

const sectionTitles = document.querySelectorAll('.section-intro, .split-intro, .page-hero .narrow-grid');
sectionTitles.forEach((block) => {
  if (block.querySelector('.section-hint-line')) return;
  const line = document.createElement('div');
  line.className = 'section-hint-line';
  block.appendChild(line);
});

const hintLines = document.querySelectorAll('.section-hint-line');
let scrollMotionTicking = false;
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

const updateScrollMotion = () => {
  if (reducedMotionQuery.matches) return;

  const viewportHeight = window.innerHeight || 1;

  scrollMotionTargets.forEach((element) => {
    const rect = element.getBoundingClientRect();
    const depth = Number(element.dataset.scrollDepth || 14);
    const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
    const centered = progress - 0.5;
    const clamped = Math.max(-1, Math.min(1, centered * 2));
    const travel = Math.max(-depth, Math.min(depth, -clamped * depth));
    const visibility = Math.max(0, Math.min(1, 1 - Math.abs(clamped) * 0.18));
    const scale = 1 + (1 - Math.min(1, Math.abs(clamped))) * 0.018;
    const rotate = Math.max(-1.2, Math.min(1.2, clamped * 0.9));

    element.style.setProperty('--scroll-y', `${travel.toFixed(2)}px`);
    element.style.setProperty('--scroll-scale', scale.toFixed(3));
    element.style.setProperty('--scroll-rotate', `${rotate.toFixed(2)}deg`);
    element.style.setProperty('--scroll-opacity', visibility.toFixed(3));
  });

  hintLines.forEach((line) => {
    const rect = line.parentElement.getBoundingClientRect();
    const active = rect.top < viewportHeight * 0.78 && rect.bottom > viewportHeight * 0.22;
    line.classList.toggle('is-active', active);
  });
};

const requestScrollMotion = () => {
  if (scrollMotionTicking) return;
  scrollMotionTicking = true;
  requestAnimationFrame(() => {
    updateScrollMotion();
    scrollMotionTicking = false;
  });
};

updateScrollMotion();
window.addEventListener('scroll', requestScrollMotion, { passive: true });
window.addEventListener('resize', requestScrollMotion);
reducedMotionQuery.addEventListener('change', () => {
  if (reducedMotionQuery.matches) {
    scrollMotionTargets.forEach((element) => {
      element.style.removeProperty('--scroll-y');
      element.style.removeProperty('--scroll-scale');
      element.style.removeProperty('--scroll-rotate');
      element.style.removeProperty('--scroll-opacity');
    });
  } else {
    requestScrollMotion();
  }
});
