function EnvConfiguration() {
    return {
        environment: process.env.NODE_ENV || 'dev',
        mongodb: process.env.MONGODB,
        port: process.env.PORT || 5000,
        defaultLimit: +process.env.DEFAULT_LIMIT || 10,
    };
};

export default EnvConfiguration;