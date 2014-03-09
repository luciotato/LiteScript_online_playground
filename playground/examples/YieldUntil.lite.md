### New syntax, 'nice function' 'yield until' 'yield parallel map'

#### Avoiding "callback hell" and the "pyramid of doom"

A 'nice function' is a function which is "nice" to others by 'yielding' 
the execution thread to it's caller while it does a blocking operation.

**Any standard node.js async function is, by this definition, 
a 'nice function'.**

One of Node.js basic design choice is 'single process-single thread' 
(you share the thread with node's main event loop) so 
**all blocking functions** in nodejs **must** be nice async functions.

In LiteScript, 'nice functions' have the following advantages:

1. It's a 'standard node.js async function', last parameter is (implicit) standard 
callback `function(err,data)`

2. In the function's body, you can 'yield' while calling other 
standard async functions, waiting for the result data, 
`until` the function completes.

3. You can use 'try/catch' to handle exceptions. You'll catch 
if any async function returned err on callback(err,data) 
in addition to normal throws

4. You play nice to node.js standard:
    - Any 'nice function' can be called as a 'standard node.js async function'.
    - Any unhandled exception in your code, is converted to: "return callback(err)"

5. Bonus: You can use 'yield parallel map' to easily implement parallel execution.

Note: It's implemented using new EcmaScript-6 "generators". 
You need to use node.js>0.11.9 and enable generators 
by starting node with the --harmony flag.


#####Example 1 - get google.com DNS and reverse DNS

    nice function resolveAndReverse

        try 

          var addresses:array = yield until dns.resolve 'google.com'

          for each addr in addresses
              print "#{addr}, and the reverse for #{addr} is #{yield until dns.reverse addr}"

        catch err
              print "#{err.message} during resolveAndReverse"

    end nice function

main:

    resolveAndReverse


#####Example 2 - Same, with parallel reverse

    //global import dns, nicegen

    nice function parallelResolveAndReverse

        try

            var addresses:array = yield until dns.resolve 'google.com'

            var results = yield parallel map addresses dns.reverse 

            for each index,addr in addresses
                print "#{addr}, and the reverse for #{addr} is #{results[index]}"

        catch err
            print "#{err.message} during parallel resolveAndReverse"

    end nice function

main:

    parallelResolveAndReverse


##support

    //uncomment to compile on node.js
    //global import dns, nicegen

    //dummy "dns" to allow compilation on the browser
    var dns=
        resolve:function(domain)
            return "only on node.js"
        reverse:function(domain)
            return "only on node.js"

