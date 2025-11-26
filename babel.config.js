module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // O reanimated precisa ser o último plugin da lista
    plugins: ["react-native-reanimated/plugin"],
  };
};