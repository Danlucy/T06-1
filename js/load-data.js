// load-data.js
// Loads the dataset at data/Ex6_TVdata.csv and returns a Promise that resolves
// to an array of parsed objects. Intended to be called after d3 is available.


	d3.csv('data/Ex6_TVdata.csv', function(row) {
		// The CSV columns are: brand, model, screenSize, screenTech, energyConsumption, star
		const brand = row.brand;
		const model = row.model;
		const screenTech = row.screenTech;

		const screenSize = (row.screenSize === undefined || row.screenSize === '')
			? null
			: +row.screenSize.toString().replace(/[^0-9.\-]/g, '');

		const energyConsumption = (row.energyConsumption === undefined || row.energyConsumption === '')
			? null
			: +row.energyConsumption.toString().replace(/[^0-9.\-]/g, '');

		const star = (row.star === undefined || row.star === '')
			? null
			: +row.star.toString().replace(/[^0-9.\-]/g, '');

		return {
			brand,
			model,
			screenSize,
			screenTech,
			energyConsumption,
			star
		};

	}).then(data => {
		console.log('Data loaded successfully:', data);
        drawHistogram(data);
	}).catch(err => {
        console.error('Error loading or parsing data:', err);
    });


// Expose as a global function for the non-module script usage in index.html
