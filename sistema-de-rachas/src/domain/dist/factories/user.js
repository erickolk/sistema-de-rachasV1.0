"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const entities_1 = require("../entities");
const enums_1 = require("../enums");
const uid_1 = require("uid");
const faker_1 = require("@faker-js/faker");
class UserFactory {
    static createUser(params) {
        const defaultParams = {
            id: (0, uid_1.uid)(),
            name: faker_1.faker.person.fullName(),
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password({ length: 8 }),
            role: faker_1.faker.helpers.arrayElement([
                enums_1.UserRoleEnum.CLIENT,
                enums_1.UserRoleEnum.OWNER,
            ]),
            photoUrl: faker_1.faker.image.avatar(),
        };
        const userParams = { ...defaultParams, ...params };
        return new entities_1.User(userParams);
    }
}
exports.UserFactory = UserFactory;
