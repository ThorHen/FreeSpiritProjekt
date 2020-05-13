const assert = require('chai').assert
const { getUserNames } = require('../Controllers/AdminController')
const {getSpecificUserPassword}=require('../Controllers/LoginController')

let result = []
before(async () => {
    result = await getUserNames();
})
describe('Test of getting users from DB', () => {
    it('Person1 exists in the database', () => {
        assert.equal(result.includes('Person1'), true)
    })
    it('Thor does not exist in the database', () => {
        assert.equal(result.includes('Thor'), false)
    })
    it('Returns specific names in DB', () => {
        assert.equal(result.includes('Anna', 0), true)
        assert.equal(result.includes('Person1', 1), true)
        assert.equal(result.includes('Tester2', 2), false)
    })
})
describe('Test get user password', () => {
    it('Returns correct password', async () => {
        const password = await getSpecificUserPassword('testUser1')
        assert.equal(password, '$2b$12$LXvAfHtMdVnk.r6tEyUTQuW5Wwe1DayfxxZwE1dvBjl98Tnx7VwTa')
    })
})