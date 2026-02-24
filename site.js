const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15 }
  );

  reveals.forEach((el) => io.observe(el));
}

const gradeName = document.querySelector('#gradeName');
if (gradeName) {
  const map = { l1: '等级 1', l2: '等级 2', l3: '等级 3', l4: '等级 4', l5: '等级 5' };
  const query = new URLSearchParams(window.location.search);
  const grade = query.get('grade') || 'l1';
  gradeName.textContent = map[grade] || '等级 1';
}

const suggestForm = document.querySelector('#suggestForm');
if (suggestForm) {
  const imageInput = document.querySelector('#image');
  const msg = document.querySelector('#formMsg');
  const MAX_SIZE = 15 * 1024 * 1024;

  suggestForm.addEventListener('submit', (event) => {
    event.preventDefault();
    msg.className = 'form-msg';

    if (!suggestForm.checkValidity()) {
      msg.textContent = '请填写邮箱与建议内容。';
      msg.classList.add('error');
      return;
    }

    const file = imageInput.files[0];
    if (file && file.size > MAX_SIZE) {
      msg.textContent = '图片超过 15MB，请压缩后再上传。';
      msg.classList.add('error');
      return;
    }

    msg.textContent = '提交成功，感谢你的建议。';
    msg.classList.add('ok');
    suggestForm.reset();
  });
}
