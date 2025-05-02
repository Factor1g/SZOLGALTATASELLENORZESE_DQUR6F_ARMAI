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

	const row = document.getElementById('row-1');
	const item = data[0];
	row.innerHTML = `
	<td>${item.url}</td>
            <td>${item.isLive ? 'Elérhetõ' : 'Nem elérhetõ'}</td>
            <td>${item.address}</td>
            <td>${item.roundtripTime}</td>
            <td>${item.ttl}</td>
            <td>${item.bufferSize}</td>`
});


