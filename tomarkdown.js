const fs = require('fs')
const path = require('path')
const toMarkdown = require('to-markdown');
const sanitizeHtml = require('sanitize-html');
const program = require('commander');
const toc = require('markdown-toc');

program
  .version('0.0.1')
  .option('-i, --inputDirectory <path>', 'Input directory containing HTML files to convert to Markdown')
  .option('-t, --title <title>', 'Document title defaults to no title')
  .option('-o, --outputFilePath <path>', 'Output file path. Complete file path like /path/to/file.md')
  .parseOptions(process.argv);


// CLI Params
var baseInputDirectory = program.inputDirectory;
var title = program.title;
var baseOutputDirectory = program.outputFilePath;


// Helper function the get an array of filenames in directory
function getFiles (srcpath) {
  return fs.readdirSync(srcpath)
}



// Removing index since we won't use it
var filesToConvert = getFiles(baseInputDirectory).filter((item) => {
  return item !== 'index.partial.ejs';
});

console.log("ECCO IL LISTONE",filesToConvert)

// Pages we need to put before others, they will be placed in this order
var specialSections = ['introduction','installation','authentication','promises','sorting'];

specialSections = specialSections.map( (s) => s + '.partial.ejs');
specialSections.reverse()


specialSections.forEach( (item) => {
  var index = filesToConvert.indexOf(item);

  if (index < 0)
    return;
  
  filesToConvert.splice(index,1);
  filesToConvert.unshift(item);
})




var buf = "";


filesToConvert.forEach( (filename) => {

  if (!fs.existsSync(path.join(baseInputDirectory, filename))){
    console.log("INFO: Skipping missing file "+path.join(baseInputDirectory, filename))
    return;
  }
  console.log("INFO: Parsing: "+filename+" ...")
  var html = fs.readFileSync( path.join(baseInputDirectory, filename), 'utf-8');

  if ("string" !== typeof html){
   console.log("An error has occurred while reading file "+filename);
   proces.exit(1)
  }


  //console.log(html);
  //process.exit(1)

  //html = sanitizeHtml(html);
  var markdown = toMarkdown(html, { gfm: true });

  markdown = markdown.replace(/\<div.*\>/g,'');
  markdown = markdown.replace(/\<\/div\>/g,'');
  markdown = markdown.replace(/\<a.*\>/g,'');
  markdown = markdown.replace(/\<\/a\>/g,'');
  markdown = markdown.replace(/\<section.*\>/g,'');
  markdown = markdown.replace(/\<\/section\>/g,'');
  markdown = markdown.replace(/\<span.*\>Required\<\/span\>/g,' **Required** ');

  markdown = markdown.replace(/\<span.*\>/g,'');
  markdown = markdown.replace(/\<\/span\>/g,'');
  

  buf += markdown;
  buf += "\n\n";

})


// Adding the TOC
console.log("INFO: Adding Table of Contents...");
var TOC = toc(buf).content;
buf = TOC+"\n"+buf;


// Adding the title
//buf = "# Marketcloud Javascript SDK "+ "\n\n" + buf;
buf = `# ${ title } \n\n${buf}`;
console.log("INFO: Adding title...");


console.log("INFO: Writing to file...");
fs.writeFileSync( baseOutputDirectory, buf);
console.log("INFO: DONE!");
