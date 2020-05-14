//Setup of testing environment
const assert = require('chai').assert;
const expect = require('chai').expect;
const bcrypt = require('bcrypt');

//Functions to test
const {saltAndHashPassword, comparePassword, login} = require('../Controllers/LoginController');

describe('Test suite for Login functionalities', () => {
    const plaintextPassword = '123password';
    let hashObj;

    //Create hashObj to test with from given plaintext password
    before(async () => {
        hashObj = await saltAndHashPassword(plaintextPassword);
    })

    describe('Test suite for saltAndHashPassword(plaintextPassword)', () => {
        it('Assert whether hashObj (promise) exists', () => {
            assert.isDefined(hashObj);
        })

        it('Assert whether hashObj has salt property and type is String', () => {
            assert.isString(hashObj.salt);
        })

        it('Assert whether hashObj has hashedPassword property and type is String', () => {
            assert.isString(hashObj.hashedPassword);
        })
    })

    describe('Test suite for comparePassword(plaintextPassword, hashedPassword)', () => {

        it('Assert that correct plaintext password returns true', async () => {
            const isCorrectPass = await comparePassword(plaintextPassword, hashObj.hashedPassword);
            assert.isTrue(isCorrectPass);
        });
        
        it('Assert that incorrect plaintext password returns false', async () => {
            const isCorrectPass = await comparePassword('differentPassword', hashObj.hashedPassword);
            assert.isFalse(isCorrectPass);
        });

        it('Assert that correct plaintext password, but wrong hash returns false', async () => {
            const isCorrectPass = await comparePassword(plaintextPassword, 'ijfdoaidj+101i23jolm');
            assert.isFalse(isCorrectPass);
        });
    })

    describe('Test suite for login(username, plaintextPassword)', () => {
        it('should assert true with valid password', async () => {
            const validLogin = await login('testUser1', plaintextPassword);
            assert.isTrue(validLogin);
        })

        it('should assert false with invalid password', async () => {
            const validLogin = await login('testUser1', 'notPassword');
            assert.isFalse(validLogin);
        });
    })
});