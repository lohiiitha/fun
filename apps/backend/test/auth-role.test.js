import test from 'node:test';
import assert from 'node:assert/strict';
import { hasRequiredRole } from '../src/middleware/auth.js';

test('hasRequiredRole allows unrestricted routes', () => {
  assert.equal(hasRequiredRole('STUDENT', []), true);
});

test('hasRequiredRole validates role lists', () => {
  assert.equal(hasRequiredRole('TEACHER', ['ADMIN', 'TEACHER']), true);
  assert.equal(hasRequiredRole('PARENT', ['ADMIN', 'TEACHER']), false);
});
