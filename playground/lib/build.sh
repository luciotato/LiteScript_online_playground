#lite -c sourceMap -o ~/cofee
if node ../util/lite-js -use v0.5.0 -compile Compiler -o ../liteCompiler-v0.6.0; then 
    echo compiled v0.6 OK
    #copy sources to ../liteCompiler-v0.6.0 for SourceMap to find them
    cp -u * ../liteCompiler-v0.6.0/
    #copy to litescript-npm/lib
    cp -u ../liteCompiler-v0.6.0/* ../util/litescript-npm/lib/
    cd ../util/src
    lite -run make-litescript-package
fi
