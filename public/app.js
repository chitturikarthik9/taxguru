async function checkHealth() {
	const outputElement = document.getElementById("healthOut");
	outputElement.textContent = "Checking...";
	try {
		const response = await fetch("/api/health");
		const data = await response.json();
		outputElement.textContent = JSON.stringify(data, null, 2);
	} catch (error) {
		outputElement.textContent = `Error: ${error.message}`;
	}
}

async function submitEcho(event) {
	event.preventDefault();
	const form = event.currentTarget;
	const formData = new FormData(form);
	const message = formData.get("message");
	const outputElement = document.getElementById("echoOut");
	outputElement.textContent = "Sending...";

	try {
		const response = await fetch("/api/echo", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message })
		});
		const data = await response.json();
		outputElement.textContent = JSON.stringify(data, null, 2);
	} catch (error) {
		outputElement.textContent = `Error: ${error.message}`;
	}
}

function bindEvents() {
	document.getElementById("healthBtn").addEventListener("click", checkHealth);
	document.getElementById("echoForm").addEventListener("submit", submitEcho);
}

document.addEventListener("DOMContentLoaded", bindEvents);

