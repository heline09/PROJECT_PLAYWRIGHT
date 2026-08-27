exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.username_textbox = page.getByPlaceholder('Username');
        this.password_textbox = page.getByPlaceholder('Password');
        this.login_button = page.getByRole('button', { name: 'Login' });
        this.error_message = page.locator('[data-test="error"]');

        //logout locators
        this.menu_button = page.getByRole('button', { name: 'Open Menu' });
        this.logout_link = page.getByRole('link', { name: 'Logout' });
    }

    async gotoLoginPage() {
        await this.page.goto('https://www.saucedemo.com');
    }

    async login(username, password) {
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click();
    }
    async logout() {
        await this.menu_button.click();
        await this.logout_link.click();

    }
}


