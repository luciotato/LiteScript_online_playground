//Compiled by LiteScript compiler v0.6.3, source: /home/ltato/LiteScript_online_playground/playground/examples/Preprocessor.lite.md
//Preprocessor
//============

//LiteScript compiler allows you to execute small pieces of code,
//-in the process of compilation- generating LiteScript code lines on the fly.

//The `compiler generate` meta-statement, will:
//1. read the indented 'body'
//2. compile the body, run it, (the body should push on lines:string array)
//3. replace 'compiler generate + Body' with the generated lines.

//Example:

   console.log("this code is static");
   console.log("but the next statements are generated on the fly");
   console.log("by using meta-statement 'compiler generate'");

//build date, updated at compile-time

   var buildDate = 'Fri Mar 07 2014 19:35:40 GMT-0300 (ART)';

   console.log("this code was compiled on " + buildDate);

//silly

   console.log(1);
   console.log(2);
   console.log(3);
   console.log(4);
   console.log(5);
   console.log(6);
   console.log(7);
   console.log(8);
   console.log(9);
   console.log(10);

//# sourceMappingURL=Preprocessor.js.map