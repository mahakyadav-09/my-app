// Yeh file solar panel data ko save aur show karti hai

// Page switch karna
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
}

// Solar form submit hone par
document.getElementById('solar-form').addEventListener('submit', function(e) {
  e.preventDefault(); // page reload rokta hai

  // Input fields se data lena
  const entry = {
    name:     document.getElementById('s-name').value.trim(),
    phone:    document.getElementById('s-phone').value.trim(),
    city:     document.getElementById('s-city').value.trim(),
    district: document.getElementById('s-district').value.trim(),
    status:   document.getElementById('s-status').value,
    panels:   document.getElementById('s-panels').value,
    bill:     document.getElementById('s-bill').value,
  };

  // LocalStorage se purana data lena
  const data = JSON.parse(localStorage.getItem('solar_entries') || '[]');
  data.push(entry); // naya entry add karo
  localStorage.setItem('solar_entries', JSON.stringify(data)); // save karo

  this.reset(); // form clear karo
  loadSolarTable(); // table update karo
  alert('Solar entry save ho gayi!');
});

// Table mein data dikhana
function loadSolarTable() {
  const data = JSON.parse(localStorage.getItem('solar_entries') || '[]');
  const tbody = document.getElementById('solar-body');
  tbody.innerHTML = ''; // pehle clear karo

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#aaa;">Koi data nahi</td></tr>';
    return;
  }

  data.forEach(function(e) {
    const row = `<tr>
      <td>${e.name}</td>
      <td>${e.city}</td>
      <td><span class="badge ${e.status}">${e.status}</span></td>
      <td>${e.panels || '-'}</td>
      <td>${e.bill ? '₹' + e.bill : '-'}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Page load hone par table dikhao
loadSolarTable();