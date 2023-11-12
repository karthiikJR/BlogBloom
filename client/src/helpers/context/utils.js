export function renderProperDate({ createdAt}) {
	const utcDate = new Date(createdAt);

	// Convert to IST
	const istOptions = {
		timeZone: "Asia/Kolkata",
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};

	const istDate = new Intl.DateTimeFormat("en-US", istOptions).format(utcDate);
	return istDate;
}
