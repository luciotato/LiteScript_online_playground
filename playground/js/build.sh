#web site
#get latest compiler
cp -u -v ~/LiteScript/lib/* ../lib 

cwd=$(pwd)

#create examples copies as html
# github wont serve .md files from rawgithub
mkdir -p ../examples/html
cd ../examples/
for curFile in *.lite.md; do
    cp -u "$curFile" "html/${curFile%lite.md}html"
done
cd -


#get latest compiler
cp -u ~/LiteScript/lib/* ../lib


#Compile browser code
lite -d -browser -compile online.md $*

