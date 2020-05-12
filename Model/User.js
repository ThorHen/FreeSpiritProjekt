class User {
    constructor(admin, name, email, username, password, permissions, title) {
        this.admin = admin;
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.permissions = permissions;
        this.title = title;

    }
}

module.exports = {User};