var score = 0;
var limit = 100;
var storageKey = 'jur-proj';

var items = [ 
	{ id: 1, title: 'At een wodka', points: 10, finished: false },
	{ id: 2, title: 'At een wodka', points: 10, finished: false },
	{ id: 3, title: 'At een wodka', points: 10, finished: false },
	{ id: 4, title: 'Drink een glas melk in een \'bar mleczny\'', points: 15, finished: false },
	{ id: 5, title: 'Drink een Żubrówka-appelsap', points: 15, finished: false },
	{ id: 6, title: 'Eet een placki ziemniaczane', points: 15, finished: false },
	{ id: 7, title: 'Maak een geposeerde groepsselfie met minimaal 8 Polen', points: 20, finished: false },
	{ id: 8, title: 'Kniel en bid voor een gezegend huwelijk in de Mariakerk', points: 20, finished: false },
	{ id: 9, title: 'Zing uit volle borst een Nederlands lied op Dlugi Targ', points: 20, finished: false }
];

function createItem(data) {
	var div = document.createElement('div');
	var text = document.createTextNode(data.title);
	div.appendChild(text);
	div.className = 'item';
	div.id = 'item-' + data.id;
	div.onclick = function() {
		onItemClick(data.id);
	}
	if (data.finished) {
		div.className += ' done';
		score += data.points;
	}
	document.getElementsByClassName('container')[0].appendChild(div);
}

function onItemClick(id) {
	var element = document.getElementById('item-' + id);
	items.forEach(function(item) {
		if (item.id === id) {
			item.finished = !item.finished; 
			if (item.finished) {
				score += item.points;
				element.className += ' done';
			} else {
				score -= item.points;
				element.className = element.className.replace('done', '').trim();
			}
			setScore();
			localStorage.setItem(storageKey, JSON.stringify(items));
		}
	});
}

function setScore() {
	document.getElementById('score').innerHTML = score + '/' + limit; 
	if (score >= limit) {
		if (document.body.className.indexOf('win') < 0) {
			document.body.className = 'win';
		}
	} else {
		if (document.body.className.indexOf('win') >= 0) {
			document.body.className = '';
		}
	}
}

function init() {
	var cache = localStorage.getItem(storageKey);
	if (cache != null) {
		items = JSON.parse(cache);
	}
	items.forEach(function(item) {
		createItem(item);
	});
	setScore();
}

init();
