import path from "path";
import { fileURLToPath } from "url";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    assetModuleFilename: path.join("images", "[name].[contenthash][ext]"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/style.css",
      chunkFilename: "[id].css",
    }),
  ],
  externalsType: "script",
  externals: {
    ymaps3: [
      "https://api-maps.yandex.ru/v3/?apikey=b053285a-f157-45bf-9726-cec55b7deb89&lang=ru_RU",
      "ymaps3",
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
    hot: true,
    open: true,
    client: {
      overlay: true,
    },
  },
  resolve: {
    extensions: [".js", ".jsx", ".css"],
  },
};
