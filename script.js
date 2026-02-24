const reveals = [...document.querySelectorAll('.panel .content, .grade-card')];
reveals.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.18 }
);

reveals.forEach((el) => io.observe(el));
