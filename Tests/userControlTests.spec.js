const assert = require('chai').assert
const { getUserNames, deleteUser } = require('../Controllers/AdminController')

before(async () => {

})

describe('Test of delete user in database', () => {
    it('User slet1 exists in the database', async () => {
        result = await getUserNames();
        assert.equal(result.includes('Slet1'), true)
    })
    it('User slet1 has been deleted from database', async () => {
        await deleteUser('Slet1')
        result = await getUserNames();
        assert.equal(result.includes('Slet1'), false)
    })
})