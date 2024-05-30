import ElementPlus from "./element-plus";

const modules = [ElementPlus];

export default function register(app) {
  modules.map((module) => {
    module(app);
  });
}
