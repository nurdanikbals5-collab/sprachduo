const { test } = require('node:test');
const assert = require('node:assert/strict');
const core = require('../assets/js/core.js');
const me = { id: 'me', speaks: 'English', learns: 'German', level: 'A2', availability: ['0-2', '2-2'], interests: ['Cooking'] };
const person = { id: 'lena', name: 'Lena', speaks: 'German', learns: 'English', level: 'A2', availability: ['0-2', '2-2'], interests: ['Cooking'], format: 'in-person' };

test('only reciprocal language pairs are ranked; blocks work in both directions', () => {
  assert.equal(core.fit(me, { ...person, learns: 'Spanish' }), null);
  assert.equal(core.fit(me, person, ['lena']), null);
  assert.equal(core.fit(me, { ...person, blocked: ['me'] }), null);
});
test('fit uses the concept weights and does not count duplicate times or interests', () => {
  const result = core.fit({ ...me, availability: ['0-2', '0-2', '2-2'], interests: ['Cooking', 'Cooking'] }, person);
  assert.equal(result.score, 70);
  assert.deepEqual(result.times, ['0-2', '2-2']);
});
test('missing availability produces a provisional fit', () => {
  assert.equal(core.fit({ ...me, availability: [] }, person).provisional, true);
});
test('search respects format and ranks best fit first', () => {
  const lower = { ...person, id: 'b', name: 'B', level: 'B2', availability: [], format: 'online' };
  assert.deepEqual(core.search(me, [lower, person], { format: 'in-person' }).map(r => r.person.id), ['lena']);
  assert.equal(core.search(me, [lower, person])[0].person.id, 'lena');
});
test('a duplicate request is refused for seven days, with the boundary allowed', () => {
  const requests = core.sendRequest([], 'me', 'lena', 'Hello', 1000);
  assert.throws(() => core.sendRequest(requests, 'me', 'lena', 'Again', 2000), /seven days/);
  assert.equal(core.sendRequest(requests, 'me', 'lena', 'Later', 1000 + 7 * 86400000).length, 2);
  assert.throws(() => core.sendRequest([], 'me', 'lena', 'x'.repeat(201)), /200/);
});
test('only the recipient can answer a pending request; decline never becomes a match', () => {
  const requests = core.sendRequest([], 'marta', 'me', 'Hi', 1000);
  assert.throws(() => core.respond(requests, requests[0].id, 'other', 'accepted'), /no longer/);
  const declined = core.respond(requests, requests[0].id, 'me', 'declined');
  assert.equal(declined[0].status, 'declined');
  assert.throws(() => core.respond(declined, requests[0].id, 'me', 'accepted'), /no longer/);
});
test('joining is reversible and a full event refuses another attendee', () => {
  const event = { id: 'cafe', attendees: 12, capacity: 20 };
  assert.deepEqual(core.toggleAttendance([], event), ['cafe']);
  assert.deepEqual(core.toggleAttendance(['cafe'], event), []);
  assert.throws(() => core.toggleAttendance([], { ...event, attendees: 20 }), /full/);
});
