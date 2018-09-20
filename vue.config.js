module.exports = {
    productionSourceMap: false,
    
    filenameHashing: false,

    runtimeCompiler: false,

    css: {
        extract: false
    },

    baseUrl: "/admin/",

    configureWebpack: {
        output: {
            filename: "saleina-cms.min.js"
        }
    },

    chainWebpack: config => {

        config.optimization.delete("splitChunks");

        const svgRule = config.module.rule('svg');

        svgRule.uses.clear();

        svgRule
        .use("vue-svg-loader")
        .loader("vue-svg-loader");

    }
    
}