import Papa from 'papaparse';

export const load = async ({ fetch }) => {
	const res = await fetch('static/data.csv', {
		headers: {
			'Content-Type': 'text/csv'
		}
	});
	let csvSkills = await res.text();
	let parsedCsvSkills = Papa.parse(csvSkills, { header: true });

	return {
		skills: parsedCsvSkills.data
	};
};
