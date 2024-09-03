describe("detox test", () => {
    beforeAll(async () => {
        await device.launchApp({ newInstance: true });

        await device.openURL({
            url: `exp+areaapplication://expo-development-client/?url=${encodeURIComponent(
                `http://localhost:8081`
            )}`,
        });
    });

    beforeEach(async () => {
        await device.reloadReactNative();
    });

    it("should have login screen", async () => {
        await expect(element(by.id("Login"))).toBeVisible();
    });

    it("should login", async () => {
        await element(by.id("login-email")).tap();
        await element(by.id("login-email")).typeText("test@gmail.com");
        await element(by.id("login-password")).tap();
        await element(by.id("login-password")).typeText("123456");
        await element(by.id("login-button")).tap();
        await expect(element(by.id("home-screen"))).toBeVisible();
    });

    it("should register", async () => {
        await element(by.id("signup-button")).tap();
        await element(by.id("signup-username")).tap();
        await element(by.id("signup-username")).typeText("test");
        await element(by.id("signup-email")).tap();
        await element(by.id("signup-email")).typeText("test@gmail.com");
        await element(by.id("signup-password")).tap();
        await element(by.id("signup-password")).typeText("123456test");
        await element(by.id("signup-button")).tap();
        await expect(element(by.id("home-screen"))).toBeVisible();
    });

    it("should view api details", async () => {
        await element(by.id("login-email")).tap();
        await element(by.id("login-email")).typeText("test@gmail.com");
        await element(by.id("login-password")).tap();
        await element(by.id("login-password")).typeText("123456");
        await element(by.id("login-button")).tap();
        await element(by.id("tab-apilist")).tap();
        await expect(element(by.id("apilist-screen"))).toBeVisible();
        await element(by.id("apilist-flatlist")).tap();
    });

    it("should view api config screen", async () => {
        await element(by.id("login-email")).tap();
        await element(by.id("login-email")).typeText("test@gmail.com");
        await element(by.id("login-password")).tap();
        await element(by.id("login-password")).typeText("123456");
        await element(by.id("login-button")).tap();
        await element(by.id("tab-configapi")).tap();
        await expect(element(by.id("configapi-screen"))).toBeVisible();
    });

    it("should change password", async () => {
        await element(by.id("login-email")).tap();
        await element(by.id("login-email")).typeText("test@gmail.com");
        await element(by.id("login-password")).tap();
        await element(by.id("login-password")).typeText("123456");
        await element(by.id("login-button")).tap();
        await element(by.id("tab-profile")).tap();
        await element(by.id("profile-current-password")).tap();
        await element(by.id("profile-current-password")).typeText("123456test");
        await element(by.id("profile-new-password")).tap();
        await element(by.id("profile-new-password")).typeText("123456newpassword");
        await element(by.id("profile-change-password")).tap();
    });

    it("should logout", async () => {
        await element(by.id("login-email")).tap();
        await element(by.id("login-email")).typeText("test@gmail.com");
        await element(by.id("login-password")).tap();
        await element(by.id("login-password")).typeText("123456");
        await element(by.id("login-button")).tap();
        await element(by.id("tab-profile")).tap();
        await expect(element(by.id("profile-screen"))).toBeVisible();
        await element(by.id("profile-logout")).tap();
        await expect(element(by.id("login-screen"))).toBeVisible();
    });
});
