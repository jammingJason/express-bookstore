process.env.NODE_ENV = 'test';

const db = require('../db');
const Book = require('../models/book');
// const User = require('../models/books');

describe('Test Message class', function () {
  beforeEach(async function () {
    await db.query('DELETE FROM books');

    await Book.create({
      isbn: '0691161518',
      amazon_url: 'http://a.co/eobPtX2',
      author: 'Matthew Lane',
      language: 'english',
      pages: 264,
      publisher: 'Princeton University Press',
      title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      year: 2017,
    });
  });

  test('can create', async function () {
    let b = await Book.create({
      isbn: 'test_0691161518',
      amazon_url: 'http://a.co/eobPtY2',
      author: 'Matthew Lane',
      language: 'english',
      pages: 100,
      publisher: 'Princeton University Press',
      title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      year: 2020,
    });

    expect(b).toEqual({
      isbn: 'test_0691161518',
      amazon_url: 'http://a.co/eobPtY2',
      author: 'Matthew Lane',
      language: 'english',
      pages: expect.any(Number),
      publisher: 'Princeton University Press',
      title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      year: expect.any(Number),
    });
  });

  test('can remove', async function () {
    const b = await Book.remove('0691161518');
    expect(b).toEqual({ message: 'Book deleted' });
  });

  test('can update', async function () {
    const b = await Book.update('0691161518', {
      isbn: '0691161518',
      amazon_url: 'http://a.co/eobPtX2',
      author: 'Matthew Test',
      language: 'english',
      pages: 264,
      publisher: 'Princeton University Press',
      title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      year: 2017,
    });
    expect(b).toEqual({
      isbn: '0691161518',
      amazon_url: 'http://a.co/eobPtX2',
      author: 'Matthew Test',
      language: 'english',
      pages: 264,
      publisher: 'Princeton University Press',
      title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      year: 2017,
    });
  });

  test('can get', async function () {
    let b = await Book.findOne('0691161518');
    expect(b).toEqual({
      isbn: '0691161518',
      amazon_url: 'http://a.co/eobPtX2',
      author: 'Matthew Lane',
      language: 'english',
      pages: expect.any(Number),
      publisher: 'Princeton University Press',
      title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
      year: expect.any(Number),
    });
  });
});

afterAll(async function () {
  await db.end();
});
