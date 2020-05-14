//Setup of testing environment
const {assert, expect} = require('chai');
const {createNewUser, getUserType} = require('../Controllers/UserController');
const { deleteUser } = require('../Controllers/AdminController');

describe('Test suite for UserController', () => {

    describe('Test suite for createNewUser()', () => {
        let returnedUser;

        before(async () => {
            returnedUser = await createNewUser('1', 'Thor Henriksen', 'dummy@mail.com', 'MrThoreh', '123pass', ['Yoga', 'Pilates'], ['Instruktoer']);
        })
        it('should create new user', async () => {
            assert.isDefined(returnedUser);
        })

        it('should have correct admin status', () => {
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

        it('should have correct yoga permission', () => {
            assert.isTrue(returnedUser.permissions.includes('Yoga'));
        })

        it('should have correct pilates permission', () => {
            assert.isTrue(returnedUser.permissions.includes('Pilates'));
        })

        it('should have correct titles', () => {
            assert.isTrue(returnedUser.titles.includes('Instruktoer'));
        })

        after(() => {
            deleteUser(returnedUser.username);
        })
    })

    describe('Test suite for getUserType', () => {
        let result;
        before(async () => {
            result = await getUserType('Thoreh');
        })
        it('Thoreh access is reformer and barre', async () => {
            assert.equal(result.permissions.includes('Reformer'), true);
        })
        it('Thoreh has access to barre', () => {
            assert.equal(result.permissions.includes('Barre'), true);
        })
    })
})