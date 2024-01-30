const { When, Then } = require('@cucumber/cucumber');
const assert = require('assert');
const request = require('supertest');

const BASE_URL = 'http://localhost:5001';
let response;

When('eu faço uma requisição GET para {string}', async function (url) {
    response = await request(BASE_URL).get(url);
});

Then('eu recebo uma resposta com status {int}', function (expectedStatus) {
    assert.equal(response.status, expectedStatus);
});

Then('a lista de pagamentos é retornada com sucesso', function () {
    assert.ok(Array.isArray(response.body.dados));
});
