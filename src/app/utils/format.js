const dateFormatter = new Intl.DateTimeFormat("es-ES", {
	weekday: "long",
	day: "numeric",
	month: "long",
	year: "numeric",
});

const numberFormatter = new Intl.NumberFormat("es-ES");

const percentFormatter = new Intl.NumberFormat("es-ES", {
	style: "percent",
	maximumFractionDigits: 1,
});

export function formatToday(date = new Date()) {
	const label = dateFormatter.format(date);
	return label.charAt(0).toUpperCase() + label.slice(1);
}

export function formatNumber(value) {
	return numberFormatter.format(value);
}

export function formatPercent(value) {
	return percentFormatter.format(value);
}
