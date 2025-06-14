
const status = document.querySelector('#status span');
const tbody = document.querySelector('#resultTable tbody');

document.getElementById('urlForm').addEventListener('submit', async function (e) {
	e.preventDefault();

	const urls = document.getElementById('urls').value.trim().split('\n').filter(Boolean)
	const response = await fetch('https://localhost:7212/api/ping', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(urls)
	});

	const data = await response.json();

	console.log("Backend válasz:", data);

	tbody.innerHTML = '';	

	var allLive = true;

	data.forEach(item => {
		const row = document.createElement('tr');

		const completeUrl = item.url.startsWith('http://') || item.url.startsWith('https://')
			? item.url : 'http://' + item.url;

		row.innerHTML = `<td><a href="${completeUrl}" target="_blank" class="link-primary fw-semibold text-decoration-none">${item.url}</a></td>
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

	
	status.className = allLive ? 'badge bg-success' : 'badge bg-danger';
	status.textContent = allLive ? 'Minden domain elérhető' : 'Nem minden domain elérhető';	
});

document.getElementById('clearButton').addEventListener('click', () => {
	document.getElementById('urls').value = '';
	status.textContent = '';
	tbody.innerHTML = '';

})


