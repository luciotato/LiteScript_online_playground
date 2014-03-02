## CaseWhenExpression

Grammar:

`CaseWhenExpression: case [VariableRef] (when (Expression,) then Expression)* [else Expression] end`

Similar to ANSI-SQL 'CASE', and ruby's 'case'.
This is the 'expression' counterpart of switch statement.

Examples:

    var 
      a=2
      b=3
      c=5

case on var value, is translated as a js function defined and called on the spot.

    print case a 
          when 2,4,6 then 'even' 
          when 1,3,5 then 'odd'
          else 'idk' 
        end

> even

case without var, is translated as chained ternary operators,
selecting the first true-expression.

    var result = case 
          when a is 3 or b < 10 then 'option 1'
          when b >= 10 or a<0 or c is 5 then 'option 2'
          else 'other' 
        end

> result = 'option 1'
