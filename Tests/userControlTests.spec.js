const assert = require('chai').assert
const { getUserNames, deleteUser, getSpecificUserData, editUserData } = require('../Controllers/AdminController')

before(async () => {
    await editUserData('Admin1', true, 'Admin1@freespirit.dk',
        'Admin1', ['Barre', 'Yoga', 'Reformer'], 'Leder', 'A1')
})

describe('Test of delete user in database', () => {
    it('User slet1 exists in the database', async () => {
        result = await getSpecificUserData('Slet1')
        assert.equal(result[2], 'Slet1')
    })
    // TODO 
    // it('User slet1 has been deleted from database', async () => {
    //     await deleteUser('Slet1')
    //     result = await getUserNames();
    //     assert.equal(result.includes('Slet1'), false)
    // })
})

describe('Test of edit user in database', () => {
    it('Get Admin1\'s data in the database', async () => {
        result = await getSpecificUserData('Admin1');
        expected = [
            true,
            'Admin1@freespirit.dk',
            'Admin1',
            ['Barre', 'Yoga', 'Reformer'],
            'Leder',
            'A1'
        ]

        assert.deepEqual(result, expected)

    })
    it('User Admin1\'s email has been edited', async () => {
        await editUserData('Admin1', true, 'succesfulTest@freespirit.dk',
            'Admin1', ['Barre', 'Yoga', 'Reformer'], 'Leder', 'A1')
        result = await getSpecificUserData('Admin1')
        assert.equal(result[1], 'succesfulTest@freespirit.dk')
    })
})