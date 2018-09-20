import Vue from "vue";

const requireComponent = require.context(".", false, /.\.vue$/);

requireComponent.keys().forEach(fileName => {

    const componentConfig = requireComponent(fileName);

    Vue.component(componentConfig.default.name, componentConfig.default);

});