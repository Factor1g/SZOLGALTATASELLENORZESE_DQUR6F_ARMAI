document.getElementById('urlForm').addEventListener('submit', async function(e) {
	e.preventDefault();

	const urls = document.getElementById('urls').value.trim().split('\n').filter(Boolean)
	const response = await fetch('https://localhost:5176/api/ping', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(urls)
	});

	const data = await response.json();

	console.log("Backend válasz:", data);
});


