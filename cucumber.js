let common = [
    '--require-module ts-node/register',
    'test/features/*.feature',
    '--require test/features/steps/*.js',
].join(' ');

module.exports = {
    default: common
};
