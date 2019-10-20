module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./_site/images");

  // Because of #677
  eleventyConfig.setUseGitIgnore(false);

  return {
    templateFormats: ["md", "njk", "html"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: "/",

    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "_site",
      includes: "_templates",
      data: "_data",
      output: "dist"
    }
  };
};
