const assert = require('chai').assert
const { getUsernames, deleteUser, getSpecificUserData, editUserData } = require('../Controllers/AdminController')
const { createNewUser } = require('../Controllers/UserController');
before (async () => {
    await createNewUser(true, 'Slet1', 'Admin1@freespirit.dk',
        'Slet1', '123', ['Barre', 'Yoga', 'Reformer'], ['Leder'])
    await editUserData('admin2', '1', 'Admin1@freespirit.dk', 'admin2',
    ['Barre', 'Yoga', 'Reformer'], ['Leder'], 'admin2')
})

describe('Test of edit user in database', () => {
    it('Get Admin1\'s data in the database', async () => {
        result = await getSpecificUserData('admin2');
        expected = [
            '1', 'Admin1@freespirit.dk', 'admin2',
         ['Barre', 'Yoga', 'Reformer'], ['Leder'], 'admin2'
        ]

        assert.deepEqual(result, expected)

    })
    it('User Admin2\'s email has been edited', async () => {
        await editUserData('admin2', '1', 'succesfulTest@freespirit.dk',
            'admin2', ['Barre', 'Yoga', 'Reformer'], ['Leder'], 'admin2')
        result = await getSpecificUserData('admin2')
        assert.equal(result[1], 'succesfulTest@freespirit.dk')
    })
})

describe('Test of delete user in database', () => {
    it('User slet1 exists in the database', async () => {
        result = await getSpecificUserData('Slet1')
        assert.equal(result[2], 'Slet1')
    })
    it('User slet1 has been deleted from database', async () => {
        await deleteUser('Slet1')
        result = await getUsernames();
        assert.equal(result.includes('Slet1'), false)
    })
})

