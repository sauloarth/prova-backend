const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const secret = 'POS-DESENVOLVIMENTO_MOBILE';
const tasks = [];
let id = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send({message:'ok'});
})

app.post('/login', (req, res, next) => {
	const {username, password} = req.body;

	if(username === 'usuario' && password ==='123456'){
	 const token = jwt.sign({username}, secret);
		res.status(200).send({token: token});
	}
	res.status(401).send({message: 'Error in username or password'});
})

app.post('/tasks', (req, res) => {
	const newId = ++id;
	tasks.push({id: newId, ...req.body});
	const newTask = tasks.find(task => task.id === newId);

	res.status(201).send(newTask);
})

app.get('/tasks', (req, res) => {
	res.send(tasks);
})

app.put('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const taskIndex = tasks.findIndex(task => task.id === id);
	const updatedTask = {id: id, ... req.body};
	tasks[taskIndex] = updatedTask;
	res.send(tasks[taskIndex]);
})


app.get('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const taskIndex = tasks.findIndex(task => task.id === id);
	res.send(tasks[taskIndex]);
})

app.delete('/tasks/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const index = tasks.findIndex(task => task.id === id);
	const task = tasks[index];
	tasks.splice(index, 1);
	res.send(task);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
}
)
