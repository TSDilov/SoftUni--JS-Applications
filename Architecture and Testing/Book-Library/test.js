const { chromium, request } = require('playwright-chromium');
const { expect } = require('chai');

const mockData = {
    "d953e5fb-a585-4d6b-92d3-ee90697398a0":{
        "author":"J.K.Rowling",
        "title":"Harry Potter and the Philosopher's Stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a1": {
        "author":"Svetlin Nakov",
        "title":"C# Fundamentals"
    }
}

function json(data) {
    return {
        status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify(data)
    };
}

let browser, page;
describe('tests preparation', function () {
	this.timeout(6000);
	before(async () => {
		browser = await chromium.launch();
		// browser = await chromium.launch({ headless: false, slowMo: 1000 })
	})
	after(async () => { await browser.close() });
	beforeEach(async () => {
		page = await browser.newPage();
		await page.goto('http://localhost:5500');
	})
	afterEach(async () => { await page.close() });


	// TESTS
	describe('e2e tests', () => {
		it('load books properly', async () => {
			await page.route('**/jsonstore/collections/books*', (route) => {
				route.fulfill(json(mockData))
			})

			await page.click('text=Load All Books');
			await page.waitForSelector('text=Harry Potter');
            const rows = await page.$$eval('tr', (rows) => rows.map(r => r.textContent.trim()));

            expect(rows[1]).to.contains('Harry Potter');
            expect(rows[1]).to.contains('Rowling');
            expect(rows[2]).to.contains('C# Fundamentals');
            expect(rows[2]).to.contains('Nakov');

		});
		it(`adds book properly `, async () => {
			await page.route('**/jsonstore/collections/books*', request => {
				request.fulfill(json({ title: 'title', author: 'author' }));
			})

			await page.fill('#createForm > [name="title"]', 'title');
			await page.fill('#createForm > [name="author"]', 'author');

			const [response] = await Promise.all([
				page.waitForRequest(r => r.url()
					.includes('/jsonstore/collections/books') && r.method() === 'POST'),
				page.click('text="Submit"')
			]);

			expect(JSON.parse(response.postData())).to.deep.eq({ title: 'title', author: 'author' });
		});
	})
	it(`testing delete functionality`, async () => {

		// not working, on dialog confirm it doesnt send request.
		// not gonna dig further wasted 2 hours + for this test.
		await page.route('**/jsonstore/collections/books*', request => {
			request.fulfill(json(mockData));
		})
		await page.route(
			'**/jsonstore/collections/books/*',
			request => request.fulfill(json({ message: 'book deleted' }))
		);
		await page.click('#loadBooks');

		await page.once('dialog', async dialog => {
			await dialog.accept();
		})

		//
		const [response] = await Promise.all([
			page.waitForResponse(r => r.request().url().includes('/jsonstore/collections/books/') &&
				r.request().method() === 'DELETE'),
			page.click('.deleteBtn:nth-child(2)')
		]);

		const data = JSON.parse(await response.body());
		expect(data).to.deep.eq({ message: 'book deleted' });
	})
	describe(`edit tests`, () => {
		it(`loads correct form`, async () => {
			await page.route('**/jsonstore/collections/books*', request =>
				request.fulfill(json(mockData)));
			await page.click('#loadBooks');
			await page.click('.editBtn:nth-child(1)');


			const editFormDisplay = await page.$eval('#editForm', el => el.style.display);
			const createFormDisplay = await page.$eval(
				'#createForm',
				el => el.style.display
			);

			expect(editFormDisplay).to.eq('block');
			expect(createFormDisplay).to.eq('none');
		})
		it(`loads correct information`, async () => {
			await page.route('**/jsonstore/collections/books*', request => {
				request.fulfill(json(mockData));
			})
			await page.route('**/jsonstore/collections/books/*', request => {
				request.fulfill(json({ title: 'title', author: 'author' }))
			});
			await page.click('#loadBooks');
			await page.click('.editBtn:nth-child(1)');

			const [response] = await Promise.all([
				page.waitForResponse(r => r.request().url()
					.includes('/jsonstore/collections/books/')),
				page.click('text="Save"')
			]);
			const data = JSON.parse(await response.body());

			expect(data.title).to.eq('title');
			expect(data.author).to.eq('author');
		})
		it(`sends correct request`, async () => {
			await page.route('**/jsonstore/collections/books*', request => {
				request.fulfill(json(mockData));
			})
			await page.route(
				'**/jsonstore/collections/books/*',
				request => request.fulfill(json({
					'title': 'title',
					'author': 'author'
				}))
			);

			await page.click('#loadBooks');
			await page.click('.editBtn:nth-child(1)');


			const [response] = await Promise.all([
				page.waitForResponse(r => r.request().url()
					.includes('/jsonstore/collections/books/') && r.request().method() === 'PUT'),
				page.click('text="Save"')
			]);
			const data = JSON.parse(await response.body());
			expect(data).to.deep
				.eq({
					title: 'title',
					author: 'author'
				})
		});
	});
});
