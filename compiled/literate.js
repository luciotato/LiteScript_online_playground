(function () {
  
  /* Literate Kal 
     ------------ 
      
     This file translates Literate Kal files to regular Kal files for the compiler. Literate Kal files are [Markdown](daringfireball.net/projects/markdown/) files with embedded code blocks that contain Kal code. All code blocks (denoted by four leading spaces) are treated as source code while all other Markdown is translated to comments. 
      */
  function translate(literate_code) {
    var regular_kal_lines, last_line, in_code_block, line, ki$1, kobj$1;
    /*  
       This function reads the Literate code line by line, building a new array of non-Literate (illiterate?) code. 
        */
    regular_kal_lines = [];
    last_line = '';
    in_code_block = false;
    /*  
       if the source comes from a <textarea> (or windows) the lines will end with \n\r. Let's remove the \r before split \n 
        */
    kobj$1 = literate_code.replace(/\r/g, '').split('\n');
    for (ki$1 = 0; ki$1 < kobj$1.length; ki$1++) {
      line = kobj$1[ki$1];
      /*  
         If the line starts with four spaces and the previous line was blank or code, we keep the line but remove the spaces. Otherwise, we prepend a `# ` comment marker to make it a comment. 
          */
      if (/^   /.test(line) && (last_line === '' || in_code_block)) {
        in_code_block = true;
        regular_kal_lines.push(line.slice(4));
      } else {
        in_code_block = false;
        regular_kal_lines.push('# ' + line);
      }
      last_line = line;
    }
    /*  
       The translated code is standard Kal. 
        */
    return regular_kal_lines.join('\n');
  }

  /*  */
  exports.translate = translate;
})()