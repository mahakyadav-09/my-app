// Baki automatically calculate karo
function calcDue() {
  const total = parseFloat(document.getElementById('p-total').value) || 0;
  const paid  = parseFloat(document.getElementById('p-paid').value)  || 0;
  document.getElementById('p-due').value = total - paid;
}

// Aaj ki date set karo
document.getElementById('p-date').value = new Date().toISOString().split('T')[0];

// Payment form submit hone par
document.getElementById('payment-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const entry = {
    name:   document.getElementById('p-name').value.trim(),
    phone:  document.getElementById('p-phone').value.trim(),
    total:  parseFloat(document.getElementById('p-total').value) || 0,
    paid:   parseFloat(document.getElementById('p-paid').value)  || 0,
    due:    parseFloat(document.getElementById('p-due').value)   || 0,
    status: document.getElementById('p-status').value,
    method: document.getElementById('p-method').value,
    date:   document.getElementById('p-date').value,
  };

  const data = JSON.parse(localStorage.getItem('solar_payments') || '[]');
  data.push(entry);
  localStorage.setItem('solar_payments', JSON.stringify(data));

  this.reset();
  document.getElementById('p-date').value = new Date().toISOString().split('T')[0];
  loadPayTable();
  alert('Payment save ho gayi!');
});

// Payment table dikhana
function loadPayTable() {
  const data = JSON.parse(localStorage.getItem('solar_payments') || '[]');
  const tbody = document.getElementById('pay-body');
  tbody.innerHTML = '';

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#aaa;">Koi data nahi</td></tr>';
    return;
  }

  data.forEach(function(e) {
    const row = `<tr>
      <td>${e.name}</td>
      <td>₹${e.total.toLocaleString('en-IN')}</td>
      <td style="color:green">₹${e.paid.toLocaleString('en-IN')}</td>
      <td style="color:red">₹${e.due.toLocaleString('en-IN')}</td>
      <td><span class="badge ${e.status}">${e.status}</span></td>
      <td>${e.method}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

loadPayTable();