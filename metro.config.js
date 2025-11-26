const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Isso diz ao Metro para processar o seu arquivo global.css
module.exports = withNativeWind(config, { input: "./global.css" });