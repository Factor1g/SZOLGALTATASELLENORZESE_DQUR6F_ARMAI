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

	data.forEach(item => {
		const row = document.createElement('tr');

		row.innerHTML = `<td>${item.url}</td>
            <td>${item.isLive ? 'Elérhető' : 'Nem elérhető'}</td>
            <td>${item.address}</td>
            <td>${item.roundtripTime}</td>
            <td>${item.ttl}</td>
            <td>${item.bufferSize}</td>`;
		
		tbody.appendChild(row);

	});

	
});


