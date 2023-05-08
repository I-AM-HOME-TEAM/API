class UserRepository {
    constructor() {
        this.users = [];
    }

    async findByEmail(email) {
        const user = this.users.find((user) => user.email === email);
        return user || null;
    }

    async save(user) {
        user.id = this.users.length + 1;
        this.users.push(user);
    }
}

module.exports = UserRepository;

