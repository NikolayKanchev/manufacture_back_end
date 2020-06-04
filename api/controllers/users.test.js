const { login } = require('./users');


describe("user tests", () => {
    beforeEach(jest.clearAllMocks);

    describe('login', () => {

        it('should be defined', () => {
            expect(login).toBeDefined();
        });

    })

})



