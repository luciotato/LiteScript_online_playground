#web site
#get latest compiler
cp -u -v ~/LiteScript/util/litescript-npm/lib/* ../lib 

#create examples copies as html

mkdir -p ../examples/html
cd ../examples/
for curFile in *.lite.md; do
    cp -u "$curFile" "html/${curFile%lite.md}html"
done

lite -browser -compile  online.md $*

