class User {
    constructor(admin, name, email, username, password, permissions, titles) {
        this.admin = admin;
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.permissions = permissions;
        this.titles = titles;

    }
}

module.exports = {User};