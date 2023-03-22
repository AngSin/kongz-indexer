const axios = require('axios');
const fs = require('fs');

const backendUrl = "https://api.cyberkongz.com/kong";

const KongzTree = {};

const fetchKongz = async() => {
	for (let i = 1_001; i < 5_001; i++) {
		const { data: { kong } } = await axios.get(`${backendUrl}/${i}`);
		if (kong.matron_id) {
			KongzTree[kong.matron_id] = [
				...KongzTree[kong.matron_id] || [],
				kong.id,
			];
		}
		if (kong.sire_id) {
			KongzTree[kong.sire_id] = [
				...KongzTree[kong.sire_id] || [],
				kong.id,
			];
		}
	}
}


fetchKongz().then(() => {
	fs.writeFileSync(`./KongzTree.json`, JSON.stringify(KongzTree));
});

