//Setup of testing environment
const assert = require('chai').assert;
const expect = require('chai').expect;

const createNewUser = require('../Controllers/UserController').createNewUser;

describe('Test suite for UserController', () => {

    describe('Test suite for createNewUser()', () => {
        let returnedUser;

        before(async () => {
            returnedUser = await createNewUser('1', 'Thor Henriksen', 'dummy@mail.com', 'MrThoreh', '123pass', ['Yoga', 'Pilates'], ['Instruktoer']);
        })
        it('should create new user', async () => {
            assert.isDefined(returnedUser);
        })

        it('should have correct admin', () => {
            assert.equal(returnedUser.admin, '1');
        })

        it('should have correct name', () => {
            assert.equal(returnedUser.name, 'Thor Henriksen');
        })

        it('should have correct email', () => {
            assert.equal(returnedUser.email, 'dummy@mail.com');
        })

        it('should have correct username', () => {
            assert.equal(returnedUser.username, 'MrThoreh');
        })

        it('should have correct permissions', () => {
            assert.equal(returnedUser.permissions, ['Yoga', 'Pilates']);
        })

        it('should have correct titles', () => {
            assert.equal(returnedUser.titles, ['Instruktoer']);
        })

        after(() => {
            //delete returnedUser from db
        })
    })
})