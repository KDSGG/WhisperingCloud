const gradeField = document.querySelector('#grade');
const styleField = document.querySelector('#style');
const sizeField = document.querySelector('#size');
const priceEl = document.querySelector('#price');
const form = document.querySelector('#order-form');
const msg = document.querySelector('#form-msg');

const PRICE_TABLE = {
  premium: { coat: 7980, shirt: 4680, dress: 6280 },
  standard: { coat: 4980, shirt: 2980, dress: 3980 },
  entry: { coat: 2980, shirt: 1780, dress: 2380 }
};

const MODE = 'SIMULATION';

function sanitize(value) {
  return String(value).replace(/[^a-z]/gi, '');
}

function formatPrice(value) {
  return `¥${value.toLocaleString('zh-CN')}`;
}

function getCurrentPrice() {
  const grade = sanitize(gradeField.value);
  const style = sanitize(styleField.value);
  return PRICE_TABLE[grade]?.[style] ?? 0;
}

function syncFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const grade = sanitize(params.get('grade') || '');
  if (Object.hasOwn(PRICE_TABLE, grade)) {
    gradeField.value = grade;
  }
}

function updatePrice() {
  let base = getCurrentPrice();
  if (sizeField.value === 'XL') base += 300;
  priceEl.textContent = formatPrice(base);
}

[gradeField, styleField, sizeField].forEach((field) => {
  field.addEventListener('change', updatePrice);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  msg.className = 'form-msg';
  msg.textContent = '';

  if (!form.checkValidity()) {
    msg.textContent = '请完整填写表单信息。';
    msg.classList.add('error');
    return;
  }

  const payload = {
    grade: sanitize(gradeField.value),
    style: sanitize(styleField.value),
    size: sanitize(sizeField.value),
    email: document.querySelector('#email').value.trim(),
    address: document.querySelector('#address').value.trim(),
    amount: getCurrentPrice()
  };

  if (MODE === 'SIMULATION') {
    msg.textContent = `模拟支付成功：订单已创建（${payload.grade}/${payload.style}）。`;
    msg.classList.add('ok');
    form.reset();
    updatePrice();
    return;
  }

  msg.textContent = '正在跳转支付网关...';
  msg.classList.add('ok');

  // 生产环境中，这里应请求你的后端创建支付会话并重定向到支付页
  // fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
});

syncFromQuery();
updatePrice();
