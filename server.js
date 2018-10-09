const bodyParser = require('body-parser')
const express = require('express')
const puppeteer = require('puppeteer')

const cookie = {
	name: 'name',
	value: 'value',
	domain: 'localhost',
	path: '/',
};

async function visit (url) {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox']
	})
	var page = await browser.newPage()
	page.setCookie(cookie)
	await page.goto(url)
	await page.close()
	await browser.close()
}

const app = express()
app.use(bodyParser.urlencoded({
	extended: true
}))

app.post('/', (req, res) => {
	visit(req.body.url)
	res.end()
})

app.listen(3000)