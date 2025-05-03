document.getElementById('urlForm').addEventListener('submit', async function(e) {
	e.preventDefault();

	const urls = document.getElementById('urls').value.trim().split('\n').filter(Boolean)
	const response = await fetch('https://localhost:7212/api/ping', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(urls)
	});

	const data = await response.json();

	console.log("Backend válasz:", data);

	const tbody = document.querySelector('#resultTable tbody');	

	tbody.innerHTML = '';

	var allLive = true;

	data.forEach(item => {
		const row = document.createElement('tr');

		row.innerHTML = `<td>${item.url}</td>
            <td><span class="badge bg-${item.isLive ? 'success' : 'danger'}">${item.isLive ? 'Elérhető' : 'Nem elérhető'}</span></td>
            <td>${item.address}</td>
            <td>${item.roundtripTime}</td>
            <td>${item.ttl}</td>
            <td>${item.bufferSize}</td>`;
		
		tbody.appendChild(row);

        if (!item.isLive) {
			allLive = false;
        }
	});

	const status = document.querySelector('#status span');
	status.className = allLive ? 'badge bg-success' : 'badge bg-danger';
	status.textContent = allLive ? 'Minden domain elérhető' : 'Nem minden domain elérhető';
	
});


