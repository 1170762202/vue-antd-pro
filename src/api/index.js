const api = {
    BASE_URL: 'http://192.168.0.253:8080',
    Login: '/login/wx',
    Logout: '/auth/logout',
    ForgePassword: '/auth/forge-password',
    Register: '/auth/register',
    twoStepCode: '/auth/2step-code',
    SendSms: '/account/sms',
    SendSmsErr: '/account/sms_err',
    // get my info
    UserInfo: '/user/info'
};

export default api
