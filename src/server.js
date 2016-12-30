import express from 'express';
import bodyParser from 'body-parser';
import Datastore from 'nedb';

const awesomeDataStore = new Datastore({ filename: './db.json' });
const app = new express();

awesomeDataStore.loadDatabase();

app.use(bodyParser({}));

app.get('/api/distance/:id', (request, response) => {
	awesomeDataStore.find({ beaconId: request.params.id }, (err, docs) => {
		if (err) {
			response.status(500).send({ result: "error when retrieving" });
		}
		
		if (docs) {
			response.status(200).send({result: docs});
		}
	});
});

app.post('/api/distance', (request, response) => {
	const { distance } = request.body;
	if (distance) {
        console.info("Entrando if(distance)");
		awesomeDataStore.insert(distance, (err, newDoc) => {
		    if (err) {
				response.status(500).send({ result: "error on insert!" });
			}
			
			if (newDoc) {
				response.status(200).send({result: newDoc});
			}
		});

	} else {
		response.status(400).send({ result: "bad request" });
	}
});

app.listen(8080, (err) => {
	if (err) {
		console.error(`Hay error la concha tuya -> ${err}`);
	}
	
	console.info('Todo esta bien, gato');
});